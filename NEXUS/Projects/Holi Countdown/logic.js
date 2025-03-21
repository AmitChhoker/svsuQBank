const targetDate=new Date("2025-03-14T00:00").getTime();
function startCountdown(targetDate)
{
    function updateCountdown()
    {
        const now=new Date().getTime();
        const timeLeft=targetDate-now;
        if(timeLeft<0)
        {
            document.getElementById("days").innerText = "0";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}
startCountdown(targetDate);