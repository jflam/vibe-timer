# Vibe Timer

Installable single-page PWA for PT holds, mobility blocks, HIIT intervals, and quick custom work/rest timers.

## First draft

- Static app: `index.html`, `styles.css`, `app.js`.
- PWA shell: `manifest.webmanifest`, `sw.js`, `assets/icon.svg`.
- Presets: PT, mobility, core, strength, HIIT, conditioning, recovery, and quick custom.
- Favorites: saved in `localStorage`.
- Cues: Web Audio start/rest/finish sounds plus vibration where supported.
- Screen-on mode: uses the Screen Wake Lock API when available.
- Experimental lock-screen controls: uses the Media Session API with play, pause, skip, previous, stop, and seek handlers where the browser/OS chooses to expose them.

## Run locally

```sh
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## PWA control notes

PWAs can expose phone-level media controls through the Media Session API, but this is not the same as a guaranteed background timer. The page can request an active media session while the timer runs, but Safari/iOS decides whether to show controls and mobile browsers can still suspend or throttle work when the screen is locked. This draft therefore labels Media Session controls as experimental, and treats Screen Wake Lock as the more reliable PWA mode.

Useful references:

- [MDN: Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- [MDN: MediaSession.setActionHandler](https://developer.mozilla.org/en-US/docs/Web/API/MediaSession/setActionHandler)
- [MDN: Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [Chrome Developers: Media Session](https://developer.chrome.com/docs/web-platform/media-session)
- [WebKit features in Safari 18.4](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/)

## Concepts

Generated visual variations are saved in `docs/concepts/`:

- `coral-focus.png`
- `teal-rehab.png`
- `dark-gym.png`
