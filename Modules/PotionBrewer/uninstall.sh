#!/bin/bash

echo "Starting uninstallation potion..."
sleep 2  # Simulating magical process

for app in "$@"
do
    echo "Removing $app..."
    echo "[sudo] Password required to remove $app:"
    sudo apt-get remove -y "$app"
done

echo "Potion complete! Selected apps removed."
echo "$@" >> uninstalled_apps.txt
