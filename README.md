# Portfolio v2 · Variant Terminal

Plain HTML/CSS/JS. No build step: open `index.html` in a browser.

| File | What it is |
|------|------------|
| `data.js` | **All the content.** Edit this to update the site. |
| `app.js` | Renders the content (tabs, project pages, boot + prune animation). |
| `styles.css` | The CRT look. Colours live at the top in `:root`. |
| `index.html` | Page shell + background timeline graphic. |
| `images/` | Put project screenshots here. |

## Add a project
1. Open `data.js` and find `projects: [`.
2. Copy one whole `{ ... }` project block, paste it after the last one, and add a comma between them.
3. Edit the text. The project number, "1/5" counters, prev/next buttons and the boot screen's "N FOUND" update on their own.

## Add screenshots
Drop the image into `images/` and set its path in the project's `shots`:
```js
shots: [ ["ROOM LOBBY", "images/surakshit-lobby.png"] ]
```
Leave the path `""` to show a placeholder box.

## Add a missing link
Fill in the third value, e.g. `["LIVE SITE", "surakshit.app ↗", "https://surakshit.app"]`.
An empty `""` url shows the text greyed out instead of a link.
