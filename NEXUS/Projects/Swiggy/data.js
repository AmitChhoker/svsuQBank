const restaurant=[];
const images=['First','second','third','fourth','fifth','sixth','seventh','Eight','nine','tenth'];
const rest_name = [
    "Swagath Spice",
    "Saffron Biryani House",
    "Taste of Punjab",
    "Mughlai Mahal",
    "Delhi Darbar",
    "Udupi Sagar",
    "The South Indian Café",
    "Chaat Junction",
    "Bikaner Bhavan",
    "The Grand Thali",
    "Dosa Delight",
    "Amritsari Zaika",
    "Banarasi Bhojanalay",
    "Kolkata Roll Corner",
    "Tandoori Nights",
    "Royal Rajasthani Rasoi",
    "Malabar Spice Hub",
    "Lucknowi Kebab House",
    "Hyderabadi Biryani Point",
    "Gujarati Rasoi"
];
const food_types = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Street Food",
    "Fast Food",
    "Desserts",
    "Seafood",
    "Organic",
    "Traditional Indian"
];
const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow"
];

for(let i=0;i<100;i++)
{
    const obj={};
    obj["image"] = images[Math.floor(Math.random()*10)];
    obj["name"]=rest_name[Math.floor(Math.random()*20)]
    obj['rating']=Math.floor(Math.random()*5+1);
    obj["food_type"]=food_types[Math.floor(Math.random()*10)];
    obj['Price_for_two']=Math.floor(Math.random()*2401+100);
    obj['locations']=locations[Math.floor(Math.random()*10)];
    obj['distance']=(Math.random()*10+1).toFixed(1);
    obj['offers']=Math.floor(Math.random()*30);
    obj['alcholol']=Math.random()>0.7;
    obj['restaurant_opening_time']=Math.floor(Math.random()*24);
    obj['restaurant_Closing_time']=(obj['restaurant_opening_time']+12)%24;

    restaurant.push(obj);
}
console.log(restaurant);

// const jsonData = JSON.stringify(restaurant, null, 2); // Pretty format with indentation
// console.log(jsonData);

const fs = require("fs");

const jsonData = JSON.stringify(restaurant, null, 2); // Convert to JSON format

fs.writeFile("restaurants.json", jsonData, (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("JSON file has been saved successfully!");
    }
});
//array convert into json(hw);