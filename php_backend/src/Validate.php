<?php
declare(strict_types=1);

function str_ok(?string $s, int $min = 1): bool {
  return is_string($s) && mb_strlen(trim($s)) >= $min;
}

function email_ok(?string $s): bool {
  return is_string($s) && filter_var($s, FILTER_VALIDATE_EMAIL);
}

function phone_ok(?string $s): bool {
  if (!is_string($s)) return false;
  return preg_match('/^\+?[0-9\s\-\(\)]{7,20}$/', $s) === 1;
}

function validate_contact_payload(array $in): array {
  $errors = [];
  $nom = trim((string)($in['nom'] ?? ''));
  $sujet = trim((string)($in['sujet'] ?? ''));
  $telephone = trim((string)($in['telephone'] ?? ''));
  $email = trim((string)($in['email'] ?? ''));
  $message = trim((string)($in['message'] ?? ''));
  $website = (string)($in['website'] ?? '');

  if (!str_ok($nom, 2)) $errors['nom'] = 'Nom invalide';
  if (!str_ok($sujet, 3)) $errors['sujet'] = 'Sujet invalide';
  if (!phone_ok($telephone)) $errors['telephone'] = 'Téléphone invalide';
  if (!email_ok($email)) $errors['email'] = 'Email invalide';
  if (!str_ok($message, 10)) $errors['message'] = 'Message invalide';

  return [
    'valid' => empty($errors),
    'data'  => compact('nom','sujet','telephone','email','message','website'),
    'errors'=> $errors
  ];
}

function validate_devis_payload(array $in): array {
  $errors = [];
  $nom = trim((string)($in['nom'] ?? ''));
  $email = trim((string)($in['email'] ?? ''));
  $telephone = trim((string)($in['telephone'] ?? ''));
  $typeProjet = trim((string)($in['type_projet'] ?? ''));
  $address = trim((string)($in['address'] ?? ''));
  $budget = trim((string)($in['budget'] ?? ''));
  $description = trim((string)($in['description'] ?? ''));
  $website = (string)($in['website'] ?? '');

  if (!str_ok($nom, 2)) $errors['nom'] = 'Nom invalide';
  if (!email_ok($email)) $errors['email'] = 'Email invalide';
  if (!phone_ok($telephone)) $errors['telephone'] = 'Téléphone invalide';
  if (!str_ok($typeProjet, 2)) $errors['type_projet'] = 'Type de projet invalide';
  if (!str_ok($address, 2)) $errors['address'] = 'Adresse de projet invalide';
  if ($budget !== '' && (!is_numeric($budget) || (float)$budget < 0)) $errors['budget'] = 'Budget invalide';
  if (!str_ok($description, 10)) $errors['description'] = 'Description de projet invalide';

  return [
    'valid' => empty($errors),
    'data'  => [
      'nom' => $nom,
      'email' => $email,
      'telephone' => $telephone,
      'type_projet' => $typeProjet,
      'address' => $address,
      'budget' => $budget,
      'description' => $description,
      'website' => $website,
    ],
    'errors'=> $errors
  ];
}

function escape_html(string $s): string {
  return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
