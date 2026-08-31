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
manual under `/versions/<version>/`.

- Pushes to `main` render and publish **Latest**.
- Publishing a GitHub Release whose tag is `manual-vX.Y.Z` creates or updates
	`/versions/X.Y.Z/` and adds that release to the version dropdown.
- Existing versioned snapshots are preserved by later deployments.

For example, after committing the documentation for version 2.8.0:

```bash
git tag manual-v2.8.0
git push origin manual-v2.8.0
```

Then create and publish a GitHub Release from `manual-v2.8.0`. The release event
performs the versioned deployment; creating the tag alone does not publish it.

The site is served at the live URL above. Deployment status is visible under
the repository's **Actions** tab.
