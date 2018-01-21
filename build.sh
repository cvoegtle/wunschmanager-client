#!/usr/bin/env bash
ng build --prod
appcache-manifest dist/*.{ico,html,js,webapp,css,png} dist/assets/*.{ico,html,js,webapp,css,png} --network-star -p / -o dist/wm.appcache
