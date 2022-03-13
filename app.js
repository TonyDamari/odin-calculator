const resultDisplay = document.getElementById('results')
const inputDisplay = document.getElementById('input')
const numBtns = document.querySelectorAll('.number')
const opBtns = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const clear = document.getElementById('clear')
const deleteEl = document.getElementById('delete') 
const errMessage = document.querySelector('.dec')

let display1 = ''
let display2 = ''
let result = null
let lastOp = ''
let haveDot = false

numBtns.forEach(number => {
    number.addEventListener('click', (e) =>{
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true
        }else if(e.target.innerText === '.' && haveDot){
            return
        }
        display2 += e.target.innerText
        inputDisplay.innerText = display2
    })
})

opBtns.forEach(operation => {
    operation.addEventListener('click', (e) =>{
        if(!display2){
            errMessage.innerText = `Can't do operation without a number`
            errMessage.style.background = `red`
            return
        }
        errMessage.innerText = `calculator`
        errMessage.style.background = `#fff`

        haveDot = false
        const operationType = e.target.innerText

        if(display1 && display2 && lastOp){
            mathOperation()
        }else{
            result = parseFloat(display2)
        }

        clearVar(operationType)
        lastOp = operationType
        
    })
})

function clearVar(name = ''){
    display1 += display2 + ' ' + name + ' '
    resultDisplay.innerText = display1
    inputDisplay.innerText = ''
    display2 = ''
}

function mathOperation(){
    if(lastOp === 'x'){
        result = parseFloat(result) * parseFloat(display2)
        
    }else if(lastOp === '+'){
        result = parseFloat(result) + parseFloat(display2)
    }else if(lastOp === '-'){
        result = parseFloat(result) - parseFloat(display2)
    }else if(lastOp === '\u00F7'){
        if(display2 === '0'){
            errMessage.innerText = `Cannot divide by zero`
            errMessage.style.background = `red`
            result = `error`
            return
                        
        }else{
            
            result = parseFloat(result) / parseFloat(display2)
           
        }
       
    }else if(lastOp === '%'){
        result = parseFloat(result) % parseFloat(display2)
    }
    errMessage.innerText = `calculator`
    errMessage.style.background = `#fff`

}

equal.addEventListener('click', (e) =>{
    if(!display1 || !display2){
       return
    }
    
    haveDot = false
    mathOperation()
    clearVar()
    inputDisplay.innerText = result
    display2 = result
    display1 = ''
})

clear.addEventListener('click', (e) =>{
    resultDisplay.innerText = '0'
    inputDisplay.innerText = '0'
    display1 = ''
    display2 = ''
    result = ''
})

deleteEl.addEventListener('click', (e) => {
    display2 = display2.slice(0, -1)
    inputDisplay.innerText = display2
})

window.addEventListener('keydown', (e) =>{
    if(
        e.key === '0'||
        e.key === '1'||
        e.key === '2'||
        e.key === '3'||
        e.key === '4'||
        e.key === '5'||
        e.key === '6'||
        e.key === '7'||
        e.key === '8'||
        e.key === '9'||
        e.key === '.'
    ){
        clickBtn(e.key)
    }else if(
        
        e.key === '+'||
        e.key === '-'||
        e.key === '%'
    ){
        clickOperation(e.key)
    }else if(e.key = e.key === '*'){
        clickOperation('x')
    }else if(e.key = e.key === '/'){
        clickOperation('\u00F7')
    }else if(e.key == 'Enter' || e.key === '='){
        clickEqual()
    }
})

function clickBtn(key){
    numBtns.forEach(button => {
        if(button.innerText === key){
            button.click()
        }
    })
}

function clickOperation(key){
    opBtns.forEach(button => {
        if(button.innerText === key){
            button.click()
        }
    })
}

function clickEqual(){
    equal.click()
}

