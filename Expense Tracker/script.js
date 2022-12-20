// Selections
const inputs=document.querySelectorAll('input');
const expenseBtn=document.querySelector('button');
const data=document.querySelector('.data');
let listOfItems=[];


// events
expenseBtn.addEventListener('click',showData);


// functions
function showData(){
   
    // Setting items in local storage
    const items={
        name:inputs[0].value,
        date:inputs[1].value,
        amount:inputs[2].value
    }
    saveLocally(items);
    // Creating the table for data
    const td=document.createElement('div');
    td.classList.add('td');
 
    for(let i=0;i<=2;i++){
        // creating the spans and filling the data from input
        const span =document.createElement('span');
        span.innerText=inputs[i].value; 
        inputs[i].value='';
        // appending data in td
        td.appendChild(span);
        
    }
    // creating button for deleting the data
    const deleteBtn=document.createElement('button');
    deleteBtn.innerText='X';
    deleteBtn.addEventListener('click',deleteData);
    
    // appending deleteBtn in td
    td.appendChild(deleteBtn);
    // appending td in data
    data.appendChild(td);

}

function deleteData(e){
    const tds=document.querySelectorAll('.td');
    let i=0,index;
    tds.forEach(td=>{
        if(td==e.target.parentElement){
            // console.log(td);
            index=i;
        }
        i++;
    });
    // Deleting html element
    e.target.parentElement.remove();
    // Deleting from local storage
    let itemsFromLocalStorage=localStorage.getItem('items');
    itemsFromLocalStorage=JSON.parse(itemsFromLocalStorage);
    for(let i=0;i<itemsFromLocalStorage.length;i++){
        if(index==i){
            itemsFromLocalStorage.splice(index,1);
            listOfItems.splice(index,1);
        }
    }
    localStorage.setItem('items',JSON.stringify(itemsFromLocalStorage));
}

function saveLocally(items){
    if(localStorage.getItem('items')){
        listOfItems=JSON.parse(localStorage.getItem('items'));
    }
    listOfItems.push(items);
    localStorage.setItem('items',JSON.stringify(listOfItems));
}

function showFromLocalStorage(){
    let itemsFromLocalStorage=localStorage.getItem('items');
    if(itemsFromLocalStorage){
    itemsFromLocalStorage=JSON.parse(itemsFromLocalStorage);
    itemsFromLocalStorage.forEach(item=>{
        // Creating the table for data
        const td=document.createElement('div');
        td.classList.add('td');
        
        for(let i in item){
            // creating the spans and filling the data from input
            const span =document.createElement('span');
            span.innerText=item[i]; 
           
            // appending data in td
            td.appendChild(span);
            
        }
        // creating button for deleting the data
        const deleteBtn=document.createElement('button');
        deleteBtn.innerText='X';
        deleteBtn.addEventListener('click',deleteData);
        
        // appending deleteBtn in td
        td.appendChild(deleteBtn);
        // appending td in data
        data.appendChild(td);
    });
}
}

// On load
showFromLocalStorage();

