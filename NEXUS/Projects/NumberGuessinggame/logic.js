let guessing_number=Math.floor(Math.random()*100)+1;
const button=document.querySelector('button');
const restartButton=document.getElementById('restart');
const result=document.getElementById('message');
const input=document.getElementById('input');
let attempts=0;
const maxAttempts = 5;

button.addEventListener('click',()=>{
    const number=Number(input.value);   
    
    if(isNaN(number) || number < 1 || number > 100){
        result.textContent = "⛔ Enter a number between 1 and 100!";
        return;
    }
    attempts++;

    //After 5 attempts game is over!
    if (attempts > maxAttempts && number !== guessing_number) {
        result.textContent = `❌ Game Over! The correct number was ${guessing_number}.`;
        button.disabled = true; 
        input.disabled = true; 
        restartButton.style.display = "block";
        return;
    }

    if(number==guessing_number)
    {
        result.textContent=`🎉 You Guessed Right in ${attempts} attempts!`;
        button.disabled = true;
        input.disabled = true;
        restartButton.style.display = "block";
    }
    else{
        let difference = Math.abs(number - guessing_number);

        if (difference <= 10){
            result.textContent = `🔥 You're close! (Attempts: ${attempts})`;
        } 
        else{
            result.textContent = `❄ Way off! (Attempts: ${attempts})`;
        }

        if (number > guessing_number){
            result.textContent += " 📈 Too High!";
        } 
        else{
            result.textContent += " 📉 Too Low!";
        }
    }

});

restartButton.addEventListener("click", () => {
    guessing_number = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    result.textContent = "";
    input.value = "";
    input.disabled = false;
    button.disabled = false;
    restartButton.style.display = "none";
});