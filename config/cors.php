<?php

return [
    'paths' => ['api/*'], // Set this for API routes or other paths that need CORS
    'allowed_methods' => ['*'], // Allows all methods
    'allowed_origins' => ['*'], // Allows all origins (you can restrict this to specific domains)
    'allowed_headers' => ['*'], // Allows all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
