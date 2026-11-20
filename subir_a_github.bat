@echo off
chcp 65001 > nul
echo ========================================================
echo    🦉 Conectar y Subir EnglishGo a tu GitHub
echo ========================================================
echo.
echo Ingresa el enlace URL de tu repositorio de GitHub:
echo (Ejemplo: https://github.com/tu-usuario/english-go.git)
echo.
set /p REPO_URL="URL del Repositorio: "

if "%REPO_URL%"=="" (
    echo [ERROR] No ingresaste ninguna URL. Operacion cancelada.
    pause
    exit /b
)

echo.
echo Conectando repositorio remoto...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo Subiendo proyecto a GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  ¡PROYECTO SUBIDO CON EXITO A GITHUB!
    echo ========================================================
    echo.
    echo Para activar la instalacion en telefonos via GitHub Pages:
    echo 1. Entra a tu repositorio en GitHub.
    echo 2. Ve a Settings (Configuracion) ^> Pages.
    echo 3. En 'Source', selecciona 'GitHub Actions'.
    echo 4. ¡Listo! Tu app se desplegara automaticamente con su enlace web.
) else (
    echo.
    echo [AVISO] Hubo un problema al subir. Asegurate de haber iniciado sesion
    echo en GitHub en tu terminal o haber creado el repositorio vacio previamente.
)

pause
