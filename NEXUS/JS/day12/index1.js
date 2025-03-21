// let count=0;
// function fun()
// {
//     console.log("aur sunao"); 
//     console.log("Hello coder army");
//     console.log("Aur sunao ki hal chal");
//     count++;
// }
// console.log(count);
// fun();
// fun();
// fun();
// fun();
// function ADD(a, b)
// {
//     console.log(a+b);
// }
// ADD(10,20);

//multiplication


// function calculator(a,b)
// {
//     console.log(a+b);
//     console.log(a-b);
//     console.log(a*b);
//     console.log(a/b);
// }
// calculator(20,30);

//Arroe function
// const fun=(a,b)=>a+b;
// console.log(fun(10,20));


//find the cube of any number
// const cube=function(number)
// {
//     console.log(number*number*number);
// }
// cube(3);
// const cube=(num)=>num*num*num;
// console.log(cube(3));

//square 
// function sqr(num)
// {
//     return num*num;
// }
// console.log(sqr(3));

// const sqr=num=>num*num;
// console.log(sqr(4));

// const sum=function(...number)
// {
//     console.log(number);
// }
// sum(2,3,4);
// sum(2,3,5,7,8,32,12,1,1);

// const obj={
//     name:"Rohit",
//     amount:420,
//     roll:3,
//     class:"12th",
//     age:12
// }
// const {name,age}=obj;
// console.log(name,age);


// function fun({name,age})
// {
//     console.log(name,age);
// }
// fun(obj);


//to check function call by value and call by reference
// const fun=function(number)
// {
//     number=20; 
//     console.log(number);
//     console.log(a);
// }
// let a=10;
// fun(a);

const obj={
    name:"amit",
    roll:3,
    class:"12th",
    state:"haryana",
    money:200
}
function fun(new_obj)
{
    new_obj.name="Rohit"
}

fun(obj);
// console.log(new_obj.name);
console.log(obj.name);

// console.log(obj.name);