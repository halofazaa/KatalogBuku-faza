@echo off
title BookCatalog Launcher
echo ========================================================
echo   Menjalankan BookCatalog (Next.js Backend + React Vite)
echo ========================================================
echo.
echo [1/2] Menjalankan Backend Next.js di Port 3001...
start "BookCatalog - Backend (Next.js :3001)" cmd /k "cd /d %~dp0backend && npm run dev"

echo [2/2] Menjalankan Frontend React di Port 5173...
start "BookCatalog - Frontend (React :5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo   Kedua server berhasil dijalankan di jendela terpisah!
echo   - Backend API : http://localhost:3001/api/books
echo   - Frontend UI : http://localhost:5173
echo ========================================================
echo.
pause
