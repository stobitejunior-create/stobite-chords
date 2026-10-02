# Stobite Chords

A song library with number / solfa / letter chord charts, for keys and bass. It's plain HTML, CSS and JS, with no build step.

## Run it locally

```
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Put it on your phone

Host the folder on any static host, for example Netlify Drop (drag the folder onto app.netlify.com/drop), GitHub Pages or Cloudflare Pages. Open the URL on your phone and choose **Add to Home Screen**. It then works offline like an app.

Each device keeps its own library in the browser. Use **Share** to move songs between people or devices. When the app is hosted, "Copy share link" imports with one tap.

## Features

- Songs with key, tempo, time signature, tags and notes. You can search, filter by tag, sort, and mark favourites.
- Chords as numbers, solfa (do re mi) or letters, with a transpose picker.
- Keys, Bass (bass note only) or Lyrics-only view.
- Setlists with a date, notes and a key per song. Swipe or use the ←/→ keys to move between songs.
- Stage mode (full screen, big text), autoscroll, and a metronome with a click or a flash only.
- Tap tempo, colour-coded sections, a summary of the chords used, and print.
- Light and dark themes. The screen stays on while a song is open.
- Share a song, a setlist or the whole library as a file, as text or as a link.

Keyboard: Space = scroll, ←/→ = next/previous song in a setlist, M = metronome, F = stage mode, +/− = text size, E = edit.

## Chart format

- Inline: `[1]Jesus is the [7]answer`
- Or chords on the line above, lined up with spaces
- Numbers `1`–`7`, with `m`, `7`, `sus4`, `°` and so on. Put accidentals in front (`b7`), and use a slash for the bass note (`1/5`, `b7/5`).
- Letter chords (`G`, `C/E`) are converted to numbers using the song key when you save.
- Section lines: `Verse 1`, `Chorus`, `Bridge`, `{Anything}`. A line starting with `#` is a note.

## Files

- `app.js`: the app
- `songs.js`: the starter hymns (public domain only)
- `styles.css`, `sw.js` (offline cache), `manifest.webmanifest`
