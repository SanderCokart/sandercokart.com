<?php

if (! function_exists('secret_or_env')) {
    /**
     * Gets a secret from /run/secrets/ first, then falls back to the environment variable if not found,
     * but only if the environment is local.
     *
     * @throws Exception
     */
    function secret_or_env(string $key, ?string $default = null): mixed
    {
        $secretPath = "/run/secrets/$key";

        if (is_readable($secretPath)) {
            $secret = file_get_contents($secretPath);

            return trim($secret);
        }

        if (in_array(getenv('APP_ENV'), ['local', 'testing'])) {
            $value = getenv($key);

            return $value ?? $default;
        }

        throw new \Exception("Secret $key not found in /run/secrets/ and environment is not local.");
    }
}
