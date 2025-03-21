const targetDate=new Date("2028-07-14T00:00").getTime();
function countDown(targetDate)
{
    function updateTime()
    {
        const now=new Date();
        const left=targetDate-now;
        if(left<0)
        {
            document.getElementById('days').innerText="0";
            document.getElementById('hours').innerText="0";
            document.getElementById('minutes').innerText="0";
            document.getElementById('second').innerText="0";
            return;
        }
        const days=Math.floor(left/(1000*60*60*24));
        const hours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((left % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    }
    updateTime();
    setInterval(updateTime,1000);
}
countDown(targetDate);

const colors=[
    "linear-gradient(to right, #1e3c72, #2a5298)",  // Dark Blue
    "linear-gradient(to right, #ff7e5f, #feb47b)",  // Warm Sunset
    "linear-gradient(to right, #00c6ff, #0072ff)",  // Light Blue
    "linear-gradient(to right, #ff6a00, #ee0979)",  // Red-Orange
    "linear-gradient(to right, #8e44ad, #2c3e50)",  // Purple Dark
    "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",  // Blue-Pink
    "linear-gradient(to right, #ff9966, #ff5e62)",  // Peach-Red
    "linear-gradient(to right, #00b09b, #96c93d)",  // Green-Teal
    "linear-gradient(to right, #fc4a1a, #f7b733)",  // Orange-Yellow
    "linear-gradient(to right, #36d1dc, #5b86e5)",  // Light Aqua-Blue
    "linear-gradient(to right, #ff5f6d, #ffc371)",  // Soft Red-Yellow
    "linear-gradient(to right, #c31432, #240b36)",  // Deep Red-Purple
    "linear-gradient(to right, #16222a, #3a6073)",  // Navy-Dark
    "linear-gradient(to right, #56ab2f, #a8e063)",  // Green Shades
    "linear-gradient(to right, #373b44, #4286f4)"   // Gray-Blue
];
let index=0;
function changecolor()
{
document.body.style.background=colors[index];
index=(index+1) % colors.length;
}
setInterval(changecolor,5000);
