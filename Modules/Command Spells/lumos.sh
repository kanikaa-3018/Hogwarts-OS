#!/bin/bash

# Lumos: Switch to light mode with magical colors 🌟

# Terminal Colors for Light Mode
gsettings set org.cinnamon.desktop.interface gtk-theme 'Mint-Y-Light'
gsettings set org.cinnamon.desktop.background picture-uri "file://$HOME/Downloads/hogwarts_light.jpg"
gsettings set org.cinnamon.desktop.interface cursor-theme 'DMZ-White'

# Terminal color customization (Light)
echo -e "\033[1;33m💡Want some other spell? try it :p 💡\033[0m"
