param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$')]
    [string]$Version
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$siteDir = Join-Path $repoRoot '_site'
$publishDir = Join-Path ([System.IO.Path]::GetTempPath()) "ee-manual-publish-$PID"

function Copy-DirectoryContents([string]$Source, [string]$Destination) {
    New-Item -ItemType Directory -Force -Path $Destination | Out-Null
    Get-ChildItem $Source -Force | ForEach-Object {
        Copy-Item $_.FullName $Destination -Recurse -Force
    }
}

Push-Location $repoRoot
try {
    if (git status --porcelain) {
        throw 'Commit or stash source changes before publishing.'
    }

    $versions = Get-Content (Join-Path $repoRoot 'versions.json') -Raw | ConvertFrom-Json
    if ($Version -notin @($versions.version)) {
        throw "Add version $Version to versions.json before publishing."
    }

    quarto render
    if ($LASTEXITCODE -ne 0) {
        throw 'Quarto render failed.'
    }

    $remote = git remote get-url origin
    git clone --quiet $remote $publishDir
    Push-Location $publishDir
    try {
        git show-ref --verify --quiet refs/remotes/origin/gh-pages
        if ($LASTEXITCODE -eq 0) {
            git switch --quiet --create gh-pages --track origin/gh-pages
        } else {
            git switch --quiet --orphan gh-pages
            git rm --quiet -r --ignore-unmatch .
        }

        Get-ChildItem . -Force |
            Where-Object { $_.Name -notin @('.git', 'versions') } |
            Remove-Item -Recurse -Force

        Copy-DirectoryContents $siteDir $publishDir
        $versionDir = Join-Path $publishDir "versions\$Version"
        Remove-Item $versionDir -Recurse -Force -ErrorAction SilentlyContinue
        Copy-DirectoryContents $siteDir $versionDir
        New-Item -ItemType File -Force -Path (Join-Path $publishDir '.nojekyll') | Out-Null

        git add --all
        git diff --cached --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "No publishing changes for version $Version."
            return
        }

        git commit --quiet -m "Publish manual $Version"
        git push origin gh-pages
        if ($LASTEXITCODE -ne 0) {
            throw 'Push to gh-pages failed.'
        }
    } finally {
        Pop-Location
    }
} finally {
    Pop-Location
    Remove-Item $publishDir -Recurse -Force -ErrorAction SilentlyContinue
}