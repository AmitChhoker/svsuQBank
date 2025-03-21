// let obj={
//     name:"amit",
//     roll:3,
//     gender:"male"
// }
// // for(let key in obj)
// // {
// //     console.log(key,obj[key]);
// // }
// // let obj2=Object.create(obj)
// // obj2.age=12;
// // obj2.balance=1000;
// // // console.log(Object.keys(obj2));

// // for(let key in obj2)
// // {
// //     console.log(key);
// // }


// Object.defineProperty(obj,'name',{
//     writable:false,
//     enumerable:true,
//     configurable:true,
// })
// obj.name="Kapil";
// console.log(obj);

// const obj={
//     name:"Amit",
//     age:13,
//     acc_num:348329
// }
// Object.defineProperty(obj,'acc_num',{
//     writable:false,
// })
// obj.acc_num=12;
// console.log(obj);

const customer={
    name:"Amit",
    age:12,
    acc_num:123,
    balance:2000
}

const customer1=Object.create(customer);
customer1.gender="male";
customer1.city="Palwal";
Object.defineProperty(customer,"name",{
    enumerable:false,
})
for(let key in customer1)
    {
        console.log(key);
    }
// customer.name="Ramesh";
// console.log(customer);
