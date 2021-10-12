/*DECLARE AND DISABLE BUTTONS*/
let buttons = document.getElementsByTagName("button");
console.log(buttons);

for (i=0; i<buttons.length;i++) {
    var button = buttons[i];
    if(button.id !=="reset"){
        button.setAttribute("disabled", true);
    }

}


//defining variables on top
//Defining first value of the clicker
let pint = 1;
let boost = 1
pint *= boost;
document.getElementById("income").innerText = pint;
document.getElementById("multiplier1").innerText = '2';
//defining the score
let target = document.getElementById("score");
let interval;
let score = 0;
let multiCounter = 0;
let autoCounter = 0;
let boostCounter = 0;
let price1 = 100;
let priceAuto1 = 25;
let boost1Price = 1000;


checkValues();
//iClick: werkt!
//the event listener for clicking the button
document.getElementById("click").addEventListener("click", function() {
    //the addition of value to the

    score += pint;
    target.innerText = score;
    checkValues();
});

//iMultiply: defining the multiplier function
document.getElementById("multiply1").addEventListener("click", function() {
    //adding requirement multiplier
    console.log("a")

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
        document.getElementById("income").innerText = pint;
        //checking values for button disables
        checkValues();
    }

});

//defining initial price value of multiplier
document.getElementById("autoclick1").addEventListener("click",function() {
    console.log("a")
    if (score >= priceAuto1) {
        autoCounter++;
        score -= priceAuto1;
        priceAuto1 *= autoCounter + 1;
        document.getElementById('autoclick1price').innerText = priceAuto1;
        target.innerText = score;
        setInterval(function iAutoClick() {
            score += pint;
            target.innerText = score;
            checkValues();
        }, 2000)
    }
//checking values for button disables
    checkValues();

})

// Booster:

document.getElementById("boost1").addEventListener("click", function (){
    if (score >= boost1Price){
        boostCounter++;
        score-=boost1Price;
        target.innerText = score;
        boost1Price *= boostCounter+1;
        document.getElementById('boost1price').innerText = boost1Price;
        let timer=0;
        document.getElementById("boost1").setAttribute("disabled", "");
        console.log("a");
        boost = 2;
        pint *= boost;
        interval = setInterval(function () {
            timer++;
            document.getElementById('timer').innerText = 30 - timer + ' sec';
            document.getElementById("timer").innerText = 30 - timer + " s";
            document.getElementById("income").style.color = "darkred";
            document.getElementById("income").innerText = pint;
            console.log(timer);
            if (timer === 30) {
                boost = 1;
                pint *= boost / 2;
                document.getElementById("boost1").removeAttribute("disabled", "");
                document.getElementById("income").style.color = "#333333";
                document.getElementById("income").innerText = pint;
                checkValues();
                clearInterval(interval)
            }
        }, 1000)
    }
    //checking values for button disables
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
    if (score>=boost1Price) {
        document.getElementById('boost1').removeAttribute("disabled");
    } else {
        document.getElementById('boost1').setAttribute("disabled", true);
    }
}