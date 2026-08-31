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

Pushing to `main` triggers `.github/workflows/publish.yml`, which renders the
book and publishes it to the `gh-pages` branch.

**One-time setup:** in *Settings → Pages*, set the source to the `gh-pages`
branch (root). The site is then served at the live URL above.
