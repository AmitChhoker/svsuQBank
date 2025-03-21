// // **************Date******************* */
// const date=new Date();
// console.log(typeof(date));
// console.log(date.toString()); // to get the absolute date and time
// console.log(date.toDateString()); //tp get the data only
// console.log(date.getDay());
// console.log(date.getDate());
// console.log(date.getHours());
// *****Birthday Countdown****** */
// const BirthdatDate=new Date("2026-01-09");
// const CurrentDate=new Date();
// const date=BirthdatDate-CurrentDate;
// const days=Math.floor(date/(1000*60*60*24));
// const Hours=Math.floor(date/(1000*60*60));
// console.log(Hours);
// console.log(days);


// // ################################Array#######################################
// const arr=[2,3,4,5,8,7];
// console.log(arr.length)
// arr.push(10);//to add at last
// arr.pop(10);//to delete from last
// arr.unshift(10);//to add at starting
// console.log(arr);

// console.log(arr.slice(2,4)); //cut the all array except this two cordinates
// console.log(arr.splice(2,3)); //give the elements from index to next index

// console.log(arr.toString());

//  ******Join the two arrays****** */
//  const arr1=[2,3,4,5,8,7];
//  const arr2=[6,4,9,1,3,7];
//  const arr3=arr1.concat(arr2);
//  console.log(arr3);


// 2D & 3D ARRAY
// let arr=[[3,2,1],[4,5,[3,2]],[1,2,8]];
// console.log(arr[1][2][1]);


// ######################Object##############################

const obj={
    name:"Amit",
    roll:3,
    age:20,
    gender:"Male"
}

//object creation using class
// console.log(typeof(obj));

// const obj=new Object();
// obj.name="Amit";

// class people
// {
//     constructor(name,age)
//     {
//         this.name=name;
//         this.age=age;
//     }
// }
// let peo=new people("Amit",20);
// console.log(peo);
// const arr=Object.keys(obj)
// console.log(arr);

//*****Shallow Copy of object******* */
//Definition:- it not make the different one copy of a obj the copy is addresed the original copy
// let obj1=obj;
// obj1.name="Rohit Negi";
// console.log(obj);
// console.log(obj1);

//*****Deep Copy of obj****** */
//Definition:- it make the different new copy of object
let obj1=structuredClone(obj);
obj1.name="Rohit Ne gi";
console.log(obj1);


