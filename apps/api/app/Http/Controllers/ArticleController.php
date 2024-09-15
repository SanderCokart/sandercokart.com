<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::all();
    }

    public function store(Request $request): Article
    {
        $validatedData = $request->validate([
            'content'      => ['required'],
            'title'        => ['required'],
            'published_at' => ['nullable', 'date'],
            'description'  => ['required'],
        ]);

        return Article::create($validatedData);
    }

    public function show(Article $article): Article
    {
        return $article;
    }

    public function update(Request $request, Article $article): Article
    {
        $validatedData = $request->validate([
            'content'      => ['string', 'required'],
            'title'        => ['string', 'required'],
            'published_at' => ['nullable', 'date'],
            'description'  => ['string', 'required'],
        ]);

        $article->update($validatedData);

        return $article;
    }

    public function destroy(Article $article): Response
    {
        $article->delete();

        return response()->noContent();
    }

    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file'],
        ]);

        $path = Storage::disk('media')->putFile('uploads', $request->file('file'));

        return response()->json([
            'url' => Storage::disk('media')->url($path),
        ]);
    }
}
