const obj=fetch('http://api.weatherapi.com/v1/current.json?key=68bc91f665034254acc115653250703&q=London&aqi=yes')

//************to Get the Head***************** */
// obj.then((data)=>{
//     console.log(data);
// })

//*************To get the Body********************** */
// obj.then((data1)=>{
//    return data1.json();
// }).then((data)=>{
//     console.log(data);
// })

// setTimeout(() => {
//     console.log(obj);
// }, 2000);

// obj.then((data)=>{
//     console.log(data);
// }).catch((error)=>{
//     console.log(error);
// });


// obj.then((data)=>{
//     const p=data.json();
//     p.then((amit)=>{
//         console.log(amit);
//     }).........
// })

// obj
// .then((response)=>response.json())
// .then((data)=>console.log(data));
fetch('http://api.weatherapi.com/v1/current.json?key=68bc91f665034254acc115653250703&q=London&aqi=yes')
.then(data=>data.json())
.then(amit=>console.log(amit))
.catch(error=>console.log(error));


