---
title: Don't store JWTs in localStorage
slug: jwt-localstorage
description: Any script on your page can read localStorage, so one XSS bug can steal your users' tokens. Store auth tokens in HttpOnly, Secure, SameSite cookies instead.
date: 2026-10-28
series: ai-explained
youtube: kXOo_6mxtnU
facebook: https://facebook.com/reel/1131516106049542
instagram: https://www.instagram.com/reel/DfCsQomu-zw/
tags: web security, jwt, xss, cookies, authentication
---
Storing your JWT in `localStorage` is one of the most common shortcuts in web apps, and one of the riskiest. Here's why, and what to do instead.

## The problem: JavaScript can read it

Anything in `localStorage` is readable by **any script running on your page**:

```js
localStorage.getItem('token') // works for your code, and for an attacker's
```

That includes scripts you didn't write. One cross-site scripting (XSS) bug, or one compromised npm package in your bundle, and an attacker's code can read the token and send it to their own server.

With a stolen token, they can act as your user from anywhere, until the token expires. OWASP's guidance is direct: "Do not store session identifiers in local storage as the data is always accessible by JavaScript."

## The fix: an HttpOnly cookie

Have your server send the token as a cookie with three flags:

```http
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Strict; Path=/
```

- **HttpOnly**: JavaScript can't read the cookie at all. `document.cookie` won't show it.
- **Secure**: it's only sent over HTTPS.
- **SameSite=Strict**: the browser won't attach it to requests started by other sites, which blocks most cross-site request forgery.

The browser attaches the cookie to requests to your domain automatically, so your frontend doesn't need to touch the token.

## It's not magic

Be clear about what this protects. If an attacker gets XSS on your page, their script can still **send requests as the user** while the page is open, because the browser attaches the cookie (MDN notes HttpOnly cookies are still sent with JavaScript-initiated requests). What they can't do is **steal** the token and keep using it elsewhere. That limits the damage a lot.

So still fix the root cause: escape output, use a Content Security Policy, and keep dependencies in check.

## Quick checklist

- Auth token in an `HttpOnly; Secure; SameSite` cookie.
- Short-lived access tokens, with a refresh flow.
- CSP headers to make XSS harder.
- Nothing secret in `localStorage` or `sessionStorage`.

> Keep tokens out of JavaScript's reach.

## Sources

- [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)
