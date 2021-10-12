window.localStorage

/*DECLARE ALL VARIABLES*/

let target = document.getElementById("score");
let income = document.getElementById('income');
let multiPrice = document.getElementById("multiply1price");

pint=parseInt(localStorage.getItem("pint"));
let interval1;
let interval2;
score = parseInt(localStorage.getItem("score"));
price1 = parseInt(localStorage.getItem("price1"));
priceAuto1 = parseInt(localStorage.getItem("priceAuto1"));
priceBoost1 = parseInt(localStorage.getItem("priceBoost1"));
multiCounter = parseInt(localStorage.getItem("multiCounter")) ;
autoCounter = parseInt(localStorage.getItem("autoCounter"));
boostCounter = parseInt(localStorage.getItem("boostCounter"));

if (typeof(score)!="number") {
    score = 0;
}
if (typeof(pint)!="number") {
    pint = 1;
}
if (typeof(price1)!="number") {
    price1 = 100;
}
if (typeof(priceAuto1)!="number") {
    priceAuto1 = 25;
}
if (typeof(priceBoost1)!="number") {
    priceBoost1 = 1000;
}
if (typeof(multiCounter)!="number") {
    multiCounter = 0;
}
if (typeof(autoCounter)!="number") {
    autoCounter = 0;
}
if (typeof(boostCounter)!="number") {
    boostCounter = 0;
}

checkValues();
autoClicker();


//defining the score
let boost = 1;
pint *= boost;


target.innerText = score;
income.innerText = pint;
multiPrice.innerText = price1;


document.getElementById('multiCounter').innerText = multiCounter;
document.getElementById('autoclick1price').innerText = priceAuto1;
document.getElementById('autoCounter').innerText = autoCounter;
document.getElementById('priceBoost1').innerText = priceBoost1;
document.getElementById('boostCounter').innerText = boostCounter;

checkValues();
//iClick: werkt!
//the event listener for clicking the button
document.getElementById("click").addEventListener("click", function() {
    //the addition of value to the
    score += pint;
    target.innerText = score;
    checkValues();
    storeSet();
});

//iMultiply: defining the multiplier function
document.getElementById("multiply1").addEventListener("click", function() {
    //adding requirement multiplier

    if (score>=price1) {
        //reducing score value with price.
        score -= price1;
        //displaying the reduction as well.
        target.innerText = score;
        //how many times has the multiplier been used.
        multiCounter++;
        //multiplying the price of the beer
        pint *= 2;
        //multiplying the price increase of the multiplier
        price1 *= multiCounter+1;
        //visualising
        document.getElementById("multiply1price").innerText = price1;
        income.innerText = pint;
        document.getElementById('multiCounter').innerText = multiCounter;
        //checking values for button disables
        storeSet();
        checkValues();
    }

});

//defining initial price value of multiplier
document.getElementById("autoclick1").addEventListener("click",function() {
    console.log("a")
    if (score >= priceAuto1) {
        autoCounter++;
        storeSet();
        document.getElementById('autoCounter').innerText = autoCounter;
        score -= priceAuto1;
        priceAuto1 *= autoCounter + 1;
        document.getElementById('autoclick1price').innerText = priceAuto1;
        target.innerText = score;
        interval2 = setInterval(function iAutoClick() {
            score += pint;
            target.innerText = score;
            storeSet();
            checkValues();
        }, 2000)
    }
//checking values for button disables
    checkValues();

})

// Booster:

document.getElementById("boost1").addEventListener("click", function (){
    if (score >= priceBoost1){
        boostCounter++;
        document.getElementById('boostCounter').innerText = boostCounter;
        score-=priceBoost1;
        target.innerText = score;
        priceBoost1 *= boostCounter+1;
        document.getElementById('priceBoost1').innerText = priceBoost1;
        let timer=0;
        document.getElementById("boost1").setAttribute("disabled", "");
        console.log("a");
        boost = 2;
        pint *= boost;
        interval1 = setInterval(function () {
            timer++;
            document.getElementById('timer').innerText = 30 - timer + ' sec';
            income.style.color = "darkred";
            income.innerText = pint;
            storeSet();
            if (timer === 30) {
                boost = 1;
                pint *= boost / 2;
                document.getElementById("boost1").removeAttribute("disabled");
                income.style.color = "#333333";
                income.innerText = pint;
                document.getElementById('timer').innerText = '0 sec';
                storeSet();
                checkValues();
                clearInterval(interval1)
            }
        }, 1000)
    }
    //checking values for button disables
    storeSet();
    checkValues();
})


 /*REUSABLE FUNCTIONS*/

function checkValues() {
    if (score>=price1) {
        document.getElementById('multiply1').removeAttribute("disabled");
    } else {
        document.getElementById('multiply1').setAttribute("disabled", true);
    }
    if (score>=priceAuto1){
        document.getElementById('autoclick1').removeAttribute("disabled");
    } else {
        document.getElementById('autoclick1').setAttribute("disabled", true);
    }
    if (score>=priceBoost1) {
        document.getElementById('boost1').removeAttribute("disabled");
    } else {
        document.getElementById('boost1').setAttribute("disabled", true);
    }
}

function storeSet() {
    localStorage.setItem("score", score);
    localStorage.setItem("pint", pint);
    localStorage.setItem("price1", price1);
    localStorage.setItem("priceAuto1", priceAuto1);
    localStorage.setItem("priceBoost1", priceBoost1);
    localStorage.setItem("multiCounter", multiCounter);
    localStorage.setItem("autoCounter", autoCounter);
    localStorage.setItem("boostCounter", boostCounter);
}

function autoClicker() {
    if (autoCounter>0){
        interval2 = setInterval(function iAutoClick() {
            score += pint*autoCounter;
            target.innerText = score;
            storeSet();
            checkValues();
        }, 5000)
    }
}

/*RESET*/

document.getElementById('reset').addEventListener('click',function(){
    pint = 1;
    score = 0;
    price1 = 100;
    priceAuto1 = 25;
    priceBoost1 = 1000;
    multiCounter = 0;
    autoCounter = 0;
    boostCounter = 0;
    clearInterval(interval2);
    storeSet();
    target.innerText = score;
    income.innerText = pint;
    multiPrice.innerText = price1;

    document.getElementById('multiCounter').innerText = multiCounter;
    document.getElementById('autoclick1price').innerText = priceAuto1;
    document.getElementById('autoCounter').innerText = autoCounter;
    document.getElementById('priceBoost1').innerText = priceBoost1;
    document.getElementById('boostCounter').innerText = boostCounter;
    checkValues();
})