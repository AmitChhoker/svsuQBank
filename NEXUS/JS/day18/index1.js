//  console.log(Math.floor(Math.random()*(11)+10));
//  let a=100;
//  console.log(a);
//  console.log(this==window);
// "use strict"
// function fun()
// {
//     console.log(this);
// }
// fun();
// "use strict";
// a=10;
// console.log(a);

// "use strict"
// const obj={
//     name:"amit"
// }
// Object.freeze(obj);
// obj.name=30;
// console.log(obj);

// const obj={
//     name:"amit", 
//     age:20,
//     greet: function(){
//         console.log(this.name);
//     }
// }
// obj.greet();

// let obj={
//     name:"Amit",
//     age:10,
//     greet: function(){
//         let ab=()=>{
//             console.log(this);
//         };
//         ab();
//     }
// }
// obj.greet();

// class person
// {
//     constructor(name,age)
//     {
//         this.name=name;
//         this.age=age;
//     }
// }
// let a=new person("Rohit",20);
// console.log(a);
// const obj=new Object();
// obj.name="Amit";
// obj.age=10;
// console.log(obj);

// let greet=()=>{
//     console.log(this);
// }
// greet();

"use strict"
function meet()
{
    console.log(this);
}
meet();