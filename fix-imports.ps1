$files = Get-ChildItem -Path "C:\Users\johnn\Documents\Private-work\The Elites\new-website\elites-website\src" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace 'from "motion/react"', 'from "framer-motion"'

    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "Import replacement complete!"
