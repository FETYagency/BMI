const INPUT = document.querySelectorAll("input"); 
const HEIGHT= document.querySelector(".input_height");
const WEIGHT = document.querySelector(".input_weight");

const OPTIONS = document.querySelectorAll("[type='radio']");

const IBM = document.querySelector(".RESULT_BOLD_NUMBER")
const PARTS =  document.querySelectorAll("b")

function calculateBMI_METRIC(){

    let WEIGHT_VALUE  = Number(WEIGHT.value)||"unknown";

    let HEIGHT_VALUE = Number(HEIGHT.value/100)||"unknown";

    let BMI = Number(((WEIGHT_VALUE/(HEIGHT_VALUE**2))).toPrecision(3))||";(";

    IBM.textContent=BMI;
}

function calculateWeightRange_METRIC(height, lowerBMI, upperBMI) {
    var heightInMeters = height / 100;
    
    var lowerWeight = lowerBMI * heightInMeters * heightInMeters;
    
    var upperWeight = upperBMI * heightInMeters * heightInMeters;
    
    PARTS.forEach((e)=>{
        if(e.dataset.wh==="least"){
            e.textContent=`${Math.floor(Number(lowerWeight).toPrecision(2))}kg`
        }
        if(e.dataset.wh==="last"){
            e.textContent=`${Math.floor(Number(upperWeight).toPrecision(2))}kg`
        }
    })
}

const IMPE_PARENT=document.querySelector(".CALCULATOR_OUTPUT");
const IMPE_INPUTS_PARENT= document.querySelectorAll(".imperial");
const METRIC_INPUTS_PARENT = document.querySelectorAll(".metric")

function calculate_IMPERIAL(){
    let TOTAL_INCHES = Number(HEIGHT_FEET.value*12) + Number(HEIGHT_INCH.value);
    let TOTAL_LBS = Number(WEIGHT_ST.value * 14) + Number(WEIGHT_LBS.value);
    
    if(TOTAL_INCHES!==0&&TOTAL_LBS!==0){
        let BMI = ((TOTAL_LBS / (TOTAL_INCHES**2) )*703 ).toFixed(1)||";(";
        IBM.textContent=BMI
    }else{
        IBM.textContent=";("
    }
}

function calculateWeightRange_IMPERIAL(heightFeet, heightInches , lowerBMI, upperBMI) {
    var heightInInches = (heightFeet*12) + heightInches;
    
    var lowerWeight = (lowerBMI * heightInInches * heightInInches)/703;
    
    var upperWeight = (upperBMI * heightInInches * heightInInches)/703;
    
    PARTS.forEach((e)=>{
        if(e.dataset.wh==="least"){
            e.textContent= `${Math.floor(Number(lowerWeight/14).toFixed(1))}st ${Math.floor(Number(lowerWeight%14))}`
        }
        if(e.dataset.wh==="last"){
            e.textContent= `${Math.floor(Number(upperWeight/14).toFixed(1))}st ${Math.floor(Number(upperWeight%14))}`
        }
    })
}

const HEIGHT_FEET = document.querySelector('.input_feet');
const HEIGHT_INCH = document.querySelector('.input_inch');

const WEIGHT_ST = document.querySelector('.input_stone');
const WEIGHT_LBS = document.querySelector('.input_lbs');

function calculations(){
    let i =0;
    while(i<OPTIONS.length){
        let OPTION = OPTIONS[i];
        if(OPTION.dataset.type==="metric"&&OPTION.checked===true){
            IMPE_PARENT.classList.remove("imperial_theme")
            IMPE_INPUTS_PARENT.forEach(e=>e.style.display="none")
            METRIC_INPUTS_PARENT.forEach(e=>e.style.display="block")
            calculateBMI_METRIC();
            calculateWeightRange_METRIC(HEIGHT.value, 18.5, 24.9)
        }else if(OPTION.dataset.type==="imperial"&&OPTION.checked===true){
            IMPE_PARENT.classList.add("imperial_theme")
            IMPE_INPUTS_PARENT.forEach(e=>e.style.display="flex")
            METRIC_INPUTS_PARENT.forEach(e=>e.style.display="none")

            calculate_IMPERIAL();
            calculateWeightRange_IMPERIAL(Number(HEIGHT_FEET.value), Number(HEIGHT_INCH.value) , 18.5, 24.9) 
        }
        i++
    }
}

INPUT.forEach(e=>e.addEventListener("input", calculations));

