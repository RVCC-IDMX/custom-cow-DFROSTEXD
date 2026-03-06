// fortune.js - Custom Cow starter
// Based on HAP's Fortunate Cow — you'll refactor this to use JSON objects

import * as cowsay from "cowsay";
import fortunes from "./fortunes.json" with { type: "json" };

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

// Pick a random fortune
const randomIndex = Math.floor(Math.random() * fortunes.length);
const todaysFortune = fortunes[randomIndex];

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
