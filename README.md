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

## Publishing an update

Type `rebuild-chords` in Terminal. It checks the code, bumps the version (shown at the bottom of Settings), commits, does a plain push to GitHub and waits until the live site has it. `rebuild-chords "what changed"` adds your own message; `rebuild-chords same` publishes without bumping the version.

## Team sync (Supabase)

Settings → Team → **Create a team** gives a code and an invite link. Everyone in the team shares one library and one set of setlists, and changes show up live on every device. Each device also keeps a copy, so it works offline and syncs when it's back online. When two people edit the same song, the newest edit wins.

- `config.js` holds the Supabase project URL and the publishable (anon) key. Both are safe to publish.
- `supabase/schema.sql` creates the tables, the security rules (only team members can read or write a team's songs) and the create/join functions. Run it in the Supabase SQL Editor.
- Anonymous sign-ins must be switched on (Authentication → Sign In / Providers).

## Layout

- Phones: bottom bar = Songs, Artists, **+** (new song), Setlists, Favorites. Settings is the cog at the top right.
- Computers: sidebar with the same pages plus Settings.
- Settings is in sections: Team, Appearance, Preferences, Library (share, import, restore, recently deleted).

## Features

- Songs with key, tempo, time signature, tags and notes. You can search, filter by tag, sort, and mark favourites.
- Chords as numbers, sol-fa (do di re mo mi fa fi so zi la to ti by default, editable) or letters. Special names can have their own sol-fa name.
- My key (Settings): pick a key, e.g. F, and every song shows in it for you only, so tapping a chord shows it in F. Any song can have its own key.
- Tap any chord to see its letter name and notes on a keyboard, in the key being played.
- Three keys per song: the original, the key the band plays it in (set on the song, or per setlist), and your own transposition (just for you, on your device). Tap the key card to flip to the original; tap again to flip back.
- Song bar order: Full screen, text size, Transpose, Keys / Bass / Lyrics, then 1 2 3 / do re mi / C D E. Your default view is set in Settings.
- YouTube link on each song (a Listen button plays it in the app; with no link it searches YouTube for the song).
- Handwritten chord numbers: if the printed words have chord numbers written above them in pen, the scan finds each number (a small handwriting-recognition model in digit-model.js reads them on your device), places it over the word it was written above, and puts a loose "Intro" note into an Intro block. iPhone HEIC photos work on computers too. Always check the result against the page: where a number crosses a printed word, that word can be misread.
- Scan your paper folder: Settings → Library → Scan pages. Choose many photos at once; each is read, then you check the titles, artist, key and words (pages without a title join the song above) and add them all in one tap, tagged Needs chords.
- Scan paper: photograph a printed lyric page and it is read into the lyrics box (reading tool downloads the first time). Find lyrics online: type the title and artist and the app offers to pull the lyrics from a free public service (LRCLIB).
- Artists are shared items (name + portrait you choose). Pick one from a list when adding a song, or add a new one, so names are always spelled the same. With a team they are shared with everyone. Renaming an artist renames them on all their songs. The Artists tab lists them all, with their songs.
- Nothing is lost: deleted songs, setlists and artists go to Settings → Recently deleted and can be restored for the whole team. A device can never delete by itself: only what you delete on purpose is sent. The database keeps a history of every change (supabase/schema.sql update 7).
- Admin audit: Settings → Preferences → Audit (admin password) lists every song with who last edited it and when. Tap a song to see every earlier version, who made it and what changed, and restore any of them for the whole team (needs supabase/schema.sql updates 7 and 8).
- Artist photos are protected: a blank photo can't overwrite one by accident (the database keeps the old photo unless you removed it on purpose), and a device that still has the photo sends it back to the team.
- Lost the team code? Settings → Team → Find our team (admin password) lists every team with its code.
- Delete a song from its page, or tap Select in the library to delete several at once (with Undo).
- Keys, Bass (bass note only) or Lyrics-only view.
- Setlists with a date, notes and a key per song. Swipe or use the ←/→ keys to move between songs.
- Full screen with a play button for auto-scroll (speed set in Settings, adjustable while scrolling), and a metronome with a click or a flash only.
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
