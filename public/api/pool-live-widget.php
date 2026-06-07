<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$dataPath = __DIR__ . '/pool-temperature.json';
$data = [];

if (is_file($dataPath)) {
    $decoded = json_decode((string) file_get_contents($dataPath), true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

function measurement_value(array $data, string $key): ?float
{
    if (!array_key_exists($key, $data) || $data[$key] === null || $data[$key] === '') {
        return null;
    }

    if (!is_numeric($data[$key])) {
        return null;
    }

    return (float) $data[$key];
}

function text_value(array $data, string $key, string $fallback): string
{
    if (!array_key_exists($key, $data) || !is_string($data[$key]) || trim($data[$key]) === '') {
        return $fallback;
    }

    return trim($data[$key]);
}

function format_number(?float $value, int $decimals = 1): string
{
    if ($value === null) {
        return 'Nincs adat';
    }

    return number_format($value, $decimals, ',', ' ');
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$water = measurement_value($data, 'temperature');
$air = measurement_value($data, 'airTemperature');
$humidity = measurement_value($data, 'humidity');
$pressure = measurement_value($data, 'pressure');
$waterUnit = text_value($data, 'unit', '°C');
$airUnit = text_value($data, 'airUnit', '°C');
$humidityUnit = text_value($data, 'humidityUnit', '%');
$pressureUnit = text_value($data, 'pressureUnit', 'hPa');
$updatedAtRaw = text_value($data, 'updatedAt', '');
$updatedText = 'Frissítésre vár';

if ($updatedAtRaw !== '') {
    try {
        $updatedAt = new DateTimeImmutable($updatedAtRaw);
        $updatedText = 'Frissítve: ' . $updatedAt->format('H:i');
    } catch (Throwable $error) {
        $updatedText = 'Frissítésre vár';
    }
}

$cards = [
    [
        'class' => ' card--primary',
        'label' => 'Medencevíz',
        'value' => format_number($water, 1),
        'unit' => $water === null ? '' : $waterUnit,
        'note' => $updatedText,
    ],
    [
        'class' => '',
        'label' => 'Levegő hőmérséklete',
        'value' => format_number($air, 1),
        'unit' => $air === null ? '' : $airUnit,
        'note' => 'Kültéri mérés',
    ],
    [
        'class' => '',
        'label' => 'Páratartalom',
        'value' => format_number($humidity, 0),
        'unit' => $humidity === null ? '' : $humidityUnit,
        'note' => 'Kültéri mérés',
    ],
    [
        'class' => '',
        'label' => 'Légnyomás',
        'value' => format_number($pressure, 0),
        'unit' => $pressure === null ? '' : $pressureUnit,
        'note' => 'Kültéri mérés',
    ],
];
?>
<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="300">
  <style>
    :root {
      color: #241b14;
      background: transparent;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: transparent;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    .card {
      display: grid;
      min-height: 156px;
      align-content: space-between;
      gap: 14px;
      padding: 18px;
      border: 1px solid rgba(90, 67, 41, 0.1);
      border-radius: 8px;
      background: #fbfaf7;
    }

    .card--primary {
      background:
        radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.98), rgba(246, 236, 216, 0.9)),
        #f5ead3;
    }

    .label {
      color: #9c7a34;
      font-size: 0.72rem;
      font-weight: 760;
      letter-spacing: 0.12em;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .value {
      color: #241b14;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.34rem, 2.2vw, 1.9rem);
      font-weight: 500;
      line-height: 1;
      letter-spacing: 0.01em;
    }

    .unit {
      margin-left: 0.16em;
      font-size: 0.72em;
    }

    .note {
      color: rgba(68, 53, 39, 0.72);
      font-size: 0.78rem;
      font-weight: 650;
      line-height: 1.35;
    }

    @media (max-width: 720px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .card {
        min-height: 126px;
        padding: 14px;
      }

      .value {
        font-size: 1.34rem;
      }

      .note {
        font-size: 0.72rem;
      }
    }
  </style>
</head>
<body>
  <div class="grid" aria-label="Panorama Pool aktuális mérések">
    <?php foreach ($cards as $card): ?>
      <article class="card<?= h($card['class']); ?>">
        <span class="label"><?= h($card['label']); ?></span>
        <strong class="value">
          <?= h($card['value']); ?><?php if ($card['unit'] !== ''): ?><span class="unit"><?= h($card['unit']); ?></span><?php endif; ?>
        </strong>
        <small class="note"><?= h($card['note']); ?></small>
      </article>
    <?php endforeach; ?>
  </div>
</body>
</html>
