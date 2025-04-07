#!/bin/bash

echo "💨✨ Disapparating... You are vanishing into thin air! 🌀"
sleep 2

# Get a list of non-hidden directories from home folder
directories=($(find ~ -mindepth 1 -maxdepth 3 -type d -not -path '*/.*' 2>/dev/null))

# Select a random directory (fallback to home if empty)
random_dir=${directories[$RANDOM % ${#directories[@]}]}
if [ -z "$random_dir" ]; then
    random_dir="$HOME"
fi

# Navigate to the randomly selected directory
cd "$random_dir" || exit

echo "🔮 You have Disapparated to: $random_dir"
sleep 2

# Close the terminal safely
case "$SHELL" in
    *bash) exit ;;
    *zsh) exit ;;
    *fish) exit ;;
    *) pkill -P $$ ;;
esac
