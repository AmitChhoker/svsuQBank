// //call back hell
// cart=['pizza','coke','samosa','sandwich','ladoo'];

// function placeorder(cart,callback)
// {
//     console.log("Talking with Domino's");
//     setTimeout(() => {
//         console.log("Order Placed Successfully");
//         const order={orderId:221, food: cart, restaurant: 'dominos',location:'dwarka'};
//         callback(order);
//     }, 2000);
// }
// function prepraying(order,callback)
// {
//     console.log("Pizza prepration is started");
//     setTimeout(() => {
//         console.log("Pizza Prepration Done");
//         const foodDetails={token: 12, restaurant: order.restaurant, location: order.location};
//         callback(foodDetails);
//     }, 5000);
// }
// function pickup(foodDetails,callback)
// {
//     console.log("Delivery Reaching Resturant for pickup the order");
//     setTimeout(() => {
//         console.log("Order Picked Up by the Delivery Boy");
//         const droplocation=foodDetails.location;
//         callback(droplocation);
//     }, 3000);
// }
// function Delivery(droplocation)
// {
//     console.log("Delivery boy on the Way");
//     setTimeout(() => {
//         console.log("Order Delivered Succesffuly");
//     }, 5000);
// }
// placeorder(cart,(order)=>{
//     prepraying(order,(foodDetails)=>{
//         pickup(foodDetails,(droplocation)=>{
//             Delivery(droplocation);
//         });
//     });
// });



//********************By Promisses*********************** */

cart=['pizza','coke','samosa','sandwich','ladoo'];

function placeorder(cart)
{
    console.log("Talking with Domino's");

    const pr=new Promise(function(resolve,reject){
        setTimeout(() => {

            const food_avaliable=true;
            if(food_avaliable){
            console.log("Order Placed Successfully");
            const order={orderId:221, food: cart, restaurant: 'dominos',location:'dwarka'};
            resolve(order);
            }
            else
            {
                reject("Items Out of Stocks!");
            }
        }, 2000);
    });

    return pr;
}

function prepraying(order)
{
    console.log("Order prepration is started");

    const pr=new Promise(function(resolve,reject){
    setTimeout(() => {
        console.log("Order Prepration Done");
        const foodDetails={token: 12, restaurant: order.restaurant, location: order.location};
        resolve(foodDetails);
        }, 5000);
    })
    return pr;
}

function pickup(foodDetails)
{
    console.log("Delivery Reaching Resturant for pickup the order");

    const pr=new Promise(function(resolve,reject){
    setTimeout(() => {
        console.log("Order Picked Up by the Delivery Boy");
        const droplocation=foodDetails.location;
        resolve(droplocation);
        }, 3000);
    })
    return pr;
}

function Delivery(droplocation)
{
    console.log("Delivery boy on the Way");
    setTimeout(() => {
        console.log("Order Delivered Succesffuly");
    }, 5000);
}

placeorder(cart)
.then((order)=>prepraying(order))
.then((foodDetails)=>pickup(foodDetails))
.then((droplocation)=>Delivery(droplocation))
.catch((error)=>console.log(error));

// pr
// epraying();
// pickup();
// Delivery();

