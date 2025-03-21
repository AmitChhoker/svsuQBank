const button=document.querySelector('button');
button.addEventListener('click',()=>{
    const number=document.getElementById('number').value;
    const conversionType = document.getElementById("converter").value;

    // setTimeout(() => {
    //     number.value = "";
    // }, 0);

    if (!conversionType) {
        alert("Please choose a conversion type!");
        return;
    }


    if (isNaN(number)) {
        result = "Please enter a number!";
    }
    else
    {
        switch (conversionType) 
        {
            case "kg-to-g":
                result = number * 1000 + " g";
                break;
            case "g-to-kg":
                result = number / 1000 + " kg";
                break;
            case "m-to-cm":
                result = number * 100 + " cm";
                break;
            case "cm-to-m":
                result = number / 100 + " m";
                break;
            case "mm-to-m":
                result = number / 1000 + " m";
                break;
            case "m-to-mm":
                result = number * 1000 + " mm";
                break;
            default:
                result = "Invalid Conversion";
        }
    }
    document.getElementById("result").textContent = result;

    setTimeout(resetForm, 3000);
    function resetForm() {
        // document.getElementById("converter").value = "";
        document.getElementById("number").value = "";
        // document.getElementById("result").textContent = "-";
    }
})