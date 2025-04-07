#!/bin/bash

# Get the assigned house
HOUSE=$(cat ~/.house 2>/dev/null)

# Set the terminal config file path
CONFIG_FILE="$HOME/.config/gtk-3.0/terminalrc"

# Apply house colors
case "$HOUSE" in
    "Gryffindor")
        sed -i "s|background-color=.*|background-color=#740001|" "$CONFIG_FILE"   # Red
        sed -i "s|foreground-color=.*|foreground-color=#FFD700|" "$CONFIG_FILE"   # Gold
        ;;
    "Slytherin")
        sed -i "s|background-color=.*|background-color=#1A472A|" "$CONFIG_FILE"   # Green
        sed -i "s|foreground-color=.*|foreground-color=#AAAAAA|" "$CONFIG_FILE"   # Silver
        ;;
    "Ravenclaw")
        sed -i "s|background-color=.*|background-color=#0E1A40|" "$CONFIG_FILE"   # Navy Blue
        sed -i "s|foreground-color=.*|foreground-color=#FFFFFF|" "$CONFIG_FILE"   # White
        ;;
    "Hufflepuff")
        sed -i "s|background-color=.*|background-color=#EEE117|" "$CONFIG_FILE"   # Yellow
        sed -i "s|foreground-color=.*|foreground-color=#000000|" "$CONFIG_FILE"   # Black
        ;;
esac

echo "✅ House colors applied for $HOUSE!"
