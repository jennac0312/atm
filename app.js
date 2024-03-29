//keypad numbers
const keys = document.querySelectorAll('.keypadContainer button')
console.log(keys)
const cancelKey = document.querySelector('.cancel')
const enterKey = document.querySelector('.enter')

//main screen
const msContainer = document.querySelector('.mainScreenContainer')
const msCode = document.querySelector('.msCode')
const msEnter = document.querySelector('.msEnter')
const msCancel = document.querySelector('.msCancel')

// second screen
const ssContainer = document.querySelector('.secondScreenContainer')
const userName = document.querySelector('.userName')
const ssStarter = document.querySelector('.ssStarter')
const ssBalance = document.querySelector('.currentBalance')
const ssBalanceDisplay = document.querySelector('.balanceDisplay')
const depositPrompt = document.querySelector('.depositPrompt')
const withdrawalPrompt = document.querySelector('.withdrawalPrompt')
const ssNumberContainer = document.querySelector('.numberContainer')
console.log(ssNumberContainer)
//ss buttons
const checkBalanceButton = document.querySelector('.balance')
const depositButton = document.querySelector('.deposit')
const withdrawalButton = document.querySelector('.withdrawal')
// all ss buttuons
const ssButtons = document.querySelectorAll('.optionsContainer button')
console.log(ssButtons)
// card dom variables
const pCardName = document.querySelector('.cardName')
console.log(pCardName)
const pCardNumber = document.querySelector('.cardNumber') 
console.log(pCardNumber)
const pCvcNumber = document.querySelector('.cvcNumber')
console.log(pCvcNumber)
const expDate = document.querySelector('.expNumber')


// to populate card
const numberList = []
const cardNumber = []
const cvc = []
const expirationDate = []

//check if deposit is clicked
let isSecondScreen = false
let isDeposit
let isWithdrawal

// prompt to get card name
let accountName = prompt('enter username')
console.log("USER : ",accountName)

// added logic that accounts for hitting cancel on prompt 
const checkAccountName = () => {
    if(accountName === "" || accountName === null){
        accountName = "MYSTERY PERSON"
    }
    else{
        accountName = accountName.toUpperCase()
    }
}
checkAccountName()

// setting username second sceeen
if(accountName === ""){
    userName.innerText = "MYSTERY PERSON"
} else{
    userName.innerText = accountName
}



// random starting balance from 1-1,000,000 (..almost)
let balance = Math.floor( Math.random() * 1000000)
console.log("current balance is:",balance)
// populate current balance
if(balance >= 0){
    ssBalance.innerHTML = `BALANCE: <span class="balanceDisplay green">$${balance}.00</span>`
} else if(balance < 0){
    ssBalance.innerHTML = `<span class="balanceDisplay red">$${balance}.00</span>`
}

// generate random number 1-9
const randomSingleNumber = () => {
    let number = Math.floor(Math.random() * 10)
    return number
}

//set card info
const setCard = () => {
    // set card Name
    if(accountName === ""){
        pCardName.innerText = "MYSTERY PERSON"
    } else{
        pCardName.innerText = accountName
    }

    // set exp date
    let date = new Date()
    console.log(date)
    let month = date.getMonth()
    console.log("month is: ",month)
    let year = date.getFullYear()
    console.log("year is:", year)
    let lastTwoYear = String(year).slice(-2)
    console.log(lastTwoYear)

    // lastTwoYear is a string so + shorthand Number() conversion :)
    let expiration = month + "/" + ( +lastTwoYear + randomSingleNumber())
    console.log("expiration date:", expiration)

    expDate.innerHTML = `<span class="vt">Valid Thru </span> ${expiration}`
}
// run on pageload
setCard()


// generate specific number of numbers []
const getNumbers = (num) => {
    // let numberList = []
    if(num === 16){
        for(let i = 1; i <= num; i++){
            numberList.push(randomSingleNumber())
        }
    } else if(num === 3) {
        for(let i = 1; i <= num; i++){
            cvc.push(randomSingleNumber())
        }
    } else if(num === 4){
        for(let i = 1; i <= num; i++){
            expirationDate.push(randomSingleNumber())
        }
    }
    
    console.log(numberList)
    console.log(cvc)
    console.log(expirationDate)
}

// getNumbers(16)


// want this to happen on page load
// add space after every 4 numbers (for card)
const separateCardNumbers = () => {
    // getNumbers(16)
    for(let i = 0; i < numberList.length; i++){
        if(i % 4 != 0){
            cardNumber.push(numberList[i])
        } else{
            cardNumber.push(' ')
            cardNumber.push(numberList[i])
        }
    }
    return cardNumber.join('')
}


//on page load
getNumbers(16)
getNumbers(3)
getNumbers(4)

// cardNumber = separateCardNumbers()

console.log("card number is:",separateCardNumbers())
pCardNumber.innerText = cardNumber.join('')
pCvcNumber.innerHTML = `<span class="cvc">CVC</span> ${cvc.join('')}`


// console.log(numberList.splice(12).join(''))
// pin number (last 4 digits of card) took me forever to get this.. apparenlty my console log modified original arrar
const code = numberList.splice(-4).join('')
console.log("pin code is:",code)


// pin number reminder
//  tyring to delay

alert(`Hey, ${accountName}! Remember, you set your pin to the last 4 digits of your card so you wouldn't forget! *psssssssst* it's ${code}`)



// populate screen with pin
const displayPin = (key) => {
    // msCode.innerText = ""
    console.log(key)
    msCode.innerText += key
} 


//display withdrawal/deposit amounts
const depositWithdrawal = (key) => {
    console.log(key)
    ssNumberContainer.innerText += key
    console.log(ssNumberContainer)
}


// set isDeposit boolean
depositButton.addEventListener('click', () => {
    if(depositPrompt.classList.value.includes('hidden')){
        isDeposit = false
        isWithdrawal = false
    } else {
        isDeposit = true
    }
    console.log("DEPOSIT EVENT LISTENER",isDeposit)
})


//set isWithdrawal boolean
withdrawalButton.addEventListener('click', () => {
    if(withdrawalPrompt.classList.value.includes('hidden')){
        isWithdrawal = false
        isDeposit = false
    } else{
        isWithdrawal = true
    }
    console.log("WITHDRAWAL EVENT LISTENER",isWithdrawal)
})

// grab number from each button
keys.forEach((key) => {
    key.addEventListener('click', () => {
        console.log(key)

        let keyNumber

        if(isDeposit || isWithdrawal){
            // check if symbol
            if(key.classList.value.includes('symbol')){
                //  handle symbols
                if(key.classList.value.includes('cancel')){
                    ssNumberContainer.innerText = ""
                } else if(key.classList.value.includes('enter')){
                    // do math
                    updateBalance()
                }
            } else {
                keyNumber = key.innerText
                depositWithdrawal(keyNumber)
            }

        } else if(!isSecondScreen){
            if(key.innerText === "✔"){
                verifyPin()
            }else{
                console.log("KEY IS:", key.innerHTML)
                keyNumber = key.innerText
                displayPin(keyNumber)
            }
        }

        // check to see if number key is clicked or x/check
        // if( key.classList.value.includes('symbol')){
        //     if(key.classList.value.includes('enter')){

        //         // do mathh
        //         updateBalance()

        //     }else if(key.classList.value.includes('cancel')){
        //         ssNumberContainer.innerText = ""
        //     }
        // // } else {
        // //     // let keyNumber = key.innerText
        // //     console.log("second screen is:",isSecondScreen)
    
        // //     //  DONT FORGET TO CHANGE !!!!!!!!!!!!!!!!1 AND HTML TOO
    
        // //     isSecondScreen = true
        // //     if(isSecondScreen){
        // //         if(isWithdrawal === true || isDeposit === true){
        // //             depositWithdrawal(keyNumber)
        // //         }
        // //     } else{
        // //         displayPin(keyNumber)
        // //     }
        // // }
        // // console.log("deposit:", !isDeposit)
        // // if(!isDeposit != true || !isWithdrawal !== true){
        // //     ssNumberContainer.innerText = ""

        // }
    })
})

// clear pin
const clearPin = () => {
    msCode.innerText = ""
}

//verify pin
const verifyPin = () => {
    let pin = msCode.innerText
    console.log("pin entered is:",pin)
    if(pin === code){
        console.log("ACCESS GRANTED")
        toggleHidden(msContainer,ssContainer)
        isSecondScreen = !ssContainer.classList.value.includes('.hidden')
    } else{
        alert("INCORRECT PIN")
        clearPin()
        console.log("INCORRECT PIN CODE")
    }
}


enterKey.addEventListener('click', () => {
    if(!isSecondScreen){
        console.log(isSecondScreen)
        verifyPin()
    }
})

cancelKey.addEventListener('click', () => {
    if(!isSecondScreen){
        clearPin()
    }
})


// hide screen
const toggleHidden = (hide, show) => {
    hide.classList.add('hidden')
    show.classList.remove('hidden')
}



// display balance
const displayBalance = () => {
    ssBalance.classList.remove('hidden')
    depositPrompt.classList.add('hidden')
    withdrawalPrompt.classList.add('hidden')

    ssNumberContainer.innerText = ""

    isDeposit = false
    isWithdrawal = false
    console.log(`deposit is: ${isDeposit}. Withdrawal is: ${isWithdrawal}`)
}

// prompt for deposit
const deposit = () => {
    // isDeposit = depositPrompt.classList.value.includes('hidden')
    displayBalance()
    withdrawalPrompt.classList.add('hidden')
    depositPrompt.classList.remove('hidden')

    isDeposit = true
    console.log(isDeposit)
    console.log("deposit is clicked:", isDeposit)
    console.log("withdrawl is clicked:", isWithdrawal)
}

// prompt withdrawal
const withdrawal = () => {
    // isWithdrawal = !withdrawalPrompt.classList.value.includes('hidden')
    displayBalance()
    depositPrompt.classList.add('hidden')
    withdrawalPrompt.classList.remove('hidden')
    isWithdrawal = true
    // console.log(!isWithdrawal)
    console.log("withdrawal is clicked:", isWithdrawal)
    console.log("deposit is clicked:", isDeposit)
}


// wow i am amazed at what i just did lol .... checks to see if deposit prompt is displayed or not
// console.log(depositPrompt.classList.value.includes('hidden'))

!depositPrompt.classList.value.includes('hidden')
// console.log(isDeposit)


// do math
const updateBalance = () => {

    let number = ssNumberContainer.innerText
    console.log("adding: " + number)
    if(isDeposit){
        balance += Number(number)
        console.log(`NEW balance is ${balance} after adding deposit`)
    } else if(isWithdrawal){
        balance -= Number(number)
        console.log(`NEW balance is ${balance} after subtracting withdrawal`)
    }

    if(balance < 0){
        ssBalance.innerHTML = `BALANCE: <span class="balanceDisplay red">$${balance}.00</span>`
    } else {
        ssBalance.innerHTML = `BALANCE: <span class="balanceDisplay green">$${balance}.00</span>`
    }
}

// hide "make selection"
ssButtons.forEach((button) => {
    button.addEventListener('click', () => {
        ssStarter.classList.add('hidden')
    })
})