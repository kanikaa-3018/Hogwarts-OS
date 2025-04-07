#!/usr/bin/env node

const readline = require("readline");
const { exec } = require("child_process");

const patronuses = {
  1: { name: "Stag 🦌", ascii: "elephant" }, // Closest match
  2: { name: "Otter 🦦", ascii: "tux" },
  3: { name: "Phoenix 🔥", ascii: "dragon" }, // No phoenix, using dragon
  4: { name: "Hare 🐇", ascii: "bunny" },
  5: { name: "Wolf 🐺", ascii: "meow" }, // No wolf, using cat
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("✨ Choose your Patronus! ✨");
console.log("1) Stag 🦌");
console.log("2) Otter 🦦");
console.log("3) Phoenix 🔥");
console.log("4) Hare 🐇");
console.log("5) Wolf 🐺");
console.log("----------------------------------");

rl.question("Enter the number of your Patronus: ", (choice) => {
  if (!patronuses[choice]) {
    console.log("🚨 Invalid choice! The Dementors attack! ☠️");
    rl.close();
    process.exit(1);
  }

  const { name, ascii } = patronuses[choice];

  console.clear();
  console.log("EXPECTO PATRONUM! 🪄");

  // Speak spell (Linux: espeak, macOS: say)
  const speechCommand = process.platform === "linux"
    ? `espeak -v en+f3 -s 100 -p 40 "Expecto Patronum! Your Patronus, the ${name}, has appeared!" &`
    : `say "Expecto Patronum! Your Patronus, the ${name}, has appeared!"`;

  exec(speechCommand, (err) => {
    if (err) console.error("Speech error:", err);
  });

  // Show ASCII animal
  exec(`cowsay -f ${ascii} "Your Patronus, the ${name}, has appeared!" | lolcat`, (error, stdout) => {
    if (error) {
      console.error("ASCII Error:", error);
    } else {
      console.log(stdout);
    }
  });

  rl.close();
});

// Stop speech on exit (Ctrl+C)
process.on("SIGINT", () => {
  console.log("\nStopping Patronus spell...");
  exec("pkill espeak", () => process.exit(0));
});
