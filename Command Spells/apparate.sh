#!/bin/bash

# Get a random directory from user-friendly locations
TARGET_DIR=$(find ~/Documents ~/Downloads ~/Pictures ~/Desktop -type d 2>/dev/null | shuf -n 1)

# Fallback in case no directories are found
if [ -z "$TARGET_DIR" ]; then
    TARGET_DIR="$HOME"
fi

# Store the target directory in a temporary file
echo "$TARGET_DIR" > /tmp/apparate_target

# Display the teleportation message
echo "✨ Apparating to a random location... ✨"

# Try to teleport (change directory)
if cd "$TARGET_DIR"; then
    echo "🔮 You have arrived at: $TARGET_DIR"
    exec $SHELL
else
    echo "❌ Apparition failed! Staying in the current location."
fi
