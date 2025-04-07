#!/bin/bash
joke=$(curl -s https://official-joke-api.appspot.com/random_joke | jq -r '.setup + " - " + .punchline')
echo "Fetched Joke: $joke"  # Debugging step
notify-send "🤡 Riddikulus!" "$joke"
