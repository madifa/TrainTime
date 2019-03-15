  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIsaHzAqfv-IRIdtxzZrPpcQYMDc2SlO0",
    authDomain: "traintime-week-4-day-3.firebaseapp.com",
    databaseURL: "https://traintime-week-4-day-3.firebaseio.com",
    projectId: "traintime-week-4-day-3",
    storageBucket: "traintime-week-4-day-3.appspot.com",
    messagingSenderId: "609408715108"
  };
  firebase.initializeApp(config);


var database = firebase.database();
 
var TrainName;
var Destination;
var Frequency;
var NextArrival;
var MinutesAway;


 $("#minutes-away-btn").on("click", function(event){
    event.preventDefault();
         
  TrainName = $("#train-name-input").val().trim();
  Destination = $("#destination-input").val().trim();
  Frequency = $("#frequency-input").val().trim();
  NextArrival = $("#next-arrival-input").val().trim();
  //MinutesAway = $("#minutes-away-input").val().trim();

  console.log(TrainName);
  console.log(Destination);
  console.log(Frequency);
  console.log(NextArrival);
  //console.log(MinutesAway);


  database.ref().push({
         TrainName: TrainName,
         Destination: Destination,
         Frequency: Frequency,
         NextArrival: NextArrival,
        // MinutesAway: MinutesAway,
       });

       $("input").val("");
 })


database.ref().on("child_added", function(snapshot) {

var sv = snapshot.val();

var freq = parseInt(sv.Frequency)

var dConverted = moment(snapshot.val().time, 'HH:mm').subtract(1,'years');

var trainTime = moment(dConverted).format('HH:mm');

var tConverted = moment(trainTime, 'HH:mm').subtract(1,'years');

var tDifference = moment().diff(moment(tConverted),'minutes');


var tRemainder = tDifference % freq;
var minsAway = freq - tRemainder;
var nextTrain = moment().add(minsAway,'minutes');

    var newRow = $("<tr>").append(

        $("<td>").text(sv.TrainName),
        $("<td>").text(sv,Destination),
        $("<td>").text(sv,Frequency),
        $("<td>").text(sv,NextArrival),
        $("<td>").text(moment(MinutesAway, 'HH:mm').format('hh:mm a')),
        $("<td>").text(minsAway + ' Minutes Away'),

    
        )

        $("#employee-table > tbody").append(newRow);
    });