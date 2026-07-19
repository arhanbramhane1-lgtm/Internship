// =========================
// Calculator
// =========================

const display = document.getElementById("display");

function append(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

function calculate(){

    try{

        display.value = eval(display.value);

    }catch{

        display.value = "Error";

        setTimeout(()=>{
            display.value="";
        },1000);

    }

}

function calculateBMI(){

    let height = Number(document.getElementById("height").value);

    let weight = Number(document.getElementById("weight").value);

    let bmiValue = document.getElementById("bmiValue");

    let bmiStatus = document.getElementById("bmiStatus");

    if(height==="" || weight==="" || height<=0 || weight<=0){

        alert("Please enter valid values");

        return;

    }

    let meter = height/100;

    let bmi = weight/(meter*meter);

    bmiValue.innerHTML = bmi.toFixed(2);

    if(bmi<18.5){

        bmiStatus.innerHTML="Underweight";

    }

    else if(bmi<25){

        bmiStatus.innerHTML="Normal Weight";

    }

    else if(bmi<30){

        bmiStatus.innerHTML="Overweight";

    }

    else{

        bmiStatus.innerHTML="Obese";

    }

}

// =========================
// Live Date & Time
// =========================

function updateClock(){

    const now = new Date();

    const dateOptions = {

        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric'

    };

    document.getElementById("date").innerHTML =
    now.toLocaleDateString("en-IN",dateOptions);

    document.getElementById("time").innerHTML =
    now.toLocaleTimeString("en-IN");

}

updateClock();

setInterval(updateClock,1000);


const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("light")){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }

    else{

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

});