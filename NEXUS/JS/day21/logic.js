// //mango
//*************************Attach the New element*************************** */
// function attach(content){
// const Element=document.createElement('li');
// Element.innerHTML=content;

// const Element1=document.createElement('li');
// Element.innerHTML=content +" + AmitChhoker";

// const parent=document.getElementById('root');
// // parent.appendChild(Element);
// parent.append(Element,Element1);
// }
// attach("pineapple");
// attach("mango");
// attach("coconat");


//************************Attach the text by TextNode******************************** */
// const element=document.createTextNode("hello coder army");
// const parent=document.getElementById('root');
// parent.append(element);

//**********************Create Attribute Node*********************** */
// const ele=document.createAttribute('id');
// ele.value='first';


//Access the first child
// const curr=document.querySelector('li');
// curr.setAttributeNode(ele);

//Access the second child
// for(let i=0;i<4;i++)
// {
//     const parent=document.getElementById('root');
//     parent.children[i].setAttributeNode(ele);
// }


// const curr1=document.querySelector('h1');
// curr1.setAttributeNode(ele);

//****************access the Attribute******************* */
// const ele=document.getElementById('root');
// console.log(ele.getAttribute('Amit','chhoker'));


//**************Add nodes to the DOM******************* */
// const parent=document.getElementById('root');

// const element=document.createElement('li');
// element.innerHTML="Mango";

// const child2=parent.children[1];
// parent.insertBefore(element,child2);
// // parent.prepend(element); 


//***************insert/creste the new dives**************** */
// const parent=document.getElementById('head');
// const element=document.createElement('div');
// element.innerHTML="Hello Coder Army";

// parent.insertAdjacentElement("beforebegin",element);


//delete
// document.querySelector('li').removeChildNode();




