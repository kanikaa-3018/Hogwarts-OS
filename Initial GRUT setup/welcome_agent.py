import requests
import pyttsx3

# Agent.ai API Configuration
API_URL = "https://api-lr.agent.ai/v1/action/invoke_agent"
HEADERS = {
    'Authorization': 'Bearer vVEya1qeDZo9QiTtd4GPTSJzHQBH9DY0hGZzQs0ge5bVz60dxJzQE40aXfcWcwGh',
    'Content-Type': 'application/json'
}
DATA = {
    "id": "deepseek-r1",
    "user_input": "Introduce Hogwarts OS to the user."
}

# Function to get AI response
def invoke_agent():
    try:
        response = requests.post(API_URL, json=DATA, headers=HEADERS)
        response.raise_for_status()
        result = response.json()
        return result.get("response", "Welcome to Hogwarts OS. Type accio_help to get started.")
    except requests.exceptions.RequestException as e:
        return f"Error connecting to AI agent: {e}"

# Function to narrate response
def speak_text(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

# Main Execution
if __name__ == "__main__":
    agent_response = invoke_agent()
    
    # Display AI response in a formatted way
    print("\n--------------------------------------")
    print("🔮 Hogwarts OS AI Assistant Says:")
    print("--------------------------------------")
    print(agent_response)
    print("--------------------------------------\n")
    
    # Speak the response
    speak_text(agent_response)


   # print("\n🪄 Enter your spells below:\n")
    #subprocess.run(["python3", "server.py"])
