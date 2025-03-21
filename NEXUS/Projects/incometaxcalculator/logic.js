const button = document.querySelector('button');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const input = document.getElementById('input');
    const number = Number(input.value);

    if (isNaN(number) || number < 0) 
    {
        alert("Please enter a valid positive number.");
        return;
    }
    if(number<1200000)
    {
        alert("Your are Safe! Not in range.")
    }

    let tax = 0;
    if (number >= 1200000) { 
        tax = (number * 30) / 100;
    }

    const result1 = document.getElementById('result');  
    result1.textContent = "Tax Deducted: ₹" + tax;
});
