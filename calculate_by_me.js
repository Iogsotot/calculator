class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
        this.readyToReset = false
    }
    
    allClear() {
        this.currentOperand = '0'
        this.prevOperand = ''
        this.operation = undefined;
        this.prevOperandTextElement.innerText = ''
        this.currentOperandTextElement.innerText = '0'
    }

    clear() {
        this.currentOperand = '0'
        this.operation = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    plusMinusToggle() {
        this.currentOperand *= -1
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (number === '.' && this.currentOperand == '') this.currentOperand = '0.'
        else this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    error() {
        this.currentOperandTextElement.innerText = "ERROR"
        // may be some more error handling
    }

    sqrtCompute() {
        let computation
        let prev = parseFloat(this.prevOperand)
        let result
        if (this.operation === '√x') {
            if (Math.sign(prev) > 0) {
                result = (Math.sqrt(prev)).toFixed(2)
                computation = result * 1
            } else {
                this.error()
            }
        }
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
                result = (prev + current).toFixed(2)
                computation = result * 1
                break
            case '-':
                result = (prev - current).toFixed(2)
                computation = result * 1
                break
            case '*':
                result = (prev * current).toFixed(2)
                computation = result * 1
                break
            case '÷':
                result = (prev / current).toFixed(2)
                computation = result * 1
                break              
            case 'xy':
                result = (prev ** current).toFixed(2)
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
        const integerDigits = parseFloat(stringNumber.split('.')[0])
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
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            if (this.operation === 'xy') {
                console.log('^')
                this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ^ `
            } 
            if (this.operation === '√x') {
                this.prevOperandTextElement.innerText = `√${this.getDisplayNumber(this.prevOperand)}`
                this.currentOperandTextElement.innerText = `${this.getDisplayNumber(this.computation)}`
            }
            else if (this.operation === '+' || this.operation === '-' || this.operation === '÷' || this.operation === '*' ) {
                console.log('else')
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
    calculator.updateDisplay()
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