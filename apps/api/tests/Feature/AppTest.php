<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

test('database connection works', function () {
    $result = DB::select('SELECT 1 as test');
    expect($result[0]->test)->toBe(1);
});

test('redis cache works', function () {
    Cache::store('redis')->put('test_key', 'test_value', 10);
    $value = Cache::store('redis')->get('test_key');
    expect($value)->toBe('test_value');
});
