document.addEventListener("DOMContentLoaded", function(){
    function convert(type){
        let inputValue, conversionType, resultElement, result = "";

        switch (type){

            //  AREA CONVERSIONS
            case "area":
                inputValue = parseFloat(document.getElementById("area-value").value);
                conversionType = document.getElementById("area-converter").value;
                resultElement = document.getElementById("area-result");

                if (conversionType === "acres-to-sqm"){
                    result = (inputValue * 4046.86).toFixed(2) + " Square Meters";
                } 
                else if (conversionType === "sqm-to-acres") {
                    result = (inputValue / 4046.86).toFixed(5) + " Acres";
                } 
                else if (conversionType === "acres-to-Hec") {
                    result = (inputValue * 0.404686).toFixed(5) + " Hectares";
                } 
                else if (conversionType === "Hec-to-acres") {
                    result = (inputValue / 0.404686).toFixed(5) + " Acres";
                } 
                else if (conversionType === "acres-to-sqrfeet") {
                    result = (inputValue * 43560).toFixed(2) + " Square Feet";
                } 
                else if (conversionType === "sqrfeet-to-acres") {
                    result = (inputValue / 43560).toFixed(5) + " Acres";
                }
                break;

            // ✅ LENGTH CONVERSIONS
            case "length":
                inputValue = parseFloat(document.getElementById("length-value").value);
                conversionType = document.getElementById("length-converter").value;
                resultElement = document.getElementById("length-result");

                if (conversionType === "m-to-km") {
                    result = (inputValue / 1000).toFixed(5) + " Kilometers";
                } 
                else if (conversionType === "km-to-m") {
                    result = (inputValue * 1000).toFixed(2) + " Meters";
                } 
                else if (conversionType === "m-to-cm") {
                    result = (inputValue * 100).toFixed(2) + " Centimeters";
                } 
                else if (conversionType === "cm-to-m") {
                    result = (inputValue / 100).toFixed(5) + " Meters";
                } 
                else if (conversionType === "m-to-mm") {
                    result = (inputValue * 1000).toFixed(2) + " Millimeters";
                } 
                else if (conversionType === "mm-to-m") {
                    result = (inputValue / 1000).toFixed(5) + " Meters";
                } 
                else if (conversionType === "m-to-f") {
                    result = (inputValue * 3.28084).toFixed(2) + " Feet";
                } 
                else if (conversionType === "f-to-m") {
                    result = (inputValue / 3.28084).toFixed(5) + " Meters";
                } 
                else if (conversionType === "m-to-y") {
                    result = (inputValue * 1.09361).toFixed(2) + " Yards";
                } 
                else if (conversionType === "y-to-m") {
                    result = (inputValue / 1.09361).toFixed(5) + " Meters";
                } 
                else if (conversionType === "f-to-y") {
                    result = (inputValue / 3).toFixed(5) + " Yards";
                } 
                else if (conversionType === "y-to-f") {
                    result = (inputValue * 3).toFixed(2) + " Feet";
                } 
                else if (conversionType === "km-to-mm") {
                    result = (inputValue * 1_000_000).toFixed(2) + " Millimeters";
                } 
                else if (conversionType === "mm-to-km") {
                    result = (inputValue / 1_000_000).toFixed(6) + " Kilometers";
                }
                break;

            // ✅ TEMPERATURE CONVERSIONS
            case "temp":
                inputValue = parseFloat(document.getElementById("temp-value").value);
                conversionType = document.getElementById("temp-converter").value;
                resultElement = document.getElementById("temp-result");

                if (conversionType === "c-to-f") {
                    result = ((inputValue * 9 / 5) + 32).toFixed(2) + " °F";
                } else if (conversionType === "c-to-k") {
                    result = (inputValue + 273.15).toFixed(2) + " K";
                } else if (conversionType === "f-to-c") {
                    result = ((inputValue - 32) * 5 / 9).toFixed(2) + " °C";
                } else if (conversionType === "f-to-k") {
                    result = (((inputValue - 32) * 5 / 9) + 273.15).toFixed(2) + " K";
                } else if (conversionType === "k-to-c") {
                    result = (inputValue - 273.15).toFixed(2) + " °C";
                } else if (conversionType === "k-to-f") {
                    result = (((inputValue - 273.15) * 9 / 5) + 32).toFixed(2) + " °F";
                }
                break;

            // ✅ VOLUME CONVERSIONS
            case "volume":
                inputValue = parseFloat(document.getElementById("volume-value").value);
                conversionType = document.getElementById("volume-converter").value;
                resultElement = document.getElementById("volume-result");

                if (conversionType === "l-to-ml") {
                    result = (inputValue * 1000).toFixed(2) + " Milliliters";
                } else if (conversionType === "l-to-cubecm") {
                    result = (inputValue * 1000).toFixed(2) + " Cubic Centimeters";
                } else if (conversionType === "l-to-m") {
                    result = (inputValue / 1000).toFixed(5) + " Cubic Meters";
                } else if (conversionType === "l-to-USgl") {
                    result = (inputValue * 0.264172).toFixed(5) + " US Gallons";
                } else if (conversionType === "ml-to-l") {
                    result = (inputValue / 1000).toFixed(5) + " Liters";
                }
                break;

            // ✅ MASS CONVERSIONS
            case "mass":
                inputValue = parseFloat(document.getElementById("mass-value").value);
                conversionType = document.getElementById("mass-converter").value;
                resultElement = document.getElementById("mass-result");

                if (conversionType === "kg-to-g") {
                    result = (inputValue * 1000).toFixed(2) + " Grams";
                } else if (conversionType === "g-to-kg") {
                    result = (inputValue / 1000).toFixed(5) + " Kilograms";
                } else if (conversionType === "kg-to-t") {
                    result = (inputValue / 1000).toFixed(5) + " Tons";
                } else if (conversionType === "kg-to-USt") {
                    result = (inputValue / 907.184).toFixed(5) + " US Tons";
                } else if (conversionType === "kg-to-p") {
                    result = (inputValue * 2.20462).toFixed(2) + " Pounds";
                } else if (conversionType === "g-to-p") {
                    result = (inputValue / 453.592).toFixed(5) + " Pounds";
                }
                break;

            case "data":
                inputValue = parseFloat(document.getElementById("data-value").value);
                conversionType = document.getElementById("data-converter").value;
                resultElement = document.getElementById("data-result");

                if (conversionType === "mb-to-gb") {
                    result = (inputValue / 1024).toFixed(5) + " GB";
                } else if (conversionType === "gb-to-mb") {
                    result = (inputValue * 1024).toFixed(2) + " MB";
                } else if (conversionType === "kb-to-mb") {
                    result = (inputValue / 1024).toFixed(5) + " MB";
                } else if (conversionType === "mb-to-kb") {
                    result = (inputValue * 1024).toFixed(2) + " KB";
                } else if (conversionType === "gb-to-tb") {
                    result = (inputValue / 1024).toFixed(5) + " TB";
                } else if (conversionType === "tb-to-gb") {
                    result = (inputValue * 1024).toFixed(2) + " GB";
                } else if (conversionType === "bit-to-byte") {
                    result = (inputValue / 8).toFixed(5) + " Bytes";
                } else if (conversionType === "byte-to-bit") {
                    result = (inputValue * 8).toFixed(2) + " Bits";
                }
                break;
        }

        if (isNaN(inputValue)) 
        {
            resultElement.textContent = "Result: Please enter a valid number!";
        } else 
        {
            resultElement.textContent = "Result: " + result;
        }
    }

    window.convert = convert;
});
