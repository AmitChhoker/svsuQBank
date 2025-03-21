// const red=document.getElementById('red');
// const blue=document.getElementById('blue');
// const orange=document.getElementById('orange');
// const green=document.getElementById('green');
// const purple=document.getElementById('purple');
// const body=document.body;

// red.addEventListener('click',()=>{
//     body.style.backgroundColor='red';
// })
// blue.addEventListener('click',()=>{
//     body.style.backgroundColor='blue';
// })
// orange.addEventListener('click',()=>{
//     body.style.backgroundColor='orange';
// })
// green.addEventListener('click',()=>{
//     body.style.backgroundColor='green';
// })
// purple.addEventListener('click',()=>{
//     body.style.backgroundColor='purple';
// })


const buttons=document.querySelectorAll('button');
const body=document.body;

buttons.forEach((button) => {
    button.addEventListener('click',()=>{
        body.style.backgroundColor=button.id;
    })
});