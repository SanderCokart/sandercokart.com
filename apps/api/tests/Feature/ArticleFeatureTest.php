<?php

use App\Article;

use function Pest\Laravel\{getJson, postJson, putJson, deleteJson};


/**
 * Test the Article feature.
 * Test the index, show, store, update, destroy methods.
 */

test('index articles', function () {
    Article::factory()->create();
    $response = getJson(route('articles.index', absolute: false));
    $response->assertStatus(200)->assertJsonStructure([
        '*' => [
            'id',
            'title',
            'description',
            'content',
            'slug',
            'deleted_at',
            'created_at',
            'updated_at',
            'published_at',
        ],
    ]);
});

test('show article', function () {
    $article = Article::factory()->create();
    $response = getJson(route('articles.show', $article->slug, absolute: false));
    $response->assertStatus(200)->assertJsonStructure([
        'id',
        'title',
        'description',
        'content',
        'slug',
        'deleted_at',
        'created_at',
        'updated_at',
        'published_at',
    ]);
});

test('store article', function () {
    $response = postJson(route('articles.store', absolute: false), [
        'title' => 'Test Title',
        'description' => 'Test Description',
        'content' => 'Test Content',
        'published_at' => now()->toDateTimeString(),
    ]);

    $response->assertStatus(201)->assertJsonStructure([
        'id',
        'title',
        'description',
        'content',
        'slug',
        'created_at',
        'updated_at',
        'published_at',
    ]);
});

test('update article', function () {
    $article = Article::factory()->create();
    $response = putJson(route('articles.update', $article->slug, absolute: false), [
        'title' => 'Test Title',
        'description' => 'Test Description',
        'content' => 'Test Content',
        'published_at' => now(),
    ]);
    $response->assertStatus(200)->assertJsonStructure([
        'id',
        'title',
        'description',
        'content',
        'slug',
        'created_at',
        'updated_at',
        'published_at',
    ]);
});


test('destroy article', function () {
    $article = Article::factory()->create();
    $response = deleteJson(route('articles.destroy', $article->slug, absolute: false));
    $response->assertStatus(204);
});
