# Easy Electrophysiology — User Manual

The [Easy Electrophysiology](https://www.easyelectrophysiology.com) user manual,
published as a [Quarto](https://quarto.org) website. Each chapter is a separate
page (`*.qmd`).

**Live site:** <https://easy-electrophysiology.github.io/manual/>

## Preview locally

Install [Quarto](https://quarto.org/docs/get-started/), then from the repo root:

```bash
quarto preview book   # live-reloading local server
# or
quarto render book    # one-off build into book/_site/
```

## Structure

- `book/_quarto.yml` — book configuration (title, chapter order, theme).
- `book/index.qmd` — landing page (Welcome).
- `book/*.qmd` — one file per manual chapter, in sidebar order.
- `book/images/` — screenshots used by the current manual.
- `book/assets/` — logo, favicon, and version selector.
- `book/styles.scss` — brand colours and image styling.

## Publishing

The site keeps the newest manual at the root URL and stores each released
manual under `/versions/<version>/`.

- Commits and pushes to `main` do **not** publish or freeze documentation.
- Creating a tag alone does **not** publish or freeze documentation.
- Publishing a GitHub Release whose tag is `manual-vX.Y.Z` publishes **Latest**,
  creates `/versions/X.Y.Z/`, and adds that release to the version dropdown.
- Existing versioned snapshots are preserved by later deployments.

### Release a new manual version

1. Update the files under `book/` and preview them locally.
2. Commit and push the finished documentation to `main`.
3. Create and push a version tag from that exact commit:

```bash
git tag manual-v2.8.0
git push origin manual-v2.8.0
```

4. On GitHub, open **Releases → Draft a new release**.
5. Choose the existing `manual-v2.8.0` tag, add release notes, and click
   **Publish release**. Do not select **Set as a pre-release** unless intended.
6. Check the **Actions** tab. When the `Publish manual` workflow completes, the
   root URL shows 2.8.0 as Latest and the dropdown links to the frozen 2.8.0
   snapshot.

The equivalent GitHub CLI command for steps 4–5 is:

```bash
gh release create manual-v2.8.0 --title "Manual 2.8.0" --generate-notes
```

Use a new version number for every release. A published version is treated as
immutable; fix documentation for an old application version by releasing a new
patch version instead of replacing its existing snapshot.

The site is served at the live URL above. Deployment status is visible under
the repository's **Actions** tab.
