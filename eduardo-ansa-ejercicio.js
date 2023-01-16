// -----Entendimiento del ejercicio-------------------------------------

// Comenze anotando los valores de las diagonales de menor a mayor, comenzando desde la dimension 1x1 hasta la 10x10.

// console.log('1x1', 1)
// console.log('2x2', 1+2+3+4) // +1 
// console.log('3x3', 1 +3+5+7+9) //+2
// console.log('4x4', 1+2+3+4+ 7+10+13+16) //+1 +3
// console.log('5x5', 1 +3+5+7+9+ 13+17+21+25) //+2 +4
// console.log('6x6', 1+2+3+4+ 7+10+13+16+ 21+26+31+36) //+1 +3 +5
// console.log('7x7', 1+3+5+7+9+13+17+21+25+31+37+43+49) //+2 +4 +6
// console.log('8x8', 1+2+3+4+ 7+10+13+16+ 21+26+31+36+ 43+50+57+64) //+1 +3 +5 +7
// console.log('9x9', 1 +3+5+7+9 +13+17+21+25 +31+37+43+49 +57+65+73+81) //+2 +4 +6 +8
// console.log('10x10', 1+2+3+4+ 7+10+13+16+ 21+26+31+36+ 43+50+57+64 +73+82+91+100) //+1 +3 +5 +7 +9

// Logre ver un patron en los valores que forman las diagonales, este es:
// - Para dimensiones pares (2x2, 4x4, 6x6,...), los valores de las diagonales comienzan en 1 y van aumentando de 1, luego de 4 valores, comienzan a aumentar de 3, 4 valores mas y aumentan de a 5 y asi sucesivamente. 
//   En resumen cada 4 valores incrementa el aumento en 2, podriamos decir que aumenta de forma : 1 + 2i
// - Para dimensiones Impares (3x3, 5x5, 5x5,...), los valores de las diagonales comienzan en 1 y van aumentando de 2, luego de 4 valores, comienzan a aumentar de 4, 4 valores mas y aumentan de a 6 y asi sucesivamente. 
//   En resumen cada 4 valores incrementa el aumento en 2, podriamos decir que aumenta de forma : 2 + 2i.

// Entonces se tiene que iterar la cantidad de veces que se repetira el proceso, por ejemplo para 4x4 solo se itera dos vez, obteniendo los valores 1,2,3,4 y 7,10,13,16 (siguiendo la forma 1 + 2i). 
// Podriamos decir que las repeteciones son igual a: dimension/2 
// -> Ej 4x4 -> 4/2 -> 2 repeticiones 
// -> Ej 5x5 -> 5/2 -> 2.5 repeticiones = 2 repeticiones, en estos casos se redondea para abajo

// En resumen se debe iniciar con un arreglo vacio, al cual se le iran agregando arreglos con 4 valores, los cuales corresponden a los valores de las diagonales, mas especificamente a las esquinas(4) desde dentro hacia afuera. 
// Este proceso se repetira dependiendo de la formula (dimension / 2).
// Cuando se terminen las repeticiones se tendra un arreglo que contenga varios arreglos con los valores de las diagonales. 
// se Utilizara la funcion flat() para dejar todo en un solo arreglo y luego sumar todos los valores que este contenga. en caso de que la dimension se impar al total sumarle 1.

//Ej

// para dimension de 5x5: dimension impar
// Forma 2 + 2i, Repeticiones = 5/2 = 2.5 = 2, El 1 inicial se suma al final de todo
// el arreglo quedaria como:
// [
//   [3,5,7,9],     ---> i=0 ->aumenta en 2
//   [13,17,21,25], ---> i=1 ->aumenta en 4
// ]
// Siendo las sumas de las diagonales = 100 + 1

// para dimension de 8x8: dimension par
// Forma 1 + 2i, Repeticiones = 8/2 = 4
// el arreglo quedaria como:
// [
//   [1,2,3,4],     ---> i=0 ->aumenta en 1
//   [7,10,13,16],  ---> i=1 ->aumenta en 3
//   [21,26,31,36], ---> i=2 ->aumenta en 5
//   [43,50,57,64], ---> i=3 ->aumenta en 7
// ]
// Siendo las sumas de las diagonales = 384



// --------Desarrollo de codigo ---------

const totalDiagonalSum = (n) => {
    // en caso de ser 1
    if(n === 1) return 'La suma de las diagonales es:1';
    
    // Matriz en donde iran listas de 4 esquinas
    let mainArray = []
    // Cantidad de listas que iran en la matriz, depende de la dimension(n)
    const REPETITIONS = Math.floor(n/2)
    // en caso de que la dimension(n) sea impar que sume 1, de lo contrario que sume 0
    const addForImpar = n % 2 === 0 ? 0 : 1
    
    // Se insertan al arreglo principal los listados de las esquinas
    for(let i=0; i<REPETITIONS; i++){  
        // lista de esquinas, la cual siempre comienza vacia
        let cornerList = []
        // cantidad a sumar, para par 1 + 2i, para impar 2 + 2i
        const amountAdd = 1 + 2*i +addForImpar 
        // si el mainArray esta vacio que comienze con 0 o 1, de lo contrario que comienze con el ultimo valor del mainArray
        const diagonal = mainArray[i-1]
        let element = mainArray.length === 0 ? 0 + addForImpar : diagonal[diagonal.length-1]
  
        // Insertar a la lista vacia cornerList los valores correspondientes
        for(let j=0; j<4; j++){
            element = element + amountAdd
            cornerList.push(element)
        }
        // insertar al mainArray la lista cornerList que contiene valores de las diagonales
        mainArray.push(cornerList)
    }
    
    // En este punto tenemos una matriz que contiene varios arreglos con los valores de las diagonales, por lo tanto ocuparemos la funcion flat()
    // para dejar todo en un solo arreglo, y luego un reduce para sumar todos los valores de la matriz(mainArray).
    // En caso de ser impar se le suma 1.
    const result = addForImpar + mainArray.flat().reduce((accumulator, curr) => accumulator + curr)
    console.log('La suma de las diagonales es:' + result);
    
  }
  
  // ingresar el digito de la dimension del cuadrado, en este caso 1003 x 1003
  totalDiagonalSum(1003)