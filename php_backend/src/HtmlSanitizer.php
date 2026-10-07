<?php
declare(strict_types=1);

/**
 * Nettoyage HTML par liste blanche (sortie de l'éditeur Quill).
 * Tout ce qui n'est pas explicitement autorisé est supprimé : scripts, handlers on*,
 * URLs javascript:, styles arbitraires, iframes hors YouTube/Vimeo...
 */

const SANITIZE_ALLOWED_TAGS = [
  'p' => [], 'br' => [], 'strong' => [], 'b' => [], 'em' => [], 'i' => [], 'u' => [], 's' => [],
  'h1' => [], 'h2' => [], 'h3' => [], 'h4' => [], 'blockquote' => [], 'pre' => [], 'code' => [],
  'ol' => [], 'ul' => [], 'li' => ['data-list'], 'span' => [], 'sub' => [], 'sup' => [],
  'a' => ['href', 'target', 'rel'],
  'img' => ['src', 'alt', 'width', 'height'],
  'iframe' => ['src', 'allowfullscreen', 'frameborder'],
];
// Éléments supprimés avec tout leur contenu.
const SANITIZE_DROP_WITH_CONTENT = ['script', 'style', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'noscript', 'template', 'svg', 'math', 'link', 'meta'];

function sanitize_html(string $html): string {
  $html = trim($html);
  if ($html === '') return '';

  $doc = new DOMDocument('1.0', 'UTF-8');
  $prev = libxml_use_internal_errors(true);
  $doc->loadHTML('<?xml encoding="UTF-8"><!DOCTYPE html><html><body><div id="__root">'.$html.'</div></body></html>', LIBXML_NONET);
  libxml_clear_errors();
  libxml_use_internal_errors($prev);

  $root = $doc->getElementById('__root');
  if (!$root) return '';
  sanitize_children($root);

  $out = '';
  foreach ($root->childNodes as $child) $out .= $doc->saveHTML($child);
  return $out;
}

function sanitize_children(DOMNode $node): void {
  // Copie de la liste : on modifie l'arbre pendant le parcours.
  foreach (iterator_to_array($node->childNodes) as $child) {
    if ($child instanceof DOMText) continue;
    if (!($child instanceof DOMElement)) {
      $node->removeChild($child); // commentaires, PI, CDATA...
      continue;
    }

    $tag = strtolower($child->tagName);
    if (in_array($tag, SANITIZE_DROP_WITH_CONTENT, true)) {
      $node->removeChild($child);
      continue;
    }
    if (!array_key_exists($tag, SANITIZE_ALLOWED_TAGS)) {
      // Balise inconnue : on garde le contenu, on retire la balise.
      sanitize_children($child);
      while ($child->firstChild) $node->insertBefore($child->firstChild, $child);
      $node->removeChild($child);
      continue;
    }

    sanitize_attributes($child, $tag);
    if ($tag === 'iframe' && !$child->hasAttribute('src')) {
      $node->removeChild($child);
      continue;
    }
    if ($tag === 'img' && !$child->hasAttribute('src')) {
      $node->removeChild($child);
      continue;
    }
    sanitize_children($child);
  }
}

function sanitize_attributes(DOMElement $el, string $tag): void {
  $allowed = SANITIZE_ALLOWED_TAGS[$tag];
  foreach (iterator_to_array($el->attributes) as $attr) {
    $name = strtolower($attr->name);
    $value = trim($attr->value);
    $keep = false;

    if ($name === 'class') {
      // Seules les classes de mise en forme Quill sont conservées.
      $classes = array_filter(preg_split('/\s+/', $value) ?: [], fn($c) => preg_match('/^ql-[a-z0-9-]{1,40}$/', $c));
      if ($classes) { $el->setAttribute('class', implode(' ', $classes)); continue; }
    } elseif ($name === 'style') {
      $style = sanitize_style($value);
      if ($style !== '') { $el->setAttribute('style', $style); continue; }
    } elseif (in_array($name, $allowed, true)) {
      $keep = match ($name) {
        'href'   => sanitize_url($value, ['http', 'https', 'mailto', 'tel']) !== null,
        'src'    => $tag === 'iframe' ? is_allowed_embed($value) : sanitize_url($value, ['http', 'https']) !== null,
        'target' => $value === '_blank',
        'width', 'height' => ctype_digit($value),
        default  => true,
      };
    }
    if (!$keep) $el->removeAttribute($attr->name);
  }

  if ($tag === 'a' && $el->getAttribute('target') === '_blank') {
    $el->setAttribute('rel', 'noopener noreferrer nofollow');
  }
  if ($tag === 'img') {
    $el->setAttribute('loading', 'lazy');
    $el->setAttribute('decoding', 'async');
  }
}

/** Autorise les URLs relatives (/uploads/...) et les schémas listés. */
function sanitize_url(string $url, array $schemes): ?string {
  $url = preg_replace('/[\x00-\x20]+/', '', $url) ?? '';
  if ($url === '') return null;
  if (str_starts_with($url, '//')) return null;
  if (str_starts_with($url, '/') || str_starts_with($url, '#')) return $url;
  $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
  return in_array($scheme, $schemes, true) ? $url : null;
}

function is_allowed_embed(string $url): bool {
  $host = strtolower((string) parse_url($url, PHP_URL_HOST));
  return str_starts_with($url, 'https://') && in_array($host, [
    'www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com',
  ], true);
}

/** Ne conserve que color / background-color / text-align avec des valeurs sûres. */
function sanitize_style(string $style): string {
  $out = [];
  foreach (explode(';', $style) as $decl) {
    [$prop, $val] = array_map('trim', explode(':', $decl, 2) + [1 => '']);
    $prop = strtolower($prop);
    if (!in_array($prop, ['color', 'background-color', 'text-align'], true)) continue;
    if ($prop === 'text-align' && !in_array($val, ['left', 'right', 'center', 'justify'], true)) continue;
    if ($prop !== 'text-align' && !preg_match('/^(#[0-9a-fA-F]{3,8}|rgba?\(\s*[\d.,\s%]+\)|[a-zA-Z]{3,20})$/', $val)) continue;
    $out[] = $prop.': '.$val;
  }
  return implode('; ', $out);
}
