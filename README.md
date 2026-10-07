# Stobite Chords

A song library with number / solfa / letter chord charts, for keys and bass. It's plain HTML, CSS and JS, with no build step.

## Run it locally

```
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Put it on your phone

Host the folder on any static host, for example Netlify Drop (drag the folder onto app.netlify.com/drop), GitHub Pages or Cloudflare Pages. Open the URL on your phone and choose **Add to Home Screen**. It then works offline like an app.

Without a team, each device keeps its own library. Use **Share** to move songs between people or devices.

## Team sync (Supabase)

Settings → Team → **Create a team** gives a code and an invite link. Everyone in the team shares one library and one set of setlists, and changes show up live on every device. Each device also keeps a copy, so it works offline and syncs when it's back online. When two people edit the same song, the newest edit wins.

- `config.js` holds the Supabase project URL and the publishable (anon) key. Both are safe to publish.
- `supabase/schema.sql` creates the tables, the security rules (only team members can read or write a team's songs) and the create/join functions. Run it in the Supabase SQL Editor.
- Anonymous sign-ins must be switched on (Authentication → Sign In / Providers).

## Features

- Songs with key, tempo, time signature, tags and notes. You can search, filter by tag, sort, and mark favourites.
- Chords as numbers, sol-fa (do de re ma mi fa fi so zi la ta ti) or letters, with a transpose picker.
- Tap any chord to see its letter name and notes on a keyboard, in the key being played.
- Three keys per song: the original, the key the band plays it in (set on the song, or per setlist), and your own transposition (just for you, on your device). Tap the key card to flip to the original; tap again to flip back.
- Song bar order: Transpose, 1 2 3 / do re mi / C D E, text size, Full screen, then Keys / Bass / Lyrics. Your default view is set in Settings.
- Delete a song from its page, or tap Select in the library to delete several at once (with Undo).
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
- The band's chord language: a plain 2, 3 or 6 is minor, 7 is diminished, and special names such as 4m, 1♯ (6 made major), 4♯ (2 made major), 5♯ (3 made major) and 6♯ (2 with a raised 5th) are set in Settings → Chord language (password-locked, shared with the team).
- Numbers `1`–`7`, with `m`, `7`, `sus4`, `+`/`aug`, `°`/`dim` and so on. Flats and sharps go before or after the number (`♭7`, `6♭`, `5♯`). Typing `flat` or `sharp` turns into ♭ / ♯. Use a slash for the bass note (`1/5`, `♭7/5`).
- Letter chords (`G`, `C/E`) are converted to numbers using the song key when you save.
- Section lines: `Verse 1`, `Chorus`, `Bridge`, `{Anything}`. A line starting with `#` is a note.

## Files

- `app.js`: the app
- `songs.js`: the starter hymns (public domain only)
- `styles.css`, `sw.js` (offline cache), `manifest.webmanifest`
