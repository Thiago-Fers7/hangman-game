let text // For word and letter
let arrayTextValue
let completeText
let amountSpan = []
let lettersBetween = []
let letter
let cont = 0, cont1 = 0 // Counters
let statusSound = 'play'
let showPlayAgain = true

const confirmWord = () => {
    let betweenKey = document.querySelector('.between-key')
    text = document.querySelector('#cWord')

    // Checking the entry length
    if (text.value.length < 3) {
        text.style.background = 'url(../Imagens/icons/exclamation-solid.png) no-repeat 95%/0.6rem'
        text.focus()
        return
    } else {
        text.style.background = ''
    }

    // Disable hint entry
    let addTips = document.querySelector('.addTips')
    addTips.style.display = 'none'
    let cTip = document.querySelector('#cTip')
    cTip.style.display = 'none'
    let answerComplete = document.querySelector('.formAnswerComplete')
    answerComplete.style.display = 'block'

    // Enable tips button
    let totalTips = document.querySelector('.totalTips')
    totalTips.removeAttribute('disabled')
    
    document.querySelector('.containerResults').style.display = 'block'
    
    document.querySelector('.br').remove() // Remove break line

    // Removing "-" and sabing the entire word
    completeText = text.value.toLowerCase().replace(/\s/g, '-')
    arrayTextValue = completeText.split('')

    // Modifying information text
    betweenKey.textContent = 'Now enter a key:'
    betweenKey.classList.add('blue')
    

    // Modifying input for new datas
    text.value = ''
    text.setAttribute('maxlength', '1')
    text.setAttribute('placeholder', 'Add letter here')
    text.classList.add('center')
    text.focus()

    // Delete the function call and add a new function
    let button = document.querySelector('#confirm')
    button.setAttribute('onclick', 'confirmLetter()')
    text.setAttribute('onkeydown', 'enterVerify("confirmLetter")')
    let result = document.querySelector('.result')

    // Creating "spans" for add the acceptd letters 
    let span
    let br
    let cont = 0
    for (let i = 0; i < arrayTextValue.length; i++) {
        span = document.createElement('span')
        span.setAttribute('id', 'letter')
        span.setAttribute('class', `letter${i}`)
        result.appendChild(span)

        cont++
        if (cont == 10) {
            br = document.createElement('br')
            result.appendChild(br)
            cont = 0
        }

        // Add Numbers in arrays to replace the letter later
        amountSpan.push(i)
    }
    addLetters('-')
}

// function to add and display the letter in its position
const addLetters = (character) => {
    let positionLetter = arrayTextValue.indexOf(character)

    while (positionLetter != -1) {
        for (let i = 0; i < arrayTextValue.length; i++) {
            if (amountSpan[i] == positionLetter) {
                letter = document.querySelector(`.letter${i}`)
                letter.textContent = arrayTextValue[positionLetter]
                cont1++
            }
        }
        positionLetter = arrayTextValue.indexOf(character, positionLetter + 1)
    }
    return cont1
}

// Handling DOM for the correct letter or word
const correctLetterOrWord = (correctWord) => {
    let textValue = text.value.toLowerCase()
    let containerWordDiv = document.querySelector('.containerWords div')
    let containerGif = document.querySelector('.containerGif')
    let closing = document.querySelector('.closing')
    let containerFormAnswerComp = document.querySelector('.containerFormAnswerComplete')

    if (addLetters(textValue) == arrayTextValue.length || correctWord) {
        containerWordDiv.style.display = 'none'
        containerGif.style.display = 'block'
        closing.style.display = 'block'
        containerFormAnswerComp.style.display = 'none'
    }
}

// Handling DOM for the incorrect letter or word
const incorrectLetterOrWord = (fail) => {
    let textValue = text.value.toLowerCase()
    let images = document.querySelectorAll('.containerImages figure img')
    let incorrectResult = document.querySelector('.incorrectResult span')
    incorrectResult.textContent += `${textValue} - `

    let containerWordDiv = document.querySelector('.containerWords div')
    let closing = document.querySelector('.closing')

    if (cont == 5 || fail == 'fail') {
        document.querySelector('.containerDeathImage').style.display = 'block'
        document.querySelector('.deathImage').style.zIndex = '102'
        document.querySelector('.result').textContent = `This was the word: `
        document.querySelector('.spanResult').textContent = `${completeText}`
        
        let containerFormAnswerComp = document.querySelector('.containerFormAnswerComplete')
        containerFormAnswerComp.style.display = 'none'

        images[6].classList.add('frontImage') // Adjusting the image forward

        containerWordDiv.style.display = 'none'
        closing.style.display = 'block'
        
        // Play music (user decides)
        let audio = new Audio('../Sonds/loughter.mp3')
        if (statusSound == 'play'){
            audio.play()
        }
        cont++
    } else if (cont < 5) {
        images[cont].classList.remove('frontImage')
        cont++
        images[cont].classList.add('frontImage')
    }
}

// Confirmation letter informed by the user
const confirmLetter = () => {
    let textValue = text.value.toLowerCase()
    // Add the "!" icon if there is no letter
    if (textValue == '') {
        text.style.background = 'url(../Imagens/icons/exclamation-solid.png) no-repeat 99%/0.6rem'
        text.focus()
        return
    }
    text.style.background = ''

    // Check if letter has already been entered
    if (lettersBetween.indexOf(textValue) != -1) {
        textValue = ''
        text.focus()
        return
    }
    lettersBetween.push(textValue) // Add letter now existence

    let positionLetter = arrayTextValue.indexOf(textValue)

    if (positionLetter == -1) {
        incorrectLetterOrWord()
    }else if (positionLetter != -1) {
        correctLetterOrWord()
    }

    text.value = ''
    text.focus()
}

// Closing menus and images
const closing = (noShow) => {
    document.querySelector('.containerGif').style.display = 'none'
    document.querySelector('.closing').style.display = 'none'
    document.querySelector('.containerDeathImage').style.display = 'none'
    document.querySelector('.deathImage').style.zIndex = '0'
    document.querySelector('.mainMenu').style.display = 'none'
    document.querySelector('.containerConfirmWord').style.display = 'none'
    if (showPlayAgain && noShow != false) {
        document.querySelector('.playAgain').style.display = 'block'
    } else {
        showPlayAgain = true
    }
}

// Reload the page
const playAgain = () => {
    window.location.reload()
}

// Call the functions by pressing "enter"
const enterVerify = (identifier) => {
    let key = window.event.keyCode
    let correctKey = key == 13

    if (identifier == 'tips' && correctKey) {
        addTips()
    } else if (identifier == "confirmWord" && correctKey) {
        confirmWord()
    } else if (identifier == "confirmLetter" && correctKey) {
        confirmLetter()
    } else if (identifier == "answerComplete" && correctKey) {
        confirmAnswerComplete()
    }
}

// Add tips by entry
let contTips = 0
let arrayTips = []
const addTips = () => {
    contTips++
    if (contTips > 5) {
        return alert('Maximum tips reached')
    }

    let cTip = document.querySelector('#cTip')
    let cTipValue = cTip.value

    if (cTipValue.length < 5) {
        cTip.focus()
        contTips--
        return alert('The tip must have at least 5 letters')
    } else if (arrayTips.indexOf(cTipValue) != -1) {
        cTip.value = ''
        cTip.focus()
        contTips--
        return alert('Repetead tip')
    } else {
        arrayTips.push(cTipValue)
        cTip.value = ''
        cTip.focus()
        document.querySelector('.totalTips p span').textContent = contTips
    }
}

let numberTip = 0
const showTips = () => {
    let totalTipsSpan = document.querySelector('.totalTips p span')
    
    if (arrayTips.length == 0) {
        totalTipsSpan.textContent = "are over!"
        document.querySelector('.totalTips').style.background = 'linear-gradient(45deg, rgb(253, 80, 0), rgb(77, 18, 8))'
        return
    }

    let tipRandom = parseInt(Math.random() * (arrayTips.length - 0) + 0)
    let showTips = document.querySelector('.containerShowTips p')

    if (arrayTips.length != 0) {
        showTips.innerHTML += `Tip ${++numberTip}: ${arrayTips[tipRandom]} <br>`
        arrayTips.splice(tipRandom, 1)
    }
    totalTipsSpan.textContent = arrayTips.length
}

const confirmAnswerComplete = () => {
    let showConfirmWord = document.querySelector('.showConfirmWord')
    showConfirmWord.textContent = confirmLength()
    
    if (confirmLength() != undefined) {
        document.querySelector('.containerConfirmWord').style.display = 'block'
        document.querySelector('.closing').style.display = 'block'
    }    
}

const confirmLength = () => {
    let answer = document.querySelector('#cAnswer')
    if (answer.value.length < 3) {
        answer.focus()
        return
    }
    let formatedAnswer = answer.value.toLowerCase().replace(/\s/g, '-')
    return formatedAnswer
}

const answerComplete = () => {
    let formatedAnswer = confirmLength()

    let correctWord = formatedAnswer == completeText
    if (correctWord) {
        document.querySelector('#letter').remove()
        document.querySelector('.result').textContent = `Result: `
        document.querySelector('.spanResult').textContent = `${formatedAnswer}`
        correctLetterOrWord(correctWord)
    } else {
        incorrectLetterOrWord('fail', formatedAnswer)
    }
}

// Muted song by icon on diplay (user decides)
const sound = (mute) => {
    let volumeMute = document.querySelector('.volumeMute')
    let volumeUp = document.querySelector('.volumeUp')
    
    if (mute == "mute") {
        volumeMute.style.display = 'none'
        volumeUp.style.display = 'block'
        statusSound = 'play'
    } else {
        volumeMute.style.display = 'block'
        volumeUp.style.display = 'none'
        statusSound = 'break'
    }
}

// Simple menu
const showMainMenu = () => {
    showPlayAgain = false
    let mainMenu = document.querySelector('.mainMenu')
    mainMenu.style.display = 'block'
    let closing = document.querySelector('.closing')
    closing.style.display = 'block'
}

const changeColor = (original) => {
    let color = document.querySelector('#cColor')
    let shown = document.querySelector('.changeColor')

    if (original == 'originalColor') {
        shown.style.background = '#577e5b'
        document.body.style.background = '#577e5b'
    } else {
        document.body.style.background = color.value
        shown.style.background = color.value
    }
}