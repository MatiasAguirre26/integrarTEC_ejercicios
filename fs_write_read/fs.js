import fs from "fs";

fs.readFile('datos.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Dividiendo el contenido del archivo en números usando cualquier espacio en blanco como delimitador.
    const numbers = data.split(/\s+/).map(Number);

    // Filtrar y contar los números pares
    const evenNumbersCount = numbers.filter(num => num % 2 === 0).length;

    // Mensaje que se va a enviar a el archivo result.txt
    const resultMessage = `Cantidad de números pares: ${evenNumbersCount}`;

    fs.writeFile('result.txt', resultMessage, 'utf8', err => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
        } else {
            console.log('Resultado escrito en result.txt');
        }
    });

});


//console("Cantidad de números pares: 2493")