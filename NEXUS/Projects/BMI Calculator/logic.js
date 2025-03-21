const button=document.querySelector('button');
button.addEventListener('click',()=>{
    const bmiStatus = document.getElementById('status');
    const weight=document.getElementById('weight');
    const kg=Number(weight.value);
    const height=document.getElementById('height');
    const lambayi=Number(height.value);

    //to refresh the height & weight
    setTimeout(() => {
        weight.value = "";
        height.value = "";
    }, 0);


    const meter=lambayi/100;
    if (kg > 0 &&  meter> 0) {
        const result = kg / (meter * meter); 
        const BMI = document.getElementById('result');
        BMI.textContent = "Health: " + result.toFixed(2); 

        let category = "";
        if (result < 18.5) {
            category = "Low (Underweight)";
        } else if (result >= 18.5 && result <= 24.9) {
            category = "Normal (Healthy)";
        } else {
            category = "High (Overweight/Obese)";
        }
        bmiStatus.textContent = "Status: " + category;

    } else {
        alert("Please enter valid weight and height values!");
    }
    

})
const weight=document.getElementById('weight');
weight.addEventListener('keypress',function(event){
    if(event.key==='Enter')
    {
        event.preventDefault(); 
    document.getElementById("height").focus(); 
    }
})
const height=document.getElementById('height');
height.addEventListener('keypress',function(event){
    if(event.key==='Enter')
    {
        event.preventDefault(); 
        document.querySelector('button').focus(); 
    }
})
// document.getElementById("weight").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {  
//         event.preventDefault(); 
//         document.getElementById("height").focus(); 
//     }
// });