/* PSEUDOCODE

Hacer que funcionen los input y la información se muestre en la tabla y se mantenga (local storage)
En los inputs de time usar Momenth.js para mostrar la hora como se pide
Tomar los datos de la hora actual para calcular el tiempo del siguiente tren
Conectar con firebase para que se vea la misma info en cualquier máquina
*/

$("#submit").on("click", function(event) {

    event.preventDefault();

    var name = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var nextArrival = $("#timeTrainInput").val().trim();
    var minutes = "";

    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);
   
    $("#trainNameDisplay").text(name);
    $("#destinationDisplay").text(destination);
    

});