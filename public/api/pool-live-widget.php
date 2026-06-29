<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$dataPath = __DIR__ . '/pool-temperature.json';
$data = [];
$isGuideMode = ($_GET['mode'] ?? '') === 'guide';

if (is_file($dataPath)) {
    $decoded = json_decode((string) file_get_contents($dataPath), true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

if (($data['temperature'] ?? null) === null && ($_SERVER['HTTP_HOST'] ?? '') === '127.0.0.1:8091') {
    $remoteJson = @file_get_contents('https://dandelionhouse.hu/api/pool-temperature.json');
    $remoteData = is_string($remoteJson) ? json_decode($remoteJson, true) : null;
    if (is_array($remoteData) && ($remoteData['temperature'] ?? null) !== null) {
        $data = $remoteData;
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
$ph = measurement_value($data, 'ph');
$saltConcentration = measurement_value($data, 'saltConcentration');
$poolVolume = measurement_value($data, 'poolVolume');
$orp = measurement_value($data, 'orp');
$waterUnit = text_value($data, 'unit', '°C');
$airUnit = text_value($data, 'airUnit', '°C');
$humidityUnit = text_value($data, 'humidityUnit', '%');
$pressureUnit = text_value($data, 'pressureUnit', 'hPa');
$phUnit = text_value($data, 'phUnit', '');
$saltConcentrationUnit = 'ppm';
$poolVolumeUnit = text_value($data, 'poolVolumeUnit', 'm³');
$orpUnit = text_value($data, 'orpUnit', 'mV');
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

if ($isGuideMode) {
    $metrics = array_merge($metrics, [
        [
            'label' => 'Aktuális pH',
            'value' => format_number($ph, 2),
            'unit' => $ph === null ? '' : $phUnit,
            'level' => level_percent($ph, 6, 9),
            'note' => 'A víz pH értéke',
        ],
        [
            'label' => 'Só koncentráció',
            'value' => format_number($saltConcentration, 2),
            'unit' => $saltConcentration === null ? '' : $saltConcentrationUnit,
            'level' => level_percent($saltConcentration, 0, 5000),
            'note' => 'A víz sótartalma ppm-ben, vagyis milliomodrészben mérve.',
        ],
        [
            'label' => 'Medence térfogata',
            'value' => '45',
            'unit' => 'm³',
            'level' => 45,
        ],
        [
            'label' => 'Vízmélység',
            'value' => 'kb. 125',
            'unit' => 'cm',
            'level' => 100,
        ],
        [
            'label' => 'ORP értéke',
            'value' => format_number($orp, 0),
            'unit' => $orp === null ? '' : $orpUnit,
            'level' => level_percent($orp, 650, 750),
            'note' => 'Az ORP a víz fertőtlenítő erejét mutatja. Jó érték: 650-750.',
            'variant' => 'featured',
        ],
    ]);
}
$waterLevel = level_percent($water, 15, 35);
?>
<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="300">
  <style>
    :root {
      color: #e9f7ff;
      background: transparent;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      background: transparent;
      overflow: hidden;
    }

    .dashboard {
      display: grid;
      grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
      gap: 10px;
      align-items: stretch;
    }

    body.is-guide .dashboard {
      grid-template-columns: 1fr;
    }

    .water-card {
      display: flex;
      min-height: 92px;
      align-items: center;
      gap: 18px;
      padding: 14px 18px 14px 16px;
      border: 1px solid rgba(75, 183, 255, 0.34);
      border-radius: 14px;
      background:
        radial-gradient(circle at 12% 26%, rgba(33, 205, 255, 0.2), transparent 34%),
        linear-gradient(135deg, rgba(8, 47, 77, 0.98), rgba(5, 23, 40, 0.98));
      box-shadow: inset 0 0 0 1px rgba(116, 207, 255, 0.08), 0 12px 28px rgba(0, 0, 0, 0.16);
    }

    .water-gauge {
      display: grid;
      flex: 0 0 60px;
      width: 60px;
      aspect-ratio: 1;
      place-items: center;
      border-radius: 50%;
      background:
        radial-gradient(circle at center, #071b2e 0 54%, transparent 55%),
        conic-gradient(#2fd6ff var(--level), rgba(93, 160, 213, 0.18) 0);
      box-shadow: 0 0 22px rgba(47, 214, 255, 0.18), inset 0 0 0 1px rgba(144, 218, 255, 0.2);
    }

    .water-gauge::after {
      content: "";
      width: 9px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: #7decff;
      box-shadow: 0 0 0 4px rgba(125, 236, 255, 0.14), 0 0 12px rgba(47, 214, 255, 0.8);
    }

    .water-copy {
      display: grid;
      min-width: 0;
      gap: 6px;
      align-content: center;
    }

    .metric-stack {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }

    body.is-guide .metric-stack {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .metric-card {
      display: flex;
      flex-direction: column;
      min-height: 92px;
      justify-content: center;
      gap: 9px;
      padding: 12px 13px;
      text-align: center;
      border: 1px solid rgba(75, 183, 255, 0.22);
      border-radius: 14px;
      background:
        linear-gradient(180deg, rgba(8, 39, 65, 0.96), rgba(5, 24, 42, 0.96)),
        #061827;
      box-shadow: inset 0 0 0 1px rgba(116, 207, 255, 0.06);
    }

    .label {
      color: #79cfff;
      font-size: 0.58rem;
      font-weight: 780;
      letter-spacing: 0.03em;
      line-height: 1.12;
      text-transform: uppercase;
    }

    .water-card .label {
      color: #a7e8ff;
      font-size: 0.72rem;
      line-height: 1;
    }

    .value {
      color: #f4fbff;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-weight: 820;
      line-height: 1;
      letter-spacing: 0;
    }

    .water-card .value {
      font-size: clamp(1.75rem, 3.2vw, 2.45rem);
    }

    .metric-card .value {
      font-size: clamp(1rem, 1.18vw, 1.14rem);
      white-space: nowrap;
    }

    .metric-card.is-featured {
      grid-column: 1 / -1;
      min-height: 128px;
      text-align: left;
      background:
        radial-gradient(circle at 10% 20%, rgba(42, 210, 255, 0.26), transparent 36%),
        linear-gradient(135deg, rgba(8, 60, 94, 0.98), rgba(5, 23, 40, 0.98));
    }

    .metric-card.is-featured .metric-head {
      align-items: flex-start;
      min-height: 0;
    }

    .metric-card.is-featured .label {
      max-width: none;
      min-height: 0;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 0.7rem;
    }

    .metric-card.is-featured .value {
      font-size: clamp(1.9rem, 7vw, 3rem);
    }

    .metric-card.is-featured .metric-note {
      max-width: 58ch;
      min-height: 0;
      color: rgba(221, 242, 252, 0.84);
      font-size: 0.72rem;
      line-height: 1.35;
      text-align: left;
    }

    body.is-guide .metric-card .value {
      font-size: clamp(0.95rem, 3.2vw, 1.14rem);
    }

    .unit {
      margin-left: 0.18em;
      font-size: 0.58em;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-weight: 650;
      vertical-align: baseline;
    }

    .note {
      color: rgba(203, 232, 246, 0.72);
      font-size: 0.68rem;
      font-weight: 650;
      line-height: 1.35;
    }

    .metric-note {
      min-height: 1.8em;
      color: rgba(203, 232, 246, 0.7);
      font-size: 0.55rem;
      font-weight: 650;
      line-height: 1.2;
    }

    .metric-head {
      display: flex;
      min-height: 54px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 9px;
      min-width: 0;
    }

    .metric-head .label,
    .metric-head .value {
      min-width: 0;
      overflow-wrap: normal;
    }

    .metric-head .label {
      max-width: 13ch;
      min-height: 2.24em;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .metric-card:first-child .label {
      line-height: 1.42;
      min-height: 2.84em;
    }

    @media (max-width: 560px) {
      .dashboard {
        grid-template-columns: 1fr;
        gap: 6px;
        align-items: stretch;
      }

      body.is-guide .dashboard {
        grid-template-columns: 1fr;
      }

      .water-card {
        min-height: 72px;
        gap: 10px;
        padding: 10px 11px;
        border-radius: 11px;
      }

      .water-gauge {
        flex-basis: 34px;
        width: 34px;
      }

      .water-gauge::after {
        width: 6px;
        box-shadow: 0 0 0 3px rgba(125, 236, 255, 0.14), 0 0 8px rgba(47, 214, 255, 0.8);
      }

      .water-copy {
        gap: 4px;
      }

      .water-card .label {
        font-size: 0.54rem;
      }

      .water-card .value {
        font-size: 1.42rem;
      }

      .note {
        font-size: 0.58rem;
        line-height: 1.15;
      }

      .metric-stack {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px;
      }

      body.is-guide .metric-stack {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .metric-card {
        min-height: 68px;
        gap: 5px;
        padding: 8px 7px;
        border-radius: 11px;
      }

      .metric-card.is-featured {
        min-height: 124px;
        padding: 12px;
      }

      .metric-card.is-featured .metric-head {
        gap: 7px;
      }

      .metric-card.is-featured .label {
        font-size: 0.58rem;
      }

      .metric-card.is-featured .value {
        font-size: 2.15rem;
      }

      .metric-card.is-featured .metric-note {
        font-size: 0.64rem;
        line-height: 1.35;
      }

      body:not(.is-guide) .metric-card:nth-child(3) {
        display: none;
      }

      .metric-head {
        min-height: 52px;
        gap: 5px;
      }

      .label {
        font-size: 0.48rem;
        letter-spacing: 0.02em;
      }

      .metric-card .value {
        font-size: 0.88rem;
      }

      body.is-guide .metric-card .value {
        font-size: 0.88rem;
      }

      .metric-note {
        min-height: 1.6em;
        font-size: 0.46rem;
      }

      .metric-head .label {
        max-width: 11ch;
        min-height: 2.24em;
      }

      .metric-card:first-child .label {
        line-height: 1.28;
        min-height: 2.56em;
      }
    }
  </style>
</head>
<body class="<?= $isGuideMode ? 'is-guide' : ''; ?>">
  <div class="dashboard" aria-label="Panorama Pool aktuális mérések">
    <article class="water-card">
      <span class="water-gauge" style="--level: <?= h((string) $waterLevel); ?>%;" aria-hidden="true"></span>
      <div class="water-copy">
        <span class="label">Medencevíz</span>
        <strong class="value">
          <?= h(format_number($water, 1)); ?><?php if ($water !== null): ?><span class="unit"><?= h($waterUnit); ?></span><?php endif; ?>
        </strong>
        <small class="note"><?= h($updatedText); ?></small>
      </div>
    </article>

    <div class="metric-stack">
      <?php foreach ($metrics as $metric): ?>
        <article class="metric-card<?= (($metric['variant'] ?? '') === 'featured') ? ' is-featured' : ''; ?>">
          <div class="metric-head">
            <span class="label"><?= h($metric['label']); ?></span>
            <strong class="value">
              <?= h($metric['value']); ?><?php if ($metric['unit'] !== ''): ?><span class="unit"><?= h($metric['unit']); ?></span><?php endif; ?>
            </strong>
            <?php if (isset($metric['note'])): ?><small class="metric-note"><?= h($metric['note']); ?></small><?php endif; ?>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</body>
</html>
