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
const DEFAULT_AIR_TEMPERATURE_ENTITY = 'sensor.d1_pergola_kulteri_homero_homerseklet';
const DEFAULT_HUMIDITY_ENTITY = 'sensor.d1_pergola_kulteri_homero_paratartalom';
const DEFAULT_PRESSURE_ENTITY = 'sensor.d1_pergola_kulteri_homero_nyomas';

function send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
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
