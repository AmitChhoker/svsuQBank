document.body.addEventListener('click',(event)=>{
    const circle=document.createElement('div');
    circle.className='circle';
    circle.textContent="Hii";

    const x=event.clientX;
    const y=event.clientY;
    circle.style.left=`${x-25}px`;
    circle.style.top=`${y-25}px`

    const color = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Cyan", "Magenta", "Lime", "Teal", "Indigo", "Violet", "Maroon", "Gold", "Silver"];
    circle.style.backgroundColor=color[Math.floor(Math.random()*color.length)];

    const msg = ["Hi", "Hello", "Hey", "Yo", "Sup", "Chill", "Cool", "Nice", "Great", "Fun", "Enjoy", "Cheers", "Relax", "Smile", "Boom", "Bravo", "Perfect", "Wow", "Shine", "Peace"];
    circle.textContent=msg[Math.floor(Math.random()*msg.length)];

    document.body.appendChild(circle);
    setTimeout(()=>{
        circle.remove();

    },5000);
})