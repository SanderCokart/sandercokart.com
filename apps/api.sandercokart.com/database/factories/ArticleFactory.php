<?php

namespace Database\Factories;

use App\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        return [
            'created_at'   => Carbon::now(),
            'updated_at'   => Carbon::now(),
            'content'      => $this->faker->word(),
            'title'        => $this->faker->word(),
            'published_at' => Carbon::now(),
            'slug'         => $this->faker->slug(),
            'description'  => $this->faker->text(),
        ];
    }
}
