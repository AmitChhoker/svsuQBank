document.addEventListener('DOMContentLoaded',()=>{
    let countdownTimer;
    let isRunning = false;
    let timeRemaining;

    const timerDisplay = document.getElementById("timer"); //00:00
    const startBtn = document.getElementById("startBtn");  //start button
    const pauseBtn = document.getElementById("pauseBtn");  //pause button
    const resetBtn = document.getElementById("resetBtn");  //reset button
    const minutesInput = document.getElementById("minutesInput");   //minutes
    const secondsInput = document.getElementById("secondsInput");   //seconds

    function updateDisplay(time){
        const minutes=Math.floor(time/60);  //minutes lali
        const seconds=time%60;              //seconds lali
        timerDisplay.textContent=`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    startBtn.addEventListener("click",()=>{
        if(isRunning)
            return;

        let minutes=parseInt(minutesInput.value) || 0;
        let seconds = parseInt(secondsInput.value) || 0;

        timeRemaining=minutes*60+seconds;

        if(timeRemaining<=0)
        {
            alert("Please Set the Time First!");
            return;
        }
        isRunning=true;
        startBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
        
        countdownTimer=setInterval(()=>{
            if(timeRemaining<=0)
            {
                clearInterval(countdownTimer);
                isRunning = false;
                startBtn.classList.remove("hidden");
                pauseBtn.classList.add("hidden");
                alert("Time's up!");
                return;
            }
            timeRemaining--;
            updateDisplay(timeRemaining);
        },1000);
    });

    //pause kr do
    pauseBtn.addEventListener("click", ()=>{
        clearInterval(countdownTimer);
        isRunning = false;
        startBtn.classList.remove("hidden");
        pauseBtn.classList.add("hidden");
    });

    //reset kr do
    resetBtn.addEventListener("click",()=>{
        clearInterval(countdownTimer);
        isRunning = false;
        startBtn.classList.remove("hidden");
        pauseBtn.classList.add("hidden");
        updateDisplay(0);
        minutesInput.value = "";
        secondsInput.value = "";
    });

    updateDisplay(0);


})
