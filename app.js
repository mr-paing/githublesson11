const getBalance = document.getElementByIconst getBalance = document.getElementById('balance'),
      getMoneyDeb = document.getElementById('money-deb'),
      getMoneyCrd = document.getElementById('money-crd');


const getForm = document.getElementById('form'),
      getDate = document.getElementById('date'),
      getAmount = document.getElementById('amount'),
      getRemark = document.getElementById('remark');
const formcheckInputs = document.querySelectorAll('.form-check-input');


const listGroup = document.getElementById('list-group'),
      openBtn = document.getElementById('open-btn');
const historyBox = document.querySelector('.history-box');


/*
const dummyDatas = [
    {id:1,transtatus:'+',remark:'Cash',amount:1000,date:'2023-01-25'},
    {id:2,transtatus:'-',remark:'Pen',amount:-20,date:'2023-01-21'},
    {id:3,transtatus:'+',remark:'Other Income',amount:300,date:'2023-01-22'},
    {id:4,transtatus:'-',remark:'Book',amount:-10,date:'2023-01-23'},
    {id:5,transtatus:'-',remark:'Water',amount:-150,date:'2023-01-24'},
    {id:6,transtatus:'-',remark:'Teamix',amount:-100,date:'2023-01-26'},
];
*/


const getLsDatas = JSON.parse(localStorage.getItem('transaction'));
let getHistories = localStorage.getItem('transaction') !==  null ? getLsDatas : [];

// Initial App

function init(){
    listGroup.innerHTML = '';


    // Method-1
    /*
    dummyDatas.forEach(function(dummyData){
        // console.log(dummyData);
        addToUi(dummyData);
    });
    */

    // Method-2
    // dummyDatas.forEach(dummyData=>addToUi(dummyData));

    // Method-3 *****
    // dummyDatas.forEach(addToUi);

    getHistories.forEach(addToUi);

    totalValues();
}

init();


// Create li to ul

function addToUi(transaction){
    // console.log(transaction);
    // console.log(transaction.transtatus,transaction.remark,transaction.amount,transaction.date);
    // console.log(transaction.amount, typeof transaction.amount);

    newLi = document.createElement('li');
   

    newLi.innerHTML = `${transaction.remark} <span>${transaction.transtatus}${Math.abs(transaction.amount)}</span><span>${transaction.date}</span>
                      <button type="button" class="delete-btn" onclick="removeTransaction(${transaction.id});">&times;</button>`;
    // console.log(newLi);

    // newLi.classList.add('list-group-item');
    newLi.className = 'list-group-item';
    newLi.classList.add(transaction.transtatus === '+' ? 'inc' : 'dec');
    // console.log(newLi);
    listGroup.appendChild(newLi);

}






// Get Sign
var sign = '-';

formcheckInputs.forEach(formcheckInput=>{
    formcheckInput.addEventListener('change',function(){
        // console.log(this.value);

        if(this.value === 'debit'){
            sign = '+';
        }else if(this.value === 'credit'){
            sign = '-';
        }
        // console.log(sign);

    });
});
// console.log(sign);







openBtn.addEventListener('click',()=>{
    historyBox.classList.toggle('show');
});

function newTransaction(e){
    e.preventDefault();

    // console.log(e.target);
    // console.log(sign);

    if(isNaN(getAmount.value) || getAmount.value.trim() === '' || getDate.value.trim() === '' || getRemark.value.trim() === ''){
        alert('Ohh!!! Some datas are missing.');
    }else{
        const transaction = {
            id:generateIdx(),
            transtatus:sign,
            amount:sign === "-" ? Number(-getAmount.value) : Number(getAmount.value),
            date:getDate.value,
            remark:getRemark.value
        };

        // console.log(transaction);  

        getHistories.push(transaction);

        addToUi(transaction);
        totalValues();
        updateLocalstorage();

        getAmount.value = '';
        getDate.value = '';
        getRemark.value = '';

        getAmount.focus();
    }

   
}


// Update Localstorage

function updateLocalstorage(){
    localStorage.setItem('transaction',JSON.stringify(getHistories));
}

function generateIdx(){
    return Math.floor(Math.random() * 100000);
}

// console.log(generateIdx());


function totalValues(){
    // const totalAmounts = getHistories; // [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    const totalAmounts = getHistories.map(getHistory => getHistory.amount);
    // console.log(totalAmounts);

    // Method-1
    /*
    const result = totalAmounts.reduce(function(total,currentValue){
        total += currentValue;
        return total;
    },0).toFixed(2);

    console.log(result);
    */

    // method-2
    const totalResult = totalAmounts.reduce((total,currentValue)=>(total += currentValue),0).toFixed(2);
    const debitResult = totalAmounts.filter(totalAmount => totalAmount > 0 ).reduce((total,currentValue)=>(total += currentValue),0).toFixed(2);
    const creditResult = (totalAmounts.filter(totalAmount => totalAmount < 0 ).reduce((total,currentValue)=>(total += currentValue),0) * -1).toFixed(2);

      // console.log(totalResult);
      // console.log(debitResult);
      // console.log(creditResult);


    getBalance.innerText = `${totalResult}`;
    getMoneyDeb.textContent = `${debitResult}`;
    getMoneyCrd.textContent = `${creditResult}`;

}
// totalValues();



function removeTransaction(tranId){
    getHistories = getHistories.filter(getHistory => getHistory.id !== tranId);
    init();
    updateLocalstorage();
}


getForm.addEventListener('submit',newTransaction);




// var myArrs = [10,20,30,40,50,60,70,80,90,100];
//                  1                                               2
// Array.reduce(function(total,currentValue,currentIdex,array){},initialValue)

// var result = myArrs.reduce(function(total,currentValue,currentIdx,arr){
    // console.log('this is total = ',total); // 0 undefined  // if we use 1 paramiter 10 // undefined
    // console.log('this is current value = ',currentValue); // 10 to 100 by number  // if we use 1 paramiter 10 undefined
    // console.log('this is current idex = ',currentIdx); // 0 to 9 by index number  // if we use 1 paramiter 1 to 9 index number
    // console.log(arr); // array

    // total += currentValue;
    // return total;
// },0);

// console.log(result);















