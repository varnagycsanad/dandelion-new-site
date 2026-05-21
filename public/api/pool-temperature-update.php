<?php
declare(strict_types=1);

const POOL_TEMPERATURE_SECRET_HASH = '78cd1b39ea25d82d3e10f67722dc36155c84b608035ea2e55c6c2953ed2d8e47';
const POOL_TEMPERATURE_MIN = -5;
const POOL_TEMPERATURE_MAX = 45;

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
$output = [
    'temperature' => $temperature,
    'unit' => $unit,
    'updatedAt' => date(DATE_ATOM),
    'source' => 'Home Assistant',
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
