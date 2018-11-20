const config = {};

// The OAuth client ID from the Google Developers console.
config.oAuthClientID = '600756880051-t2quk096og52s9i6h4vv7ugg7ael46kr.apps.googleusercontent.com';

// The OAuth client secret from the Google Developers console.
config.oAuthClientSecret = 'hYN8D5jclFXm8lEnCfUHXPgf';

config.oAuthTokenUri = 'https://www.googleapis.com/oauth2/v3/token';

// The scopes to request. The app requires the photoslibrary.readonly and
// plus.me scopes.
config.scopes = [
    'https://www.googleapis.com/auth/photoslibrary.readonly',
    'profile',
];

// The number of photos to load for search requests.
config.photosToLoad = 150;

// The page size to use for search requests. 100 is reccommended.
config.searchPageSize = 100;

// The page size to use for the listing albums request. 50 is reccommended.
config.albumPageSize = 50;

// The API end point to use. Do not change.
config.apiEndpoint = 'https://photoslibrary.googleapis.com';

// module.exports = config;