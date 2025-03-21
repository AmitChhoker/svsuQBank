const quotes = [
    "The secret of getting ahead is getting started. – Mark Twain",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Opportunities don't happen. You create them. – Chris Grosser",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Your limitation—it's only your imagination. – Unknown",
    "Push yourself, because no one else is going to do it for you. – Unknown",
    "Difficulties in life are intended to make us better, not bitter. – Dan Reeves",
    "The best way to predict the future is to create it. – Peter Drucker",
    "If opportunity doesn’t knock, build a door. – Milton Berle",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
    "Don't be afraid to give up the good to go for the great. – John D. Rockefeller",
    "Failure is the opportunity to begin again more intelligently. – Henry Ford",
    "Dream big and dare to fail. – Norman Vaughan",
    "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
    "Do something today that your future self will thank you for. – Sean Patrick Flanery",
    "Stay hungry, stay foolish. – Steve Jobs"
];

console.log(quotes);

// function generate()
// {
//     const text=document.getElementById('quotes');
//     const index=Math.floor(Math.random()*quotes.length);
//     text.innerHTML=quotes[index];
// }

// setInterval(generate,3000);


//****************Click on Button******************** */
// const button=document.querySelector('button');
// button.addEventListener('click',()=>{
//     const text=document.getElementById('quotes');
//     const index=Math.floor(Math.random()*quotes.length);
//     text.innerHTML=quotes[index];
// })



//**************key down click any key from keyboard for the change****************** */
// document.addEventListener('keydown',(event)=>{
//     if(event.key=="Enter"){
//     const text=document.getElementById('quotes');
//     const index=Math.floor(Math.random()*quotes.length);
//     text.textContent=quotes[index];
//     }
// })






const button=document.querySelector('button');
button.addEventListener('click',(event)=>{
    console.log(event.type);
    console.log(event.clientX);
    console.log(event.clientY);
    const text=document.getElementById('quotes');
    const index=Math.floor(Math.random()*quotes.length);
    text.textContent=quotes[index];
})


//****************************** */
// document.addEventListener('keydown',()=>{
//     const text=document.getElementById('quotes');
//     const index=Math.floor(Math.random()*quotes.length);
//     text.textContent=quotes[index];
// })

const colors=[
    "linear-gradient(to right,rgb(17, 44, 94), #2a5298)",  // Dark Blue
    "linear-gradient(to right,rgb(238, 93, 57), #feb47b)",  // Warm Sunset
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
// let index=0;
function changecolor(){
    
    const index=Math.floor(Math.random()*colors.length);
    document.body.style.background=colors[index];   
}
setInterval(changecolor,2000);


