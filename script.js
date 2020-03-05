const distance = [
    // Array of triathlon distances: Distance name, Swim distance (m), Bike distance (km), Run distance (km) 
    ["Sprint distance", 750, 20, 5],
    ["Olympic distance", 1500, 40, 10],
    ["Ironman 70.3 distance", 1900, 90, 21.1],
    ["Ironman 140.6", 3800, 180, 42.2]
];

// Distances are listed into HTML select field
const selectDistance = document.getElementById('distance');
const select = document.createElement('select');
selectDistance.appendChild(select);
select.setAttribute('onchange','setDistance()')
select.setAttribute('id','selectedDistance')

distance.forEach ((i,index) => {
    const option = document.createElement('option');
    select.appendChild(option);
    option.setAttribute('value',index);
    option.innerHTML = i[0];
});

//setting defalut values
swimDistance = `${distance[0][1]}`;
bikeDistance = `${distance[0][2]}`;
runDistance = `${distance[0][3]}`;

document.getElementById("swim-distance").innerHTML = `${swimDistance} m`;
document.getElementById("bike-distance").innerHTML = `${bikeDistance} km`;
document.getElementById("run-distance").innerHTML = `${runDistance} km`;

// when TRIATHLON distance is slected - SWIM, BIKE and RUN distances are set
function setDistance() {
    let x = document.getElementById('selectedDistance').value;
    swimDistance = `${distance[x][1]}`;
    bikeDistance = `${distance[x][2]}`;
    runDistance = `${distance[x][3]}`;
    document.getElementById("swim-distance").innerHTML = `${swimDistance} m`;
    document.getElementById("bike-distance").innerHTML = `${bikeDistance} km`;
    document.getElementById("run-distance").innerHTML = `${runDistance} km`;
 
    swimTime = calcSwimTime(swimPace);
    bikeTime = calcBikeTime(bikePace);
    runTime = calcRunTime(runPace);
    
    document.getElementById("swim-time").setAttribute('value',swimTime);
    document.getElementById("bike-time").setAttribute('value',bikeTime);
    document.getElementById("run-time").setAttribute('value',runTime);
    final();
   }

    //function calculates SWIM TIME [hh:mm:ss], when swim pace is entered [hh:mm:ss]
    let calcSwimTime = (a = "00:00:00") => {
        let swimTimeNumber = timeToNumber(a) * swimDistance/100;
        let swimTime = numberToTime(swimTimeNumber);
        return (swimTime);
    }

    //function calculates SWIM PACE for 100 m [hh:mm:ss], when swim time is entered [hh:mm:ss]
    let calcSwimPace = (a = "00:00") => {
        swimPaceNumber = timeToNumber(a);
        swimPace = numberToTime(swimPaceNumber / (swimDistance / 100));
        return (swimPace);
    }

    //function calculates BIKE TIME [hh:mm:ss], when bike pace is entered [km/h]
    let calcBikeTime = (a = 0) => {
        if (a == 0) {
            let bikeTime = "00:00:00"
            return (bikeTime);
            };
        let bikeTimeNumber = 60 / 60 / a * bikeDistance;
        let bikeTime = numberToTime(bikeTimeNumber);
        return (bikeTime);
    }

    //function calculates BIKE PACE [km/h], when bike time is entered [hh:mm:ss]
    let calcBikePace = (a = 0) => {
        if (a == 0) {
            bikeTime = "00.00";
            return (bikeTime);
            };
        let bikePaceNumber = (bikeDistance / timeToNumber(a)).toFixed(2);
        return(bikePaceNumber);
    }

    //function calculates RUN TIME [hh:mm:ss], when run pace is entered [hh:mm:ss]
    let calcRunTime = (a = "00:00:00") => {
        let runTimeNumber = timeToNumber(a) * runDistance;
        let runTime = numberToTime(runTimeNumber);
        return (runTime);
    }

    //function calculates RUN PACE [hh:mm:ss], when run time is entered [hh:mm:ss]
    let calcRunPace = (a = "00:00:00") => {
        let runPaceNumber = timeToNumber(a) / runDistance;
        let runPace = numberToTime(runPaceNumber);
        return (runPace);
    }

    swimPace = "01:45";
    swimTime = calcSwimTime(swimPace);
    t1Time = "01:15";
    let bikePace = "36.50";
    let bikeTime = calcBikeTime(bikePace);
    t2Time = "00:50";
    let runPace = "03:45";
    let runTime = calcRunTime(runPace);

    // setting values for pace and time input fields
    document.getElementById("swim-pace").setAttribute('value',swimPace);
    document.getElementById("swim-time").setAttribute('value',swimTime);
    document.getElementById("t1-time").setAttribute('value',t1Time);
    document.getElementById("bike-pace").setAttribute('value',bikePace);
    document.getElementById("bike-time").setAttribute('value',bikeTime);
    document.getElementById("t2-time").setAttribute('value',t2Time);
    document.getElementById("run-pace").setAttribute('value',runPace);
    document.getElementById("run-time").setAttribute('value',runTime);

    //function converts given time [hh:mm:ss] to numeric value
    function timeToNumber(time = 0) {
        let pieces = time.split(':');
        if (pieces.length == 3) {
            let hrs = Number(pieces[0]);
            let mins = Number(pieces[1]);
            let secs = Number(pieces[2]);
            return (hrs*60 + mins + (secs/60))/60;
        } else if (pieces.length == 2) {
            let mins = Number(pieces[0]);
            let secs = Number(pieces[1]);
            return (mins + (secs/60))/60;
            }
     };

    //function converts numeric value to time string in format [hh:mm:ss]
    function numberToTime(number = 0) {
        let hrs = Math.floor(number);
        number -= hrs;
        let mins = Math.floor(number*60);
        number = (number*60) - Math.floor(number*60);
        let secs = Math.round(number*60)
        if (hrs < 10) hrs = "0" + hrs;
        if (mins < 10) mins = "0" + mins;
        if (secs < 10) secs = "0" + secs;
        return (`${hrs}:${mins}:${secs}`);
    };




// function calculates final time
let final = () => {
    let t1TimeNumber = timeToNumber(t1Time);
    let t2TimeNumber = timeToNumber(t2Time);
    let swimTimeNumber = timeToNumber(swimTime);
    let bikeTimeNumber = timeToNumber(bikeTime);
    let runTimeNumber = timeToNumber(runTime);
    let finalTimeNumber = swimTimeNumber + t1TimeNumber + bikeTimeNumber + t2TimeNumber + runTimeNumber;
    let finalTime = numberToTime(finalTimeNumber);
    document.getElementById("final-time").innerHTML = (finalTime);
    return (finalTime);
}
    final();

    let changeSwimTime = () => {
        swimPace = document.getElementById("swim-pace").value;
        swimTime=calcSwimTime(swimPace);
        document.getElementById("swim-time").setAttribute('value',swimTime);  
        final();
    };

    let changeSwimPace = () => {
        swimTime = document.getElementById("swim-time").value;
        swimPace=calcSwimPace(swimTime);
        document.getElementById("swim-pace").setAttribute('value',swimPace);
        final();
    };

    let changeBikeTime = () => {
        bikePace = document.getElementById("bike-pace").value;
        bikeTime=calcBikeTime(bikePace);
        document.getElementById("bike-time").setAttribute('value',bikeTime);  
        final();
    };

    let changeBikePace = () => {
        bikeTime = document.getElementById("bike-time").value;
        bikePace=calcBikePace(bikeTime);
        document.getElementById("bike-pace").setAttribute('value',bikePace);
        final();
    };

    let changeRunTime = () => {
        runPace = document.getElementById("run-pace").value;
        runTime = calcRunTime(runPace);        
        document.getElementById("run-time").setAttribute('value',runTime);  
        final();
    };

    let changeRunPace = () => {
        runTime = document.getElementById("run-time").value;
        runPace = calcRunPace(runTime);
        document.getElementById("run-pace").setAttribute('value',runPace);
        final();
    };

    let changeT1 = () => {
        t1Time = document.getElementById("t1-time").value;
        final();
    };

    let changeT2 = () => {
        t2Time = document.getElementById("t2-time").value;
        final();
    };

    document.getElementById("swim-pace").addEventListener('input', changeSwimTime);
    document.getElementById("swim-time").addEventListener('input', changeSwimPace);
    document.getElementById("bike-pace").addEventListener('input', changeBikeTime);
    document.getElementById("bike-time").addEventListener('input', changeBikePace);
    document.getElementById("run-pace").addEventListener('input', changeRunTime);
    document.getElementById("run-time").addEventListener('input', changeRunPace);
    document.getElementById("t1-time").addEventListener('input', changeT1);
    document.getElementById("t2-time").addEventListener('input', changeT2);