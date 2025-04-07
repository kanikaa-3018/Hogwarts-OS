import requests
import os
import subprocess
import sys
import random
import pygame  # Import pygame for audio

# Initialize pygame mixer
pygame.mixer.init()

# Path to the Harry Potter theme music (ensure it's in the same directory or provide a full path)
MUSIC_FILE = os.path.join(os.path.dirname(__file__), "harrypotter_theme.mp3")

def play_music():
    """Play the Harry Potter theme song in a loop."""
    if not pygame.mixer.music.get_busy():  # Only play if not already playing
        pygame.mixer.music.load(MUSIC_FILE)
        pygame.mixer.music.play(-1)  # -1 means loop indefinitely

def stop_music():
    """Stop the music."""
    pygame.mixer.music.stop()

# Function to invoke the Agent.ai API (if required)
def invoke_agent(spell):
    api_url = "https://api-lr.agent.ai/v1/action/invoke_agent"
    headers = {
        'Authorization': 'Bearer vVEya1qeDZo9QiTtd4GPTSJzHQBH9DY0hGZzQs0ge5bVz60dxJzQE40aXfcWcwGh',
        'Content-Type': 'application/json'
    }
    data = {"id": "deepseek-r1", "user_input": spell}

    try:
        response = requests.post(api_url, json=data, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Error invoking the agent: {e}")
        return None

# Mapping spells to their respective scripts
SPELL_SCRIPTS = {
    "lumos": "~/harrypotter/lumos.sh",
    "nox": "~/harrypotter/nox.sh",
    "alohomora": "~/harrypotter/alohomora.sh",
    "aberto": "~/harrypotter/aberto.sh",
    "apparate": "~/harrypotter/apparate.sh",
    "disapparate": "~/harrypotter/disapparate.sh",
    "expecto_patronum": "node ~/harrypotter/patronus.js",
    "muffliato": "~/harrypotter/muffliato.sh",
    "obscuro": "~/harrypotter/obscuro.sh",
    "protego": "~/harrypotter/protego.sh",
    "legilimens": "~/harrypotter/legilimens.sh",
    "riddikulus": "~/harrypotter/riddikulus.sh",
}
RANDOM_LOCATIONS = [
    "~/Downloads", "~/Documents", "~/Desktop", "~/Pictures",
    "/tmp", "/var/log", "/etc", "/usr/local", "/home"
]

def execute_spell(spell):
    spell = spell.lower()

    play_music()  # Start music when a spell is cast

    if spell == "apparate":
        new_location = os.path.expanduser(random.choice(RANDOM_LOCATIONS))
        if os.path.exists(new_location):  # Ensure the directory exists
            os.chdir(new_location)
            print(f"🌀 You have Apparated to {os.getcwd()}!")
        else:
            print(f"⚠️ Apparition failed! The location {new_location} doesn't exist.")
    
    elif spell == "disapparate":
        home_dir = os.path.expanduser("~")  # Teleport back to home directory
        os.chdir(home_dir)
        print(f"🚀 You have Disapparated back to {home_dir}!")
    
    elif spell in SPELL_SCRIPTS:
        script = os.path.expanduser(SPELL_SCRIPTS[spell])
        if not os.path.exists(script.split()[-1]):
            print(f"⚠️ The script for {spell} is missing! Check your setup.")
            return
        print(f"✨ Casting spell: {spell}...")

        try:
            if script.startswith("node"):
                subprocess.run(script.split(), check=True)
            else:
                subprocess.run(["bash", script], check=True)
        except subprocess.CalledProcessError as e:
            print(f"❌ Error executing {spell}: {e}")
        except Exception as e:
            print(f"⚠️ Unexpected error while casting {spell}: {e}")
    
    else:
        print(f"❌ Spell '{spell}' not recognized. Type 'accio_help' for available spells.")

def display_help():
    print("\n🔮 Available Spells:")
    spells = [
        "lumos - Turns on Light Mode 💡",
        "nox - Turns off Light Mode 🌙",
        "alohomora - Opens a locked session 🔓",
        "aberto - Opens locked folders 📂",
        "apparate - Teleports to a random location 🌀",
        "disapparate - Teleports back 🚀",
        "expecto_patronum - Summons a Patronus ✨",
        "muffliato - Prevents others from hearing 🔇",
        "obscuro - Blinds opponent 🕶️",
        "protego - Casts a shield charm 🛡️",
        "legilimens - Reads opponent’s mind 🧠",
        "riddikulus - Defeats a Boggart with humor 🤡",
        "accio_help - Shows this help menu 📜",
        "exit - Leaves Hogwarts OS 🚪"
    ]
    for spell in spells:
        print(f"✨ {spell}")
    print("")

def main():
    while True:
        try:
            spell = input("🔮 Enter a spell: ").strip().lower()

            if spell == "exit":
                print("🪄 Exiting Hogwarts OS...")
                stop_music()  # Stop music when exiting
                break
            elif spell == "accio_help":
                display_help()
                stop_music()  # Stop music when showing help
            else:
                execute_spell(spell)
        except EOFError:
            print("\n⚠️ Input interrupted. Exiting safely...")
            stop_music()
            break
        except KeyboardInterrupt:
            print("\n🚪 Exiting the wizarding world. See you next time!")
            stop_music()
            sys.exit(0)

if __name__ == "__main__":
    harrypotter_folder = os.path.expanduser("~/harrypotter")
    spell_scripts = [
        "lumos.sh", "nox.sh", "alohomora.sh", "patronus.js", "aberto.sh",
        "apparate.sh", "disapparate.sh", "muffliato.sh", "obscuro.sh",
        "protego.sh", "legilimens.sh", "riddikulus.sh"
    ]

    for script in spell_scripts:
        script_path = os.path.join(harrypotter_folder, script)

        # Ensure shell scripts are executable
        if script.endswith(".sh"):
            if os.path.exists(script_path) and not os.access(script_path, os.X_OK):
                os.chmod(script_path, 0o755)

        # Ensure JavaScript files are executed with node
        elif script.endswith(".js"):
            if os.path.exists(script_path):
                subprocess.run(["node", script_path], check=True)

    print("🧙‍♂️ Welcome to Hogwarts OS! Type 'accio_help' for available spells.")
    main()
