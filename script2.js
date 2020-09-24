class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement 
        this.allClear()
    }

    allClear() {
        this.currentOperand = ''
        this.prevOperand = ''
        this.prevOperandTextElement.innerText = ''
        this.operation = undefined

    }

    clear() {
        this.currentOperand = ''
        this.operation = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
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

    compute() {
        let computation
        let prev = parseFloat(this.prevOperand)
        let current = parseFloat(this.currentOperand)
        // if (!isNaN(prev) && this.operation === '√x') {
        //     computation = Math.sqrt(prev)
        //     console.log("у меня тут корень..")
        //     return
        // }
        if (isNaN(prev) || isNaN(current)) return
        // if (this.operation === '√x') {
        //     console.log('prev')
        // }
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '√x':
                computation = Math.sqrt(current)
                console.log('корень из ' + current + ' = ' + Math.sqrt(current))
                // calculator.updateDisplay()
                break 
            case '÷':
                computation = prev / current
                break
            case 'xy':
                computation = prev ** current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        // this.prevOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        // const decimalDigits = parseFloat(stringNumber.split('.')[1])
        // const floatNumber = parseFloat(number)
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString()
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
                this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ^ `
            } 
            if (this.operation === '√x') {
                this.prevOperandTextElement.innerText = `√${this.getDisplayNumber(this.prevOperand)} `
            }
            else {
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

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.allClear()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})