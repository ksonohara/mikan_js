@echo off
rem ================================================================================
rem 
rem   Project Name:
rem     mikan.js
rem 
rem   License:
rem     Copyright (C) 2008-15 K.Sonohara
rem     Code released under [Mozilla Public License, version 2.0]
rem       https://github.com/ksonohara/mikan_js/blob/master/LICENSE
rem 
rem   Module Name:
rem     Command config file.
rem 
rem ================================================================================

if "%PROJECT_HOME%" == "" (
  echo Need set PROJECT_HOME.
  pause
  goto END:
)

if not exist %APPDATA%\npm (
  mkdir %APPDATA%\npm
)

call npm install %1 grunt-cli
call npm install %1 uglify-js
call npm install %1 less
rem call npm install %1 grunt-typescript

call npm install grunt
call npm install grunt-contrib-watch
call npm install grunt-contrib-concat
call npm install grunt-contrib-uglify
call npm install grunt-contrib-clean

:END
