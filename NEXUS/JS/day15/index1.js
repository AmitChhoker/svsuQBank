// let user={
//     name:"Amit",
//     age:30
// }

// Object.defineProperty(user,"name",{
//     writable:false,
// })
// console.log(Object.getOwnPropertyDescriptor(user,"name"));


//for of loop
// let arr=[10,20,30,40,50];
// for(let value of arr)
// {
//     console.log(value);
// }

// let str="Rohit Bhaiya bhut Ache hai";
// for(let value of str)
// {
//     console.log(value);
// }

// const obj={
//     name:"amit",
//     clss:12,
//     roll:12
// }
// for(let i of Object.values(obj))
// {
//     console.log(i);
// }

//call back function
// function names(fun,fun1)
// {
//     console.log("Hello i am amit");
//     fun(); 
//     fun1();
// }
// const greet=(()=>
// {
//     console.log("I am call back function");
// })
// const agree=function()
// {
//     console.log("Hello Coder Army");
// }^// names(greet,agree);

// function fetchdata(){
//     console.log("I am function");
// }
// setInterval(fetchdata,500);
 
// let arr=[10,20,30,40];
// arr.forEach((num,index,a)=>{
//     a[index]=num+2;
// })
// console.log(arr);

// let arr=[10,11,20,21,30,31,40,41];
// const result=arr.filter((num)=>num%2==0)
// console.log(result);

// const students=[
//     {name:"Rohan",age:22,marks:70},
//     {name:"Sahil",age:25,marks:78},
//     {name:"Kapil",age:21,marks:66},
//     {name:"Sohan",age:20,marks:30},
//     {name:"Mohan",age:29,marks:80},
// ];

// const result=students.filter((obj)=>obj.marks>50);
// console.log(result);


// for(let i=0;i<students.length;i++)
// {
//     if(students.value.marks>30)
//     {
//         console.log("yes");
//     }
//     else
//     {
//         console.log("no");
//     }
// }
// console.log(students);

// const arr=[3,1,2,5,4];
// const r=arr.filter((num)=>(num%2==0)).map((num)=>num*num);
// console.log(r);

const obj={
    name:"Amit",
    age:12,
    gender:"male", 
    class:"B.Tech CE"
}
Object.defineProperty(obj,"age",{
    enumerable:false,
})
console.log(obj);
