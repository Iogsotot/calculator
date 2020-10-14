class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.readyToReset = false
        this.allClear()
        // this.updateDisplay()
    }
    
    allClear() {
        this.currentOperand = '0'
        this.prevOperand = ''
        this.operation = undefined;
        this.prevOperandTextElement.innerText = ''
        this.currentOperandTextElement.innerText = '0'
        this.readyToReset = false
    }

    clear() {
        this.currentOperand = '0'
        this.readyToReset = false
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    plusMinusToggle() {
        this.currentOperand *= -1
    }

    appendNumber(number) {
        if (this.currentOperand.length > 14) {
            return
        } else {
            if (number === '.' && this.currentOperand.includes('.')) return
            if (number === '.' && this.currentOperand == '') this.currentOperand = '0.'
            else this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    error() {
        this.currentOperandTextElement.innerText = 'ERROR'
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
        this.readyToReset = true
        this.computation = computation
        this.currentOperand = computation
    }

    compute() {
        let computation
        let prev = parseFloat(this.prevOperand)
        let current = parseFloat(this.currentOperand)
        let result

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = (prev + current).toFixed(12)
                computation = result * 1
                break
            case '-':
                result = (prev - current).toFixed(12)
                computation = result * 1
                break
            case '*':
                result = (prev * current).toFixed(12)
                computation = result * 1
                break
            case '÷':
                result = (prev / current).toFixed(12)
                computation = result * 1
                break              
            case 'xy':
                result = (prev ** current).toFixed(12)
                computation = result * 1
                console.log(result)
                console.log(computation)
                break
            default:
                return
        }
        this.readyToReset = true
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseInt(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay
        
        if (isNaN(integerDigits)) {
            if (!isFinite(integerDigits) && number != "") {
                integerDisplay = 'Это слишком даже для меня'
            } else {
                integerDisplay = ''
            }
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
        // console.log("calculator.previousOperand:" + calculator.previousOperand)
        // console.log("calculator.currentOperand:" + calculator.currentOperand)
        // console.log("calculator.readyToReset:" + calculator.readyToReset)
        if (calculator.currentOperand !== '' && calculator.readyToReset) {
            // console.log('мы тут')
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
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


window.addEventListener('keydown', logKey) 

function logKey(e) {
    console.log(e.key)
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        calculator.chooseOperation(e.key)
        calculator.updateDisplay()
    } 
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute()
        calculator.updateDisplay()
    }
    else if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
}

