class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // this.readyToReset = false
        this.allClear()
        this.updateDisplay()
    }
    
    allClear() {
        this.currentOperand = '0'
        this.prevOperand = ''
        this.operation = undefined;
        this.prevOperandTextElement.innerText = ''
        this.currentOperandTextElement.innerText = '0'
        this.reset = true
        this.readyToReset = false
    }

    clear() {
        this.currentOperand = '0'
        this.operation = undefined
        // this.reset = true;
    }

    equalEvent() {
        // this.currentOperand = '0'
        this.currentOperand = '0'
        this.prevOperand = ''
        this.operation = undefined
        this.reset = true;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    plusMinusToggle() {
        this.currentOperand *= -1
    }

    errorBig() {
        this.currentOperandTextElement.innerText = 'ERROR: too big number';
        setTimeout(this.allClear, 1000);
        // this.allClear()
    }

    appendNumber(number) {
        // if (this.currentOperand.length > 15) {
        //     this.errorBig()
        //     return
        // } else {
            if (number === '.' && this.currentOperand.includes('.')) return
            if (number === '.' && this.currentOperand == '') this.currentOperand = '0.'
            else this.currentOperand = this.currentOperand.toString() + number.toString()
        // }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        // if (this.prevOperand !== '') {
        if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    error() {
        this.currentOperandTextElement.innerText = 'ERROR'
        // this.allClear()
        // may be some more error handling
    }


    sqrtCompute() {
        let computation
        let prev = parseFloat(this.prevOperand)
        let result
        if (this.operation === '√x') {
            if (Math.sign(prev) > 0) {
                result = (Math.sqrt(prev)).toFixed(9)
                computation = result * 1
            } else this.error()
        }
        this.computation = computation
        this.currentOperand = computation
        this.readyToReset = true
    }

    compute() {
        let computation
        let prev = parseFloat(this.prevOperand)
        let current = parseFloat(this.currentOperand)
        let result

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = (prev + current).toFixed(9)
                computation = result * 1
                break
            case '-':
                result = (prev - current).toFixed(9)
                computation = result * 1
                break
            case '*':
                result = (prev * current).toFixed(9)
                computation = result * 1
                break
            case '÷':
                result = (prev / current).toFixed(9)
                computation = result * 1
                break              
            case 'xy':
                result = (prev ** current).toFixed(9)
                computation = result * 1
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
        this.readyToReset = true
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseInt(stringNumber.split('.')[0])
        // const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString()
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        console.log(this.operation)
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            if (this.operation === 'xy') {
                this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ^ `
            }
            if (this.operation === '√x') {
                this.prevOperandTextElement.innerText = `√${this.getDisplayNumber(this.prevOperand)}`
            }
            else if (this.operation === '+' || this.operation === '-' || this.operation === '÷' || this.operation === '*') {
                this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
            }
        } else {
            this.prevOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll(".operation")
const equalButton = document.querySelector(".equal-sign")
const deleteButton = document.querySelector(".delete")
const allClearButton = document.querySelector(".all-clear")
const clearButton = document.querySelector(".current-clear")
const plusMinusButton = document.querySelector(".plus-minus-change")
const sqrtButton = document.querySelector(".sqrt")

let resultBlock = document.querySelector(".result")
const prevOperandTextElement = document.querySelector(".previous-operand")
const currentOperandTextElement = document.querySelector(".current-operand")

const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.reset = false
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.reset = true;
    calculator.updateDisplay()
    calculator.equalEvent()
    // calculator.clear()
})

sqrtButton.addEventListener('click', () => {
    calculator.sqrtCompute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

plusMinusButton.addEventListener('click', () => {
    calculator.plusMinusToggle()
    calculator.updateDisplay()
})