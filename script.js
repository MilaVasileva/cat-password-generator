// --- Cat Names Covering A-Z ---
const catNames = [ 
"Ziggy", "Whisker", "Pumpkin", "Jinx", "Felix", "Oscar", "Queenie", 
"Milo", "Xander", "Bella", "Clover", "Harley", "Nova", "Rufus", 
"Yoshi", "Karma", "Dusty", "Amber", "Shadow", "Piper"
];

const symbols = "!@#$%^&*()_+{}[]<>?";

// --- Generators ---
function randomLetters(count) { 
const name = catNames[Math.floor(Math.random() * catNames.length)]; 
const shuffled = name.split("").sort(() => Math.random() - 0.5); 
return shuffled.slice(0, count).join("");
}

function randomDigits(count) { 
let out = ""; 
for (let i = 0; i < count; i++) { 
out += Math.floor(Math.random() * 10); 
} 
return out;
}

function randomSymbols(count) { 
let out = ""; 
for (let i = 0; i < count; i++) { 
out += symbols[Math.floor(Math.random() * symbols.length)]; 
} 
return out;
}

// --- Main function ---
function generatePassword(style, length) { 
let lettersCount, digitsCount, symbolsCount; 

switch ( style ) { 
case "soft": 
lettersCount = Math.floor(length * 0.6); 
digitsCount = Math.floor(length * 0.3); 
symbolsCount = length - lettersCount - digitsCount; 
break 

case "normal": 
lettersCount = Math.floor(length * 0.4); 
digitsCount = Math.floor(length * 0.3); 
symbolsCount = length - lettersCount - digitsCount; 
break 

case "chaos": 
lettersCount = Math.floor(length * 0.2); 
digitsCount = Math.floor(length * 0.3); 
symbolsCount = length - lettersCount - digitsCount; 
break 
} 

const combined = 
randomLetters(lettersCount) + 
randomDigits(digitsCount) + 
randomSymbols(symbolsCount); 

return combined.split("").sort(() => Math.random() - 0.5).join("");
}

// --- DOM elements ---
const video = document.getElementById("catVideo");
const toggleBtn = document.getElementById("toggleBtn");
const copyBtn = document.getElementById("copyBtn");
const result = document.getElementById("result");

let running = false;

// --- Generate ---
toggleBtn.addEventListener("click", () => { 
if (!running) { 
running = true; 
toggleBtn.textContent = "Stop"; 
video.play(); 
result.textContent = ""; 
} else { 
running = false; 
toggleBtn.textContent = "Generate"; 
video.pause(); 

const length = Number(document.getElementById("lengthInput").value); 
const style = document.getElementById("styleSelect").value; 

const password = generatePassword(style, length); 
result.textContent = password; 
}
});

// --- Copy ---
copyBtn.addEventListener("click", () => { 
if (!result.textContent.trim()) return; 

navigator.clipboard.writeText(result.textContent); 
copyBtn.textContent = "Copied!"; 
setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});