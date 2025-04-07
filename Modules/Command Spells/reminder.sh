#!/bin/bash

# Define reminders
messages=(
    "You've been on the screen for a while! Look away for 20 seconds. 👀"
    "Time to stretch! Get up and move around. 🚶♂️"
    "Hydration check! Grab a glass of water. 💧"
    "Take a deep breath. Inhale... Exhale... 🌿"
    "Go for a quick walk. Fresh air helps! 🌳"
    "Adjust your posture. Sit up straight! 🪑"
    "Blink often! Keep your eyes fresh. 👁️"
    "Listen to a song you love. Music heals. 🎶"
    "Step outside for a few minutes. ☀️"
    "Too much screen time? Close your eyes for 30 seconds. 😌"
)

# Set the correct absolute path for the owl icon
owl_icon="/home/kanika/harrypotter/owl_icon.png"

# Interval in minutes
interval=30

while true; do
    # Pick a random message
    msg=${messages[$RANDOM % ${#messages[@]}]}

    # Show notification with owl icon
    notify-send "🦉 Mental Health Reminder" "$msg" --icon="$owl_icon"

    # Debugging: Check if notify-send worked
    if [ $? -ne 0 ]; then
        echo "Error: Notification failed. Check if $owl_icon exists and is in PNG format."
    fi

    # Ask if user wants more info
    zenity --question --text="Would you like a short guided relaxation?" --title="Relaxation Break" --ok-label="Yes" --cancel-label="No"
    
    if [ $? -eq 0 ]; then
        ./moreinfo.sh
    fi

    # Wait before showing the next reminder
    sleep ${interval}m
done
