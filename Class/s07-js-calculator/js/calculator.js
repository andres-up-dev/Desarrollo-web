 // ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
const add = (a, b) => a + b;

// TODO: Write "subtract" callback expression (a, b) => ...
const subtract = (a, b) => a - b;

// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a, b) => a * b;

// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
const divide = (a, b) => {
    if (b != 0) {
        return a / b;
    } else {
        alert("no se puede dividir entre 0 carnal");
        return null;
    }
}

// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)

function calculator(numA, numB, callback) {
    if (typeof numA !== 'number' || typeof numB !== 'number') {
        throw new Error('Entradas invalidas');
    }
    if (typeof callback !== 'function') {
        throw new Error('Callback invalido, tiene que ser una funcion');
    }
    return callback(numA, numB);
}

// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    // TODO: Extract values from the inputs and parse them as floats.
    var numA = parseFloat(num1Input.value);
    var numB = parseFloat(num2Input.value);
    // TODO: Retrieve the selected operation string value.
    var operation = operationSelect.value;
    // TODO: Match the selected operation string to its corresponding function reference.
    function matchOps() {
        if (operation === "add") {
            return add(numA, numB);
        } else if (operation === "subtract") {
            return subtract(numA, numB);
        } else if (operation === "multiply") {
            return multiply(numA, numB);
        } else if (operation === "divide") {
            return divide(numA, numB);
        }
    }
    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
    var result= calculator(numA, numB, matchOps);
    // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
    resultStatus.textContent = result;
    return 0;
});

