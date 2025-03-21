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


function test1()
{
    const p1= new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("first Promise Resolve");
        }, 2000);
    })
    return p1;
}

function test2()
{
    const p2= new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("Second Promise Resolve");
        }, 2000);
    })
    return p2;
}

//***********Resolve by Function************* */
async function amit() {
    const data=await test1();
    console.log(data);

    const data1=await test2();
    console.log(data1);
}
amit();



// p1.then(value=>console.log(value));
// p2.then(value=>console.log(value));



// p1.then((Response)=>console.log(Response));
// // async function greet() {
// //     const order= await placeorder(cart);
// //     const foodDetails=await prepraying(order);
// //     const droplocation=await pickup(foodDetails);
// //     Delivery(droplocation);
// // }

// greet();

// placeorder(cart)
// .then((order)=>prepraying(order))
// .then((foodDetails)=>pickup(foodDetails))
// .then((droplocation)=>Delivery(droplocation))
// .catch((error)=>console.log(error));




// const p=new Promise(function(resolve,reject){
//     setTimeout(() => {
//         resolve('Hello COder Army');
//     }, 2000);
// })
// .then(value=>console.log(value))