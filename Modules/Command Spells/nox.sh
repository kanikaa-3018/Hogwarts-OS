#!/bin/bash

# Nox: Switch to dark mode with magical colors 🌙

# Terminal Colors for Dark Mode
gsettings set org.cinnamon.desktop.interface gtk-theme 'Mint-Y-Dark'
gsettings set org.cinnamon.desktop.background picture-uri "file://$HOME/Downloads/hogwarts_dark.jpg"
gsettings set org.cinnamon.desktop.interface cursor-theme 'DMZ-Black'

# Terminal color customization (Dark)
echo -e "\033[1;34m🌙 Want some other spell? try it :p  🌙\033[0m"

