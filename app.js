// Inicialización de variables
let secretNumber = 0;
let tries = 0;
let userNumberList = [];
let repetitiveSecretNumberList = [];
let maxNumber = 10;


function textToElementAsign(elemento, texto) {
    let HTMLElement = document.querySelector(elemento);
    HTMLElement.innerHTML = texto;
    return;
}


function getSecretNumber() {
    let secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    if (repetitiveSecretNumberList.length == maxNumber) {
        return -1;
    
    } else {
        if (repetitiveSecretNumberList.includes(secretNumber)){
            return getSecretNumber();
        } else {
            repetitiveSecretNumberList.push(secretNumber);
            console.log(`Lista de números secretos usados: ${repetitiveSecretNumberList}`);
            return secretNumber;
        }
    }
}


function initCond() {
    console.clear();
    textToElementAsign('h1', 'Juego mágico');
    textToElementAsign('p', `Ingresa un número del 1 al ${maxNumber}:`);
    secretNumber = getSecretNumber();
    if (secretNumber == -1) {
        textToElementAsign('p', 'Se llegó al maximo de juegos!');
        document.getElementById('adivinar').setAttribute('disabled', 'true');
    } else {
        secretNumber = secretNumber;
    }
    console.log(`Número secreto: ${secretNumber}`);
    tries = 1;
    userNumberList = [];
    return;
}


function clearInputBox() {
    document.querySelector('#userNumberInput').value = '';
}


function triesVerify() {
    console.log("-------------------------- Inicio --------------------------");
    let userInput = parseInt(document.getElementById('userNumberInput').value);
    console.log(`Ingresado por el usuario: ${userInput}`);
    console.log(typeof(userInput));
    console.log(secretNumber == userInput);
    console.log(`Intentos: ${tries}`);

    if (userInput === secretNumber){
        textToElementAsign('p', `Acertaste!!! en ${tries} ${(tries == 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (userInput > secretNumber){
        textToElementAsign('p', 'El número secreto es menor');
        } else {
            textToElementAsign('p', 'El número secreto es mayor');
        }
        tries++;
        clearInputBox();
    }

    usedNumbers(userInput);

    return;
}


function resetGame() {
    clearInputBox();
    initCond();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    return;
}


function usedNumbers(userInput) {
    userNumberList.push(userInput);
    console.log(`Número usado | Elemento lista: ${userNumberList}`);
    console.log(`Primer elemento: ${userNumberList[0]}`);
    console.log(`Último elemento: ${userNumberList[userNumberList.length -1]}`);
    console.log(`Largo de lista: ${userNumberList.length}`);

    return;
}

initCond();