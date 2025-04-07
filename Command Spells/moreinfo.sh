#!/bin/bash

# Define mental health improvement tips
tips=(
    "1. Practice mindfulness 🧘"
    "2. Get enough sleep 😴"
    "3. Exercise regularly 🏃"
    "4. Connect with loved ones ❤️"
    "5. Take breaks from screens 📵"
    "6. Journal your thoughts 📖"
    "7. Drink water and eat well 🍎"
    "8. Seek professional help if needed 👩‍⚕️"
)

# Format tips for display
tip_text=$(printf "%s\n" "${tips[@]}")

# Display tips using Zenity
zenity --info --title="Mental Well-being Tips" --text="$tip_text" --width=400
