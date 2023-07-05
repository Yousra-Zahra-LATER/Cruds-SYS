
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood='create';
let tmp;

//fucntion 1: gettotal ( it calculats the total)

function getTotal()
{
if(price.value !=''){
    let result= +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML=result;
    total.style.background ='#54df48';
}
else{
        total.innerHTML ='0';
        total.style.background ='#ff0808';
    }
}


//function 2: Create a product
//let t=title.innerHTML; to get the content between an element like <p> cc </p>
//title.innerHtml=title.value to set the content or to add an new element between an element

let dataPro;

if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product);
}

else{
dataPro=[];
}


submit.onclick = function() {
let newPro = {title: title.value.toLowerCase(), 
              price:price.value,
              ads:ads.value, 
              taxes:taxes.value, 
              total:total.value,
              discount:discount.value,
              total:total.innerHTML,
              count: count.value,
              category: category.value.toLowerCase()};
if(title.value !='' && category.value !="" && count.value < 5){
if(mood==='create'){
       if (newPro.count>1){ 
        for(let i=0;i<newPro.count;i++){
            //console.log(i);
             dataPro.push(newPro); } 
            }
             
        else{ dataPro.push(newPro); }
        }
else{
    dataPro[tmp]=newPro;
    mood='create';
    submit.innerHTML='Create';
    count.style.display='block';
 
}
}



//function 3: save the product in the local storage
// locale storage est un emplacement donné par le navigateur web comme chrome pour stokcer les données
       localStorage.setItem('product', JSON.stringify(dataPro));
       //console.log(dataPro);

       clearData();
       showData();
}

 

//function 4: clear inputs after the creation

function clearData(){
   title.value='';
   price.value='';
   ads.value='';
   taxes.value='';
   total.innerHTML='0';
   discount.value='';
   count.value='';
   category.value='';
}






//function 5: read the insertt product (l'affichage)

function showData(){
 
getTotal();
    let table = '';

    for(i=0;i<dataPro.length;i++){
   
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=" update( ${i} )" id="update">update</button></td>
        <td><button onclick=" deleteData( ${i} )" id="delete">delete</button></td> 
        </tr>
        `

    }

    document.getElementById('tbody').innerHTML=table;

//Function: delete all data this button appear only when the datapro is full
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length>0){
          btnDelete.innerHTML= `<button onclick="deleteAll()">deleteAll (${dataPro.length}) </button>`
    }
    else{
        btnDelete.innerHTML='';
    }






}


//function 6: count


//function 7: delete the product
function deleteData(i){
dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
showData();

}


//function 7: delete ALL, i must delete from two place
function deleteAll(){
localStorage.clear();
dataPro.splice(0);
showData();
}

showData();



//function 8: update

function update(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    getTotal()
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}







let searchMood='title';
let search=document.getElementById('search')

//functions 9: search
function getSearchMood(id){
     //console.log(id);
     if(id==='searchTitle'){
        searchMood='title'

     }
     else{
        searchMood='category'

     }
     search.placeholder='search By '+searchMood;
search.focus();
search.value='';
showData()

//console.log(searchMood)
}

function searchData(value){
    let table = '';
 if( searchMood==='title'){
for(let i=0; i<dataPro.length;i++){
    if(dataPro[i].title.includes(value.toLowerCase())){
      //console.log("  id array "+i);
   

    
        table +=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=" update( ${i} )" id="update">update</button></td>
        <td><button onclick=" deleteData( ${i} )" id="delete">delete</button></td> 
        </tr>
        `

    }




    }
}

else {

    for(let i=0; i<dataPro.length;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
          //console.log("  id array "+i);
       
    
        
            table +=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick=" update( ${i} )" id="update">update</button></td>
            <td><button onclick=" deleteData( ${i} )" id="delete">delete</button></td> 
            </tr>
            `
    
        }
}
}


document.getElementById('tbody').innerHTML=table;


}






//function 10:clean data


