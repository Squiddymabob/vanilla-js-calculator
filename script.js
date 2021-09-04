class Caclulator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  /**
   * Clear the calculator's display and selected operation
   *
   * @memberof Caclulator
   */
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  /**
   * Remove the last value from the currentOperand string
   *
   * @memberof Caclulator
   */
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  /**
   * Append the selected number (or '.') to the string to display
   * Only allow one '.' in the string
   *
   * @param {String} number
   * @return {String} - The updated value to display
   * @memberof Caclulator
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    this.currentOperand = `${this.currentOperand}${number}`;
  }

  /**
   * Set the selected operation as the current operation
   * Set the current operand as the previous operand
   *
   * @param {String} operation
   * @memberof Caclulator
   */
  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return;
    }
    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  /**
   * Compute the result determined by the currently selected operation
   *
   * @memberof Caclulator
   */
  compute() {
    let result;
    const previousResult = parseFloat(this.previousOperand);
    const currentResult = parseFloat(this.currentOperand);

    if (Number.isNaN(previousResult) || Number.isNaN(currentResult)) {
      return;
    }

    switch (this.operation) {
      case '+':
        result = previousResult + currentResult;
        break;
      case '-':
        result = previousResult - currentResult;
        break;
      case '*':
        result = previousResult * currentResult;
        break;
      case '/':
        result = previousResult / currentResult;
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }

  /**
   * Update the calculator's display to show the current result
   *
   * @memberof Caclulator
   */
  update() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Caclulator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.update();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.update();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.update();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.update();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.update();
});
