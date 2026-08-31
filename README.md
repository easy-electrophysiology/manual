# Easy Electrophysiology — User Manual

The [Easy Electrophysiology](https://www.easyelectrophysiology.com) user manual,
published as a [Quarto](https://quarto.org) website. Each chapter is a separate
page (`*.qmd`).

**Live site:** <https://easy-electrophysiology.github.io/manual/>

## Preview locally

Install [Quarto](https://quarto.org/docs/get-started/), then from the repo root:

```bash
quarto preview   # live-reloading local server
# or
quarto render    # one-off build into _site/
```

## Structure

- `_quarto.yml` — book configuration (title, chapter order, theme).
- `index.qmd` — landing page (Welcome).
- `*.qmd` — one file per manual chapter, in sidebar order.
- `images/` — screenshots used by the current manual.
- `assets/` — logo and favicon.
- `styles.scss` — brand colours and image styling.

## Publishing

The site keeps the newest manual at the root URL and stores each released
manual under `/versions/<version>/`. Add the release to `versions.json`, commit
the source changes, then run from the repo root:

```powershell
.\scripts\publish.ps1 -Version 2.7.3
```

The script renders the book, updates the root site, snapshots that render under
the requested version, and pushes the `gh-pages` branch. Existing versioned
snapshots are preserved.

**One-time setup:** after the first publish, open *Settings → Pages*, choose
**Deploy from a branch**, select `gh-pages` and `/ (root)`, then save. The site
is served at the live URL above.
