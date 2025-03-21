let resultDisplayed = false;
function appendValue(value) {
    document.getElementById('display').value+=value;
    document.getElementById('display').value-+value;
    document.getElementById('display').value*+value;
    document.getElementById('display').value/+value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (error) {
        alert('Invalid Expression');
    }
}
function squareRoot()
{
    let value= document.getElementById('display').value;
    document.getElementById('display').value = Math.sqrt(parseFloat(value));
}
function percentage() 
{
    let value = document.getElementById('display').value;
    document.getElementById('display').value = parseFloat(value) / 100;
}
// function power() 
// {
//     let value = document.getElementById('display').value;
//     document.getElementById('display').value += '**';
// }
function factorial()
{
    let value = parseInt(document.getElementById('display').value);
    let fact = 1;
    for (let i = 1; i <= value; i++) {
        fact *= i;
    }
    document.getElementById('display').value = fact;
}
function power() 
{
    let value = document.getElementById('display').value;
    document.getElementById('display').value += '**';
}


