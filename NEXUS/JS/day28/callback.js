//call back hell
function placeorder(callback)
{
    console.log("Talking with Domino's");
    setTimeout(() => {
        console.log("Order Placed Successfully");
        callback();
    }, 2000);
}
function prepraying(callback)
{
    console.log("Pizza prepration is started");
    setTimeout(() => {
        console.log("Pizza Prepration Done");
        callback();
    }, 5000);
}
function pickup(callback)
{
    console.log("Delivery Reaching Resturant for pickup the order");
    setTimeout(() => {
        console.log("Order Picked Up by the Delivery Boy");
        callback();
    }, 3000);
}
function Delivery()
{
    console.log("Delivery boy on the Way");
    setTimeout(() => {
        console.log("Order Delivered Succesffuly");
    }, 5000);
}
placeorder(()=>{
    prepraying(()=>{
        pickup(()=>{
            Delivery();
        });
    });
});
// prepraying();
// pickup();
// Delivery();