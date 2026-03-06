// fortune.js - Custom Cow starter
// Based on HAP's Fortunate Cow — you'll refactor this to use JSON objects

import * as cowsay from "cowsay";
import fortunes from "./fortunes.json" with { type: "json" };

// TEMPORARY DEBUG - remove later
console.log("Arguments received:", process.argv);
console.log("Sliced args:", process.argv.slice(2));

// Get command-line arguments (everything after 'npm start')
const args = process.argv.slice(2);
const userCategory = args[0]; // First argument is the category filter

// Handle --list flag
if (userCategory === "--list") {
  console.log("Available categories:");
  const categories = [...new Set(fortunes.map(f => f.category))];
  categories.forEach(cat => console.log(`  - ${cat}`));
  process.exit(0); // Exit after showing the list
}

// Handle --count flag
if (userCategory === "--count") {
  console.log("Fortune counts by category:");
  const counts = {};
  fortunes.forEach(f => {
    counts[f.category] = (counts[f.category] || 0) + 1;
  });
  let total = 0;
  for (const [category, count] of Object.entries(counts)) {
    console.log(`  ${category}: ${count}`);
    total += count;
  }
  console.log(`  Total: ${total}`);
  process.exit(0);
}

// Get the current hour (0-23)
// HAP learned that getHours() uses 24-hour time, not 12-hour!
const hour = new Date().getHours();

// Choose greeting based on time of day
let greeting;
if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

// Filter fortunes by category if provided
let availableFortunes = fortunes;
if (userCategory) {
  availableFortunes = fortunes.filter(f => f.category === userCategory);
  
  // Handle no matches
  if (availableFortunes.length === 0) {
    console.log(`No fortunes found for category "${userCategory}".`);
    const categories = [...new Set(fortunes.map(f => f.category))];
    console.log("Available categories:", categories.join(", "));
    process.exit(1);
  }
}

// Pick a random fortune from available ones
const randomIndex = Math.floor(Math.random() * availableFortunes.length);
const todaysFortune = availableFortunes[randomIndex];

// Combine greeting and fortune
const fullMessage = `${greeting}! ${todaysFortune.text}`;

// Choose cow based on category
let cowCharacter;
if (todaysFortune.category === "rock") {
  cowCharacter = "dragon";
} else if (todaysFortune.category === "pop") {
  cowCharacter = "bunny";
} else if (todaysFortune.category === "r&b") {
  cowCharacter = "elephant";
} else {
  cowCharacter = "tux"; // default for country, indie, other
}

// Display the chosen cow character
const output = cowsay.say({ text: fullMessage, f: cowCharacter });
console.log(output);
