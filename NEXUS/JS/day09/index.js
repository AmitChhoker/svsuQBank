// const d=new Date();
// console.log(d.toString());
// console.log(d.toISOString());
// console.log(typeof d);
// console.log(d);
//  

// const d=new Date("2006-01-09");
// const date=new Date(2006,1,9);
// console.log(date.toString());
// console.log(d.toDateString());

// const d=new Date();
// d.setDate(9);
// d.setFullYear(2006);
// d.setMonth(0);
// console.log(d.toString());

// const date1=new Date("2025-04-20");
// const date2=new Date("2025-04-21");
// console.log(date2>date1);

//countdown timer for olympic
// days,hours,minute, second
const date1=new Date();
const date2=new Date("2026-01-09T00:00");

const date=date2-date1;
const days=Math.floor(date/(1000*60*60*24));
console.log(`Days left for Birthday: ${days}`);