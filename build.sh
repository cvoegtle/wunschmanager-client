#!/usr/bin/env bash
ng build --prod
appcache-manifest dist/*.{ico,html,js,webapp,css} --network-star -p /~christian/wunschmanager/ -o dist/ww.appcache
