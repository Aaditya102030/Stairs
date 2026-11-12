# Moves UNUSED original images out of public/images into a backup folder OUTSIDE the project.
# Nothing is deleted. Subfolders (partners, team, clients) are not touched.
#
#   .\move-unused-images.ps1          -> preview only (lists what WOULD move)
#   .\move-unused-images.ps1 -Apply   -> actually moves the files

param([switch]$Apply)

$src = Join-Path $PSScriptRoot "public\images"
$dst = "C:\stairs\originals"

# Files in public/images that the website code still references. Everything else is moved.
$keep = @(
  "SANJAY RAJPAL.avif",
  "RUKMINI VIJAYAKUMAR.avif",
  "SHREYAS KARNAD.avif",
  "PRAGATHI GUPTA.png",
  "JANANI ANANTHAKUMAR.jpg",
  "physiotherapy.avif",
  "myofascial release.avif",
  "group session.avif",
  "sports secific training.avif",
  "strength and conditioning.avif",
  "bio mechanical assessment.avif",
  "fit-to-run-white_edited_edited.avif",
  "hero-bg.png",
  "testimonials-bg.png"
)

$files = Get-ChildItem -Path $src -File | Where-Object { $keep -notcontains $_.Name }
$totalMB = [math]::Round((($files | Measure-Object Length -Sum).Sum) / 1MB, 1)

if (-not $Apply) {
  $files | Sort-Object Length -Descending | ForEach-Object {
    "{0,8:N2} MB  {1}" -f ($_.Length / 1MB), $_.Name
  }
  "`nPREVIEW ONLY: $($files.Count) files, $totalMB MB would move to $dst"
  "Run again with -Apply to move them."
} else {
  New-Item -ItemType Directory -Force -Path $dst | Out-Null
  $files | Move-Item -Destination $dst
  "Moved $($files.Count) files ($totalMB MB) to $dst"
}
