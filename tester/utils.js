// Missing input validation (BUG)
function divide(a, b) {
    return a / b;  // What if b is 0?
}

// Mutating array directly (CODE QUALITY)
function addItem(arr, item) {
    arr.push(item);  // Mutates original array
    return arr;
}

// Complex nested conditions (CODE QUALITY)
function checkStatus(user) {
    if (user) {
        if (user.isActive) {
            if (user.hasPermission) {
                if (user.role === 'admin') {
                    return true;
                }
            }
        }
    }
    return false;
}

// Magic numbers (CODE QUALITY)
function calculatePrice(quantity) {
    return quantity * 29.99;  // What is 29.99?
}

// Promise not handled (BUG)
function loadData() {
    fetch('/api/data')
        .then(res => res.json());
    // No error handling!
}