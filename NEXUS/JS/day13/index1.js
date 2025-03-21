// let age=49;
// if(age<18)
// {
//     console.log("kid");
// }
// else if(age>18 && age<48)
// {
//     console.log("jawan");
// }
// else
// {
//     console.log("budha")
// }
// let num=3;
// const new1=new Date();
// switch(new1.getDay())
// {
//     case 0:
//         console.log("Sunday");
//         break;
//     case 1:
//         console.log("Monday");
//         break;
//     case 2:
//         console.log("tuesday");
//         break;
//     case 3:
//         console.log("Wednesday");
//         break;
//     case 4:
//         console.log("Thursday");
//         break;
//     case 5:
//         console.log("Friday");
//         break;
//     case 6:
//         console.log("Saturday");
//         break;
//     default:
//         console.log("Invalid Day!");
// }

// let sum=0; //sum of n natural numbers
// for(let i=1;i<10;i++)
// {
//     sum+=i
// }
// console.log(sum);



//selection sort
// const arr=[5,4,3,2,1];
// for(let i=0;i<arr.length;i++)
// {
//     let index=i;
//     for(let j=i;j<arr.length;j++)
//     {
//         if(arr[j]<arr[index])
//         {
//             index=j;
//         }
//         [arr[i],arr[index]]=[arr[index],arr[i]];
//     }
// }
// console.log(arr);

// for(let i=1;i<=5;i++)
// {
//     let row="";
//     for(let j=1;j<=i;j++)
//     {
//         row+="* ";
//     }
//     console.log(row);
// }

// function start(row)
// {
//     for(let j=1;j<=row;j++)
//         {
//             console.log("*".repeat(j));
//         }
// }
// start(5);

// let i=1;
// while(i<10)
// {
//     console.log(i);
//     i++;
// }

// let arr=[10,3,4,2,2];
// for(let i=0;i<arr.length;i++)
// {
//     console.log(arr[i]);
// }

const obj={
    name:"amit",
    age:20,
    roll:3,
    lacation:"Kalwaka"
}
const key=Object.keys(obj);
// console.log(a);
// console.log(obj);
for(let i=0;i<key.length;i++)
{
    console.log(obj[key[i]]);
}
