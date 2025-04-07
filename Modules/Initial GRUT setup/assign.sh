#!/bin/bash

HOUSE_FILE="$HOME/.house"

if [ ! -f "$HOUSE_FILE" ]; then
    HOUSES=("Gryffindor" "Slytherin" "Ravenclaw" "Hufflepuff")
    HOUSE=${HOUSES[$RANDOM % 4]}
    echo "$HOUSE" > "$HOUSE_FILE"
else
    HOUSE=$(cat "$HOUSE_FILE")
fi

WALLPAPER_DIR="$HOME/harrypotter"
IMAGE_PATH="file://$WALLPAPER_DIR/${HOUSE,,}.jpg"

if [ -f "$WALLPAPER_DIR/${HOUSE,,}.jpg" ]; then
    feh --bg-scale "$HOME/harrypotter/${HOUSE,,}.jpg"

else
    notify-send "⚠️ Missing Wallpaper" "No wallpaper found for $HOUSE."
fi

# Apply theme settings
case "$HOUSE" in
    "Gryffindor")
        gsettings set org.cinnamon.desktop.interface icon-theme "Mint-Y-Red"
        ;;
    "Slytherin")
        gsettings set org.cinnamon.desktop.interface icon-theme "Mint-Y-Green"
        ;;
    "Ravenclaw")
        gsettings set org.cinnamon.desktop.interface icon-theme "Mint-Y-Blue"
        ;;
    "Hufflepuff")
        gsettings set org.cinnamon.desktop.interface icon-theme "Mint-Y-Yellow"
        ;;
esac

notify-send "🎩 Welcome to $HOUSE!" "Your Hogwarts OS theme is now active."
