#!/bin/bash

echo "Starting potion brewing..."
sleep 2

for app in "$@"
do
    echo "Installing $app..."
    echo "[sudo] Password required to install $app:"
    sudo apt-get install -y "$app"
done

echo "$@" | tr ' ' '\n' >> installed_apps.txt
echo "Potion ready! All apps installed."
