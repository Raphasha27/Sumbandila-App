# scripts/setup_java8.ps1
$zipPath = "$HOME\Downloads\java-1.8.0-openjdk-1.8.0.492.b09-1.win.jdk.x86_64.zip"
$destPath = "C:\OpenJDK\jdk8"

if (Test-Path $zipPath) {
    Write-Host "Extracting Java 8 to $destPath..."
    if (!(Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force }
    # Use -Force to overwrite if needed
    Expand-Archive -Path $zipPath -DestinationPath $destPath -Force
    
    # Locate the actual JDK root folder inside the extracted path
    $jdkRoot = Get-ChildItem -Path $destPath -Directory | Select-Object -First 1
    if ($jdkRoot) {
        $jdkFullPath = $jdkRoot.FullName
        Write-Host "JDK Root found at: $jdkFullPath"

        Write-Host "Configuring Environment Variables..."
        [Environment]::SetEnvironmentVariable("JAVA_HOME", $jdkFullPath, "User")
        
        $path = [Environment]::GetEnvironmentVariable("Path", "User")
        if ($path -notlike "*$jdkFullPath\bin*") {
            [Environment]::SetEnvironmentVariable("Path", "$path;$jdkFullPath\bin", "User")
        }
        
        Write-Host "Java 8 Setup Complete! JAVA_HOME set to $jdkFullPath"
    } else {
        Write-Host "Failed to find JDK root inside $destPath"
    }
} else {
    Write-Host "Zip file not found in Downloads: $zipPath"
}
