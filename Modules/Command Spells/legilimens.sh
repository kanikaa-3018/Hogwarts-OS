#!/bin/bash
API_KEY="$OPENAI_API_KEY"

# Load API Key from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "Error: .env file not found!"
    exit 1
fi

# Check if API Key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY is not set in .env file!"
    exit 1
fi

# Open a new GNOME terminal and execute the API call
gnome-terminal -- bash -c "
curl -X POST 'https://api.openai.com/v1/completions' \
-H 'Authorization: Bearer $OPENAI_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  \"model\": \"gpt-3.5-turbo\",
  \"messages\": [{\"role\": \"user\", \"content\": \"What is Protego?\"}]
}';
bash"

# Notify user
echo 'API request sent.'


