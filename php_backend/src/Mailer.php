<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function create_mailer(): PHPMailer {
  $mail = new PHPMailer(true);
  $host = (string) envv('SMTP_HOST');
  $port = (int) envv('SMTP_PORT', 587);
  $user = (string) envv('SMTP_USER');
  $pass = (string) envv('SMTP_PASS');
  $secure = (string) envv('SMTP_SECURE', 'tls'); // tls|ssl|empty
  if (!$host || !$port || !$user || !$pass) {
    throw new Exception("Config SMTP manquante (host/port/user/pass)");
  }
  $mail->isSMTP();
  $mail->Host = $host;
  $mail->Port = $port;
  $mail->SMTPAuth = true;
  $mail->Username = $user;
  $mail->Password = $pass;
  if ($secure) $mail->SMTPSecure = $secure;

  $mail->CharSet = 'UTF-8';
  $mail->isHTML(true);
  return $mail;
}

function send_contact_mail(array $data) {
  $to = (string) envv('CONTACT_TO');
  $from = (string) (envv('CONTACT_FROM') ?? envv('SMTP_USER'));
  if (!$to) throw new Exception("CONTACT_TO manquant");

  $nom = $data['nom']; $email = $data['email']; $telephone = $data['telephone']; $sujet = $data['sujet']; $message = $data['message'];

  $text = "Nouveau message de contact:\n"
    ."Nom: {$nom}\nEmail: {$email}\nTéléphone: {$telephone}\nSujet: {$sujet}\nMessage:\n{$message}\n";

  $html = '<h2>Nouveau message de contact</h2>'
    .'<p><strong>Nom:</strong> '.escape_html($nom).'</p>'
    .'<p><strong>Email:</strong> '.escape_html($email).'</p>'
    .'<p><strong>Téléphone:</strong> '.escape_html($telephone).'</p>'
    .'<p><strong>Sujet:</strong> '.escape_html($sujet).'</p>'
    .'<p><strong>Message:</strong><br>'.nl2br(escape_html($message)).'</p>';

  $mail = create_mailer();
  $mail->setFrom($from, 'Formulaire Site');
  $mail->addAddress($to);
  $mail->addReplyTo($email);
  $mail->Subject = "📩 Contact: {$sujet} — {$nom}";
  $mail->Body = $html;
  $mail->AltBody = $text;
  return $mail->send();
}

function send_devis_mail(array $data) {
  $to = (string) envv('CONTACT_TO');
  $from = (string) (envv('CONTACT_FROM') ?? envv('SMTP_USER'));
  if (!$to) throw new Exception("CONTACT_TO manquant");
  $text = "Nouvelle demande de devis:\n"
    ."Nom: {$data['nom']}\nEmail: {$data['email']}\nTéléphone: {$data['telephone']}\nType de projet: {$data['type_projet']}\n"
    ."Adresse de projet: {$data['address']}\nBudget: {$data['budget']}\nDescription de projet: {$data['description']}\n";

  $html = '<h2>Nouvelle demande de devis</h2><ul>'
    .'<li><strong>Nom:</strong> '.escape_html($data['nom']).'</li>'
    .'<li><strong>Email:</strong> '.escape_html($data['email']).'</li>'
    .'<li><strong>Téléphone:</strong> '.escape_html($data['telephone']).'</li>'
    .'<li><strong>Type de projet:</strong> '.escape_html($data['type_projet']).'</li>'
    .'<li><strong>Adresse de projet:</strong> '.escape_html($data['address']).'</li>'
    .'<li><strong>Budget:</strong> '.escape_html($data['budget']).'</li>'
    .'<li><strong>Description de projet:</strong> '.escape_html($data['description']).'</li>'
    .'</ul>';

  $mail = create_mailer();
  $mail->setFrom($from, 'Formulaire Site');
  $mail->addAddress($to);
  $mail->addReplyTo($data['email']);
  $mail->Subject = "📦 Devis: {$data['type_projet']} — {$data['nom']}";
  $mail->Body = $html;
  $mail->AltBody = $text;
  return $mail->send();
}
