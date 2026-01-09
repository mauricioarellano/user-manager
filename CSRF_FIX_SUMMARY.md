# CSRF Token Mismatch - Fix Summary

## Problem
You were experiencing a "CSRF token mismatch" error when trying to login.

## Root Cause
Your application uses **Laravel Sanctum with token-based authentication** (not session-based), but the `EnsureFrontendRequestsAreStateful` middleware was trying to enforce CSRF protection on API routes. 

Since your login/register endpoints return API tokens (not sessions), they should be **excluded from CSRF verification**.

## The Fix

### 1. Backend - Exclude API Routes from CSRF (`backend/app/Http/Middleware/VerifyCsrfToken.php`)

**Before:**
```php
protected $except = [
    //
];
```

**After:**
```php
protected $except = [
    'api/*',
];
```

This tells Laravel to **not enforce CSRF protection** on any routes starting with `/api/*`, which is appropriate for token-based authentication.

### 2. Backend - Session Configuration (`backend/config/session.php`)

**Before:**
```php
'same_site' => 'lax',
```

**After:**
```php
'same_site' => env('SESSION_SAME_SITE', 'lax'),
```

This makes the SameSite cookie policy configurable via environment variables.

### 3. Backend - CORS Configuration (`backend/config/cors.php`)

**Before:**
```php
'allowed_origins' => ['*'],
```

**After:**
```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
],
```

When using `supports_credentials: true`, you cannot use wildcard origins. Must specify exact origins.

### 4. Frontend - Enable Credentials (`frontend/src/services/api.ts`)

**Before:**
```typescript
withCredentials: false,
```

**After:**
```typescript
withCredentials: true,
```

This allows cookies to be sent/received (needed for any future session-based features).

### 5. Frontend - Simplified Auth Service (`frontend/src/services/authService.ts`)

**Removed unnecessary CSRF cookie request** since we're using token-based auth, not session-based auth.

## How It Works Now

1. **Login Request**: Frontend sends credentials to `/api/login`
2. **No CSRF Check**: Backend skips CSRF verification for `/api/*` routes
3. **Token Response**: Backend returns a Sanctum API token
4. **Token Storage**: Frontend stores token in localStorage
5. **Authenticated Requests**: Frontend sends token in `Authorization: Bearer <token>` header

## Testing

### Via curl (confirmed working):
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {...},
  "token": "3|34QVsNJ4vs5lfiTBRV0C3ecA0sM7cynKy6WGu8Ga9aaf3cf2"
}
```

### Via Browser:
1. Clear browser cookies/cache or use incognito mode
2. Navigate to `http://localhost:3000`
3. Login with:
   - **Email:** `admin@example.com`
   - **Password:** `password`
4. Should work without CSRF errors!

## Why This Is The Correct Approach

### Token-Based Auth (Your App)
- ✅ No CSRF protection needed on login/register
- ✅ Token sent in Authorization header
- ✅ Stateless authentication
- ✅ Works great for SPAs and mobile apps

### Session-Based Auth (Alternative)
- ❌ Would require CSRF protection
- ❌ Cookies store session ID
- ❌ Stateful authentication
- ❌ More complex for SPAs

Your application correctly uses **token-based authentication**, so excluding API routes from CSRF verification is the proper solution.

## Important Notes

### For Production
Update CORS origins in `backend/config/cors.php`:
```php
'allowed_origins' => [
    'https://your-production-domain.com',
],
```

### Security Considerations
- ✅ API tokens are still validated via Sanctum
- ✅ HTTPS should be used in production
- ✅ Tokens are stored securely in localStorage
- ✅ Protected routes still require authentication

## Troubleshooting

If you still have issues:

1. **Clear browser cache and cookies**
2. **Restart containers:**
   ```bash
   docker restart user_management_backend user_management_frontend
   ```
3. **Check logs:**
   ```bash
   docker logs user_management_backend --tail 50
   docker logs user_management_frontend --tail 50
   ```
4. **Verify containers are running:**
   ```bash
   docker ps
   ```

## Changes Summary

| File | Change | Reason |
|------|--------|--------|
| `backend/app/Http/Middleware/VerifyCsrfToken.php` | Exclude `api/*` | Token auth doesn't need CSRF |
| `backend/config/cors.php` | Specific origins | Can't use `*` with credentials |
| `backend/config/session.php` | Configurable same_site | Better flexibility |
| `frontend/src/services/api.ts` | `withCredentials: true` | Allow cookies if needed |
| `frontend/src/services/authService.ts` | Remove CSRF cookie request | Not needed for token auth |

## References
- [Laravel Sanctum - SPA Authentication](https://laravel.com/docs/sanctum#spa-authentication)
- [Laravel Sanctum - API Token Authentication](https://laravel.com/docs/sanctum#api-token-authentication)
- [CSRF Protection in Laravel](https://laravel.com/docs/csrf)

