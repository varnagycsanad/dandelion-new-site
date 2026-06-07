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

function level_percent(?float $value, float $min, float $max): int
{
    if ($value === null || $max <= $min) {
        return 0;
    }

    $percent = (($value - $min) / ($max - $min)) * 100;
    return (int) max(0, min(100, round($percent)));
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

$metrics = [
    [
        'label' => 'Levegő hőmérséklete',
        'value' => format_number($air, 1),
        'unit' => $air === null ? '' : $airUnit,
        'level' => level_percent($air, 0, 40),
    ],
    [
        'label' => 'Páratartalom',
        'value' => format_number($humidity, 0),
        'unit' => $humidity === null ? '' : $humidityUnit,
        'level' => level_percent($humidity, 0, 100),
    ],
    [
        'label' => 'Légnyomás',
        'value' => format_number($pressure, 0),
        'unit' => $pressure === null ? '' : $pressureUnit,
        'level' => level_percent($pressure, 980, 1040),
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

    .dashboard {
      display: grid;
      grid-template-columns: minmax(240px, 0.92fr) minmax(280px, 1.08fr);
      gap: 12px;
    }

    .water-card,
    .metric-card {
      border: 1px solid rgba(90, 67, 41, 0.1);
      border-radius: 8px;
      background: #fbfaf7;
    }

    .water-card {
      display: grid;
      min-height: 218px;
      align-content: space-between;
      gap: 18px;
      padding: 22px;
      background:
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 1), rgba(250, 240, 220, 0.92) 52%, rgba(234, 214, 174, 0.8)),
        #f5ead3;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.52);
    }

    .metric-stack {
      display: grid;
      gap: 10px;
    }

    .metric-card {
      display: grid;
      min-height: 66px;
      gap: 10px;
      padding: 14px 16px;
    }

    .label {
      color: #9c7a34;
      font-size: 0.72rem;
      font-weight: 760;
      letter-spacing: 0.12em;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .water-card .label {
      font-size: 0.76rem;
    }

    .value {
      color: #241b14;
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 500;
      line-height: 1;
      letter-spacing: 0.01em;
    }

    .water-card .value {
      font-size: clamp(2.35rem, 6vw, 3.7rem);
    }

    .metric-card .value {
      font-size: clamp(1.18rem, 2.8vw, 1.52rem);
    }

    .unit {
      margin-left: 0.18em;
      font-size: 0.58em;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-weight: 650;
    }

    .note {
      color: rgba(68, 53, 39, 0.72);
      font-size: 0.78rem;
      font-weight: 650;
      line-height: 1.35;
    }

    .metric-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .meter {
      height: 5px;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(90, 67, 41, 0.11);
    }

    .meter span {
      display: block;
      width: var(--level);
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #9c7a34, #d7a84a);
    }

    @media (max-width: 720px) {
      .dashboard {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .water-card {
        min-height: 154px;
        padding: 18px;
      }

      .water-card .value {
        font-size: 2.18rem;
      }

      .metric-card {
        min-height: 62px;
        padding: 13px 14px;
      }
    }
  </style>
</head>
<body>
  <div class="dashboard" aria-label="Panorama Pool aktuális mérések">
    <article class="water-card">
      <span class="label">Medencevíz</span>
      <strong class="value">
        <?= h(format_number($water, 1)); ?><?php if ($water !== null): ?><span class="unit"><?= h($waterUnit); ?></span><?php endif; ?>
      </strong>
      <small class="note"><?= h($updatedText); ?></small>
    </article>

    <div class="metric-stack">
      <?php foreach ($metrics as $metric): ?>
        <article class="metric-card">
          <div class="metric-head">
            <span class="label"><?= h($metric['label']); ?></span>
            <strong class="value">
              <?= h($metric['value']); ?><?php if ($metric['unit'] !== ''): ?><span class="unit"><?= h($metric['unit']); ?></span><?php endif; ?>
            </strong>
          </div>
          <div class="meter" aria-hidden="true"><span style="--level: <?= h((string) $metric['level']); ?>%;"></span></div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</body>
</html>
