# Vibe Timer

Installable single-page PWA for PT holds, mobility blocks, HIIT intervals, and quick custom work/rest timers.

## First draft

- Static app: `index.html`, `styles.css`, `app.js`.
- PWA shell: `manifest.webmanifest`, `sw.js`, `assets/icon.svg`.
- Presets: PT, mobility, core, strength, HIIT, conditioning, recovery, and quick custom.
- Favorites: saved in `localStorage`.
- Cues: Web Audio start/rest/finish sounds plus vibration where supported.
- Cue volume: adjustable and saved locally for use over background music.
- Screen-on mode: uses the Screen Wake Lock API when available.
- Music-friendly audio: uses short Web Audio cues and avoids long-running hidden media playback so background music is less likely to be interrupted.

## Run locally

```sh
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## PWA audio notes

PWAs can expose phone-level media controls through the Media Session API, but this is not the same as a guaranteed background timer. The first draft used a hidden looping audio element to try to make iOS expose lock-screen controls, but that can cause Safari to become the active media app and interrupt Apple Music or other background audio.

This version removes the media-control bridge. It uses short Web Audio oscillator cues only. Native iOS apps can explicitly configure an `AVAudioSession` to mix with other audio, but the web app does not get that iOS-level audio-session control.

Useful references:

- [MDN: Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- [MDN: Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [WebKit features in Safari 18.4](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/)

## Concepts

Generated visual variations are saved in `docs/concepts/`:

- `coral-focus.png`
- `teal-rehab.png`
- `dark-gym.png`
