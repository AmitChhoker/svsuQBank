const user={
    name:"amit",
    roll:20,
    arr:[2,1,4,5,2],
    fun: function()
    {
        console.log("Hello coder Army");
    },
    address:{
        pincode:121102,
        city:"palwal"
    }
};
user.fun();


const {arr: [first,second]}=user;
console.log(first,second);

// const {address:{pincode}}=user;
// console.log(pincode);
// console.log(user.address.pincode);
// const copy1=user;
// console.log(copy1);


// const copy=structuredClone(user); //create copy
// copy.name="Rohit"; 
// copy.address.pincode=122210;
// console.log(user);