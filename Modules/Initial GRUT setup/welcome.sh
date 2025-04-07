#!/bin/bash

# Newspaper-Style Welcome Message
clear
figlet "Welcome to Hogwarts OS"
echo "----------------------------------------------------"
echo "This is your magical Linux experience."
echo "Use spells (commands) to perform actions."
echo "Type 'accio_help' to view available spells." | cowsay
echo "Type 'exit' to leave the wizarding world."
echo "----------------------------------------------------"

# Text-to-Speech (Voice Narration)
espeak "Welcome to Hogwarts OS. Your magical Linux experience begins now."

# Run Python script to invoke AI Agent for an introduction
python3 ~/harrypotter/server.py
#python3 ~/harrypotter/welcome_agent.py
