/* PSEUDOCODE

Hacer que funcionen los input y la información se muestre en la tabla y se mantenga (local storage)
En los inputs de time usar Momenth.js para mostrar la hora como se pide
Tomar los datos de la hora actual para calcular el tiempo del siguiente tren
Conectar con firebase para que se vea la misma info en cualquier máquina
*/



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpLqnLsVRBex7urLrh3KCJh15i-knhHeo",
    authDomain: "train-hw07.firebaseapp.com",
    databaseURL: "https://train-hw07.firebaseio.com",
    projectId: "train-hw07",
    storageBucket: ""

  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();


// Variables iniciales
  var name = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";
  var minutes = "";


$("#submit").on("click", function(event) {

    event.preventDefault();

    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    
    dataRef.ref().push({

        name: name,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

  dataRef.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrain);

    var firstTrainConv = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("Moment " + firstTrainConv);

    var currentTime = moment();
    console.log("current" + currentTime);

    var minuteArrival = currentTime.diff(firstTrainConv, "minutes");
    var minuteLast = minuteArrival % frequency;
    var awayTrain = frequency - minuteLast;

    console.log("minute arrival " + minuteArrival);
    console.log("minute last: " + minuteLast);
    console.log("away train: " + awayTrain);

    var nextArrival = currentTime.add(awayTrain, "minutes");
    var arrivalTime = nextArrival.format("HH:mm");

    console.log("next arrival " + nextArrival);
    console.log("arrival time: " + arrivalTime);
    
    $("#DataTrains").append("<tr class='well'><td class='train-name'> " +
      childSnapshot.val().name +
      " </td><td class='train-destination'> " + childSnapshot.val().destination +
      " </td><td class='train-frequency'> " + childSnapshot.val().frequency +
      " </td><td class='train-Arrival'> " + firstTrain +
      " </td><td class='train-Away'> " + awayTrain +
      " </td></tr>");
  }, function(errorObject) {
      console.log("Errors handled " + errorObject.code);
  });

  