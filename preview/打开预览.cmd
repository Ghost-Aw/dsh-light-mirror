@echo off
chcp 65001 >nul
setlocal
rem 打开「光之镜 · 天空岛」v2 插件的离线预览页。
rem splash：单幕终端场景启动动画（?t=秒 定格、?mute=1、?reduced=1、?finish=1）
rem ui    ：主界面 mock（?mode=terminal|temple&page=shell|settings&rail=1）
set "ROOT=%~dp0"

if exist "%ROOT%splash.html" (
  start "" "%ROOT%splash.html"
) else (
  echo [warn] preview\splash.html 不存在
)

if exist "%ROOT%ui.html" (
  start "" "%ROOT%ui.html?mode=terminal&page=shell"
) else (
  echo [warn] preview\ui.html 不存在
)

endlocal