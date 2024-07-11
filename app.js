/*
let title = document.querySelector('h1');  // Permite acceder/conectar a cada elemento
title.innerHTML = 'Juegazo mágico';

let para = document.querySelector('p');  // se puede llamar a la etiqueta o a la clase 
para.innerHTML = 'Ingresa un número (del 1 al 10)';
*/

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


function getSecretNumber() {  // Función recursiva
    let secretNumber = Math.floor(Math.random() * maxNumber) + 1;  // +1 Para que sean numeros del 1 al 10
    // Cambio para que no se repita el número a adivinar
    if (repetitiveSecretNumberList.length == maxNumber) {  // Condicion de salida de recursiv.
        return -1;
    
    } else {
        if (repetitiveSecretNumberList.includes(secretNumber)){
            // Nro screto SI está en la lista (Si se repite)
            return getSecretNumber();
        } else {
            // El numero secreto NO está en la lista (No se repite)
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
        // document.getElementById('reiniciar').removeAttribute('disabled')
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
    /*
    let boxValue = document.querySelector('#userNumberInput');  // Obtener por Id de otra forma || querySelector es un selector egnérico
    boxValue.value = '';
    */
    document.querySelector('#userNumberInput').value = '';  // Otra forma mas corta
}


function triesVerify() {  // Se inicializa con el boton "Adivinar"
    // Console.log para indicar comienzo
    console.log("-------------------------- Inicio --------------------------");
    // alert('Se llamó a la función');
    let userInput = parseInt(document.getElementById('userNumberInput').value);  // Obtener datos del input por Id

    // Verificación de datos
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
        tries++;  // Dentro del esle cuenta unicamente cuando no es adivinado
        clearInputBox();  // Dentro del else para que lo borre solo al reintentar
    }

    // Lista de numeros usados
    usedNumbers(userInput);

    return;
}


function resetGame() {  // Se inicializa con el boton "Reiniciar juego"
    //Limpiar la caja de input
    clearInputBox();
    // Volver a las condiciones iniciales || impresion de titulos || nro intentos || numero secreto nuevo
    initCond();
    // Deshabilitar boton de nuevo juego
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