<?php
declare(strict_types=1);

const POOL_TEMPERATURE_SECRET_HASH = '78cd1b39ea25d82d3e10f67722dc36155c84b608035ea2e55c6c2953ed2d8e47';
const POOL_TEMPERATURE_MIN = -5;
const POOL_TEMPERATURE_MAX = 45;
const AIR_TEMPERATURE_MIN = -40;
const AIR_TEMPERATURE_MAX = 60;
const HUMIDITY_MIN = 0;
const HUMIDITY_MAX = 100;
const PRESSURE_MIN = 800;
const PRESSURE_MAX = 1100;
const PH_MIN = 0;
const PH_MAX = 14;
const SALT_CONCENTRATION_MIN = 0;
const SALT_CONCENTRATION_MAX = 100000;
const POOL_VOLUME_MIN = 0;
const POOL_VOLUME_MAX = 1000;
const ORP_MIN = 0;
const ORP_MAX = 1200;
const DEFAULT_AIR_TEMPERATURE_ENTITY = 'sensor.d1_pergola_kulteri_homero_homerseklet';
const DEFAULT_HUMIDITY_ENTITY = 'sensor.d1_pergola_kulteri_homero_paratartalom';
const DEFAULT_PRESSURE_ENTITY = 'sensor.d1_pergola_kulteri_homero_nyomas';
const DEFAULT_PH_ENTITY = 'sensor.mr_pure_sensor_12';
const DEFAULT_SALT_CONCENTRATION_ENTITY = 'sensor.mr_pure_sensor_8';
const DEFAULT_POOL_VOLUME_ENTITY = '';
const DEFAULT_ORP_ENTITY = 'sensor.mr_pure_sensor_11';

function send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function sanitize_unit($unit, string $fallback): string
{
    if (!is_string($unit) || trim($unit) === '') {
        return $fallback;
    }

    $unit = trim($unit);
    return strlen($unit) > 8 ? $fallback : $unit;
}

function sanitize_entity_id($entityId, string $fallback): string
{
    if (!is_string($entityId) || trim($entityId) === '') {
        return $fallback;
    }

    return trim($entityId);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    send_json(405, ['error' => 'Method not allowed.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

if (!is_array($payload)) {
    send_json(400, ['error' => 'Invalid JSON body.']);
}

$headerSecret = $_SERVER['HTTP_X_POOL_SECRET'] ?? '';
$bodySecret = $payload['secret'] ?? '';
$secret = is_string($headerSecret) && trim($headerSecret) !== '' ? $headerSecret : $bodySecret;

if (!is_string($secret) || !hash_equals(POOL_TEMPERATURE_SECRET_HASH, hash('sha256', $secret))) {
    send_json(403, ['error' => 'Forbidden.']);
}

$temperature = filter_var($payload['temperature'] ?? null, FILTER_VALIDATE_FLOAT);

if (
    $temperature === false ||
    $temperature < POOL_TEMPERATURE_MIN ||
    $temperature > POOL_TEMPERATURE_MAX
) {
    send_json(422, ['error' => 'Invalid pool temperature.']);
}

$unit = $payload['unit'] ?? '°C';

if (!is_string($unit) || trim($unit) === '') {
    $unit = '°C';
}

$unit = trim($unit);

if (strlen($unit) > 8) {
    $unit = '°C';
}

$temperature = round((float) $temperature, 1);
$outputPath = __DIR__ . '/pool-temperature.json';
$temporaryPath = $outputPath . '.tmp';
$existingOutput = [];

if (is_file($outputPath)) {
    $existingJson = file_get_contents($outputPath);
    $decodedExistingOutput = json_decode($existingJson ?: '', true);
    if (is_array($decodedExistingOutput)) {
        $existingOutput = $decodedExistingOutput;
    }
}

$airTemperaturePayload = $payload['airTemperature'] ?? $payload['air_temperature'] ?? $payload['outdoorTemperature'] ?? null;
$hasAirTemperaturePayload = $airTemperaturePayload !== null && $airTemperaturePayload !== '';
$airTemperature = $hasAirTemperaturePayload ? filter_var($airTemperaturePayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasAirTemperaturePayload &&
    (
        $airTemperature === false ||
        $airTemperature < AIR_TEMPERATURE_MIN ||
        $airTemperature > AIR_TEMPERATURE_MAX
    )
) {
    send_json(422, ['error' => 'Invalid air temperature.']);
}

$airUnit = $payload['airUnit'] ?? $payload['air_unit'] ?? $unit;

if (!is_string($airUnit) || trim($airUnit) === '') {
    $airUnit = '°C';
}

$airUnit = trim($airUnit);

if (strlen($airUnit) > 8) {
    $airUnit = '°C';
}

$airSourceEntity = $payload['airEntityId'] ?? $payload['air_entity_id'] ?? DEFAULT_AIR_TEMPERATURE_ENTITY;

if (!is_string($airSourceEntity) || trim($airSourceEntity) === '') {
    $airSourceEntity = DEFAULT_AIR_TEMPERATURE_ENTITY;
}

$airSourceEntity = trim($airSourceEntity);
$humidityPayload = $payload['humidity'] ?? $payload['relativeHumidity'] ?? $payload['airHumidity'] ?? null;
$hasHumidityPayload = $humidityPayload !== null && $humidityPayload !== '';
$humidity = $hasHumidityPayload ? filter_var($humidityPayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasHumidityPayload &&
    (
        $humidity === false ||
        $humidity < HUMIDITY_MIN ||
        $humidity > HUMIDITY_MAX
    )
) {
    send_json(422, ['error' => 'Invalid humidity.']);
}

$humidityUnit = $payload['humidityUnit'] ?? $payload['humidity_unit'] ?? '%';

if (!is_string($humidityUnit) || trim($humidityUnit) === '') {
    $humidityUnit = '%';
}

$humidityUnit = trim($humidityUnit);

if (strlen($humidityUnit) > 8) {
    $humidityUnit = '%';
}

$humiditySourceEntity = $payload['humidityEntityId'] ?? $payload['humidity_entity_id'] ?? DEFAULT_HUMIDITY_ENTITY;

if (!is_string($humiditySourceEntity) || trim($humiditySourceEntity) === '') {
    $humiditySourceEntity = DEFAULT_HUMIDITY_ENTITY;
}

$humiditySourceEntity = trim($humiditySourceEntity);
$pressurePayload = $payload['pressure'] ?? $payload['airPressure'] ?? null;
$hasPressurePayload = $pressurePayload !== null && $pressurePayload !== '';
$pressure = $hasPressurePayload ? filter_var($pressurePayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasPressurePayload &&
    (
        $pressure === false ||
        $pressure < PRESSURE_MIN ||
        $pressure > PRESSURE_MAX
    )
) {
    send_json(422, ['error' => 'Invalid pressure.']);
}

$pressureUnit = $payload['pressureUnit'] ?? $payload['pressure_unit'] ?? 'hPa';

if (!is_string($pressureUnit) || trim($pressureUnit) === '') {
    $pressureUnit = 'hPa';
}

$pressureUnit = trim($pressureUnit);

if (strlen($pressureUnit) > 8) {
    $pressureUnit = 'hPa';
}

$pressureSourceEntity = $payload['pressureEntityId'] ?? $payload['pressure_entity_id'] ?? DEFAULT_PRESSURE_ENTITY;

if (!is_string($pressureSourceEntity) || trim($pressureSourceEntity) === '') {
    $pressureSourceEntity = DEFAULT_PRESSURE_ENTITY;
}

$pressureSourceEntity = trim($pressureSourceEntity);
$phPayload = $payload['ph'] ?? $payload['pH'] ?? $payload['waterPh'] ?? null;
$hasPhPayload = $phPayload !== null && $phPayload !== '';
$ph = $hasPhPayload ? filter_var($phPayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasPhPayload &&
    (
        $ph === false ||
        $ph < PH_MIN ||
        $ph > PH_MAX
    )
) {
    send_json(422, ['error' => 'Invalid pH.']);
}

$phUnit = sanitize_unit($payload['phUnit'] ?? $payload['ph_unit'] ?? '', '');
$phSourceEntity = sanitize_entity_id($payload['phEntityId'] ?? $payload['ph_entity_id'] ?? DEFAULT_PH_ENTITY, DEFAULT_PH_ENTITY);
$saltConcentrationPayload = $payload['saltConcentration'] ?? $payload['salt'] ?? $payload['salt_concentration'] ?? null;
$hasSaltConcentrationPayload = $saltConcentrationPayload !== null && $saltConcentrationPayload !== '';
$saltConcentration = $hasSaltConcentrationPayload ? filter_var($saltConcentrationPayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasSaltConcentrationPayload &&
    (
        $saltConcentration === false ||
        $saltConcentration < SALT_CONCENTRATION_MIN ||
        $saltConcentration > SALT_CONCENTRATION_MAX
    )
) {
    send_json(422, ['error' => 'Invalid salt concentration.']);
}

$saltConcentrationUnit = sanitize_unit(
    $payload['saltConcentrationUnit'] ?? $payload['saltUnit'] ?? $payload['salt_concentration_unit'] ?? 'g/l',
    'g/l'
);
$saltConcentrationSourceEntity = sanitize_entity_id(
    $payload['saltConcentrationEntityId'] ?? $payload['saltEntityId'] ?? $payload['salt_concentration_entity_id'] ?? DEFAULT_SALT_CONCENTRATION_ENTITY,
    DEFAULT_SALT_CONCENTRATION_ENTITY
);
$poolVolumePayload = $payload['poolVolume'] ?? $payload['volume'] ?? $payload['pool_volume'] ?? null;
$hasPoolVolumePayload = $poolVolumePayload !== null && $poolVolumePayload !== '';
$poolVolume = $hasPoolVolumePayload ? filter_var($poolVolumePayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasPoolVolumePayload &&
    (
        $poolVolume === false ||
        $poolVolume < POOL_VOLUME_MIN ||
        $poolVolume > POOL_VOLUME_MAX
    )
) {
    send_json(422, ['error' => 'Invalid pool volume.']);
}

$poolVolumeUnit = sanitize_unit($payload['poolVolumeUnit'] ?? $payload['volumeUnit'] ?? $payload['pool_volume_unit'] ?? 'm³', 'm³');
$poolVolumeSourceEntity = sanitize_entity_id(
    $payload['poolVolumeEntityId'] ?? $payload['volumeEntityId'] ?? $payload['pool_volume_entity_id'] ?? DEFAULT_POOL_VOLUME_ENTITY,
    DEFAULT_POOL_VOLUME_ENTITY
);
$orpPayload = $payload['orp'] ?? $payload['ORP'] ?? $payload['waterOrp'] ?? null;
$hasOrpPayload = $orpPayload !== null && $orpPayload !== '';
$orp = $hasOrpPayload ? filter_var($orpPayload, FILTER_VALIDATE_FLOAT) : null;

if (
    $hasOrpPayload &&
    (
        $orp === false ||
        $orp < ORP_MIN ||
        $orp > ORP_MAX
    )
) {
    send_json(422, ['error' => 'Invalid ORP.']);
}

$orpUnit = sanitize_unit($payload['orpUnit'] ?? $payload['orp_unit'] ?? 'mV', 'mV');
$orpSourceEntity = sanitize_entity_id($payload['orpEntityId'] ?? $payload['orp_entity_id'] ?? DEFAULT_ORP_ENTITY, DEFAULT_ORP_ENTITY);
$now = date(DATE_ATOM);
$output = [
    'temperature' => $temperature,
    'unit' => $unit,
    'updatedAt' => $now,
    'source' => 'Home Assistant',
    'airTemperature' => $hasAirTemperaturePayload ? round((float) $airTemperature, 1) : ($existingOutput['airTemperature'] ?? null),
    'airUnit' => $hasAirTemperaturePayload ? $airUnit : ($existingOutput['airUnit'] ?? '°C'),
    'airUpdatedAt' => $hasAirTemperaturePayload ? $now : ($existingOutput['airUpdatedAt'] ?? null),
    'airSource' => 'Home Assistant',
    'airEntityId' => $hasAirTemperaturePayload ? $airSourceEntity : ($existingOutput['airEntityId'] ?? DEFAULT_AIR_TEMPERATURE_ENTITY),
    'humidity' => $hasHumidityPayload ? round((float) $humidity, 1) : ($existingOutput['humidity'] ?? null),
    'humidityUnit' => $hasHumidityPayload ? $humidityUnit : ($existingOutput['humidityUnit'] ?? '%'),
    'humidityUpdatedAt' => $hasHumidityPayload ? $now : ($existingOutput['humidityUpdatedAt'] ?? null),
    'humiditySource' => 'Home Assistant',
    'humidityEntityId' => $hasHumidityPayload ? $humiditySourceEntity : ($existingOutput['humidityEntityId'] ?? DEFAULT_HUMIDITY_ENTITY),
    'pressure' => $hasPressurePayload ? round((float) $pressure, 1) : ($existingOutput['pressure'] ?? null),
    'pressureUnit' => $hasPressurePayload ? $pressureUnit : ($existingOutput['pressureUnit'] ?? 'hPa'),
    'pressureUpdatedAt' => $hasPressurePayload ? $now : ($existingOutput['pressureUpdatedAt'] ?? null),
    'pressureSource' => 'Home Assistant',
    'pressureEntityId' => $hasPressurePayload ? $pressureSourceEntity : ($existingOutput['pressureEntityId'] ?? DEFAULT_PRESSURE_ENTITY),
    'ph' => $hasPhPayload ? round((float) $ph, 2) : ($existingOutput['ph'] ?? null),
    'phUnit' => $hasPhPayload ? $phUnit : ($existingOutput['phUnit'] ?? ''),
    'phUpdatedAt' => $hasPhPayload ? $now : ($existingOutput['phUpdatedAt'] ?? null),
    'phSource' => 'Home Assistant',
    'phEntityId' => $hasPhPayload ? $phSourceEntity : ($existingOutput['phEntityId'] ?? DEFAULT_PH_ENTITY),
    'saltConcentration' => $hasSaltConcentrationPayload ? round((float) $saltConcentration, 2) : ($existingOutput['saltConcentration'] ?? null),
    'saltConcentrationUnit' => $hasSaltConcentrationPayload ? $saltConcentrationUnit : ($existingOutput['saltConcentrationUnit'] ?? 'g/l'),
    'saltConcentrationUpdatedAt' => $hasSaltConcentrationPayload ? $now : ($existingOutput['saltConcentrationUpdatedAt'] ?? null),
    'saltConcentrationSource' => 'Home Assistant',
    'saltConcentrationEntityId' => $hasSaltConcentrationPayload ? $saltConcentrationSourceEntity : ($existingOutput['saltConcentrationEntityId'] ?? DEFAULT_SALT_CONCENTRATION_ENTITY),
    'poolVolume' => $hasPoolVolumePayload ? round((float) $poolVolume, 2) : ($existingOutput['poolVolume'] ?? null),
    'poolVolumeUnit' => $hasPoolVolumePayload ? $poolVolumeUnit : ($existingOutput['poolVolumeUnit'] ?? 'm³'),
    'poolVolumeUpdatedAt' => $hasPoolVolumePayload ? $now : ($existingOutput['poolVolumeUpdatedAt'] ?? null),
    'poolVolumeSource' => 'Home Assistant',
    'poolVolumeEntityId' => $hasPoolVolumePayload ? $poolVolumeSourceEntity : ($existingOutput['poolVolumeEntityId'] ?? DEFAULT_POOL_VOLUME_ENTITY),
    'orp' => $hasOrpPayload ? round((float) $orp, 0) : ($existingOutput['orp'] ?? null),
    'orpUnit' => $hasOrpPayload ? $orpUnit : ($existingOutput['orpUnit'] ?? 'mV'),
    'orpUpdatedAt' => $hasOrpPayload ? $now : ($existingOutput['orpUpdatedAt'] ?? null),
    'orpSource' => 'Home Assistant',
    'orpEntityId' => $hasOrpPayload ? $orpSourceEntity : ($existingOutput['orpEntityId'] ?? DEFAULT_ORP_ENTITY),
];

$json = json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($json === false || file_put_contents($temporaryPath, $json . PHP_EOL, LOCK_EX) === false) {
    send_json(500, ['error' => 'Could not write pool temperature.']);
}

if (!rename($temporaryPath, $outputPath)) {
    @unlink($temporaryPath);
    send_json(500, ['error' => 'Could not publish pool temperature.']);
}

send_json(200, ['ok' => true] + $output);
