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
        $now = Carbon::now();

        //we need a date in the past and set it as created at, we then need to set the updated at to a date after the created at date
        // and finally we need to set the published at date to a date after the created at date

        $createdAt = $this->faker->dateTimeBetween($now->copy()->subDays(30), $now);
        $updatedAt = $this->faker->dateTimeBetween($createdAt, $now);
        $publishedAt = $this->faker->dateTimeBetween($createdAt, $now);

        return [
            'created_at'   => $createdAt,
            'updated_at'   => $updatedAt,
            'content'      => $this->faker->realTextBetween(1000, 3000),
            'title'        => $this->faker->sentence(),
            'published_at' => $publishedAt,
            //'slug'         => $this->faker->slug(),
            'description'  => $this->faker->realTextBetween(100,200),
        ];
    }
}
