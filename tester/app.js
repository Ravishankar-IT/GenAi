// Hardcoded API key (SECURITY ISSUE)
const API_KEY = "sk_live_12345abcdef67890";

// Missing null check (BUG)
function getUserName(user) {
    return user.name.toUpperCase();
}

// Console.log in production (CODE QUALITY)
console.log("App started");

// eval() usage (SECURITY ISSUE)
function runCode(code) {
    eval(code);
}

// Missing error handling (BUG)
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}

// Unused variable (CODE QUALITY)
const unusedVar = "I'm never used";

// Missing return statement (BUG)
function calculateTotal(a, b) {
    const sum = a + b;
    // Oops, forgot to return!
}

// innerHTML with user input (XSS VULNERABILITY)
function displayMessage(userInput) {
    document.getElementById('message').innerHTML = userInput;
}

// Type coercion issue (BUG)
function compare(a, b) {
    if (a == b) {  // Should use ===
        return true;
    }
    return false;
}

// Async without await (BUG)
async function getData() {
    fetchData();  // Not awaited!
    console.log("Done");
}

// Math.random for security (SECURITY ISSUE)
function generateToken() {
    return Math.random().toString(36);
}