function test1()
{
    const p1= new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("first Promise Resolve");
        }, 2000);
    })
    return p1;
}

function test2()
{
    const p2= new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("Second Promise Resolve");
        }, 2000);
    })
    return p2;
}

 
async function amit() {
    const data=await test1();
    console.log(data);

    const data1=await test2();
    console.log(data1);
}
amit();