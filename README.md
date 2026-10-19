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

- Commits and pushes to `main` do not publish documentation.
- Pushing a version tag such as `v2.9.0` runs the `Publish manual` workflow.
- The workflow publishes Latest, creates `/versions/2.9.0/`, and adds the
  version to the manifest while preserving previous versions and their entries.
  The version dropdown is currently hidden, and the 2.8.0 web snapshot is retired.
- Publishing a GitHub Release is optional and does not trigger another deployment.

### Release a new manual version

1. Update the files under `book/` and preview them locally.
2. Commit and push the finished documentation and workflow to `main`.
3. Create and push a version tag from that exact commit:

```bash
git tag v2.9.0
git push origin refs/tags/v2.9.0
```

4. Check **Actions → Publish manual** for successful completion.
5. Optionally publish a GitHub Release using that existing tag.

For an existing tag that has not been deployed, run **Actions → Publish manual
→ Run workflow** from `main`, supplying the tag (for example `v2.9.0`) as
`release_tag`. This uses the current workflow to render the tagged source.
For documentation corrections without moving a release tag, optionally supply
`source_ref` with the corrected commit or branch. This updates Latest and that
version's web snapshot while leaving the Git tag and GitHub Release unchanged.

Use a new version number for each release. Manual redeployment replaces that
version's snapshot and makes it Latest, so only redeploy an older version when
that is intentional.
