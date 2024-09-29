const BASE_URL =
  "https://v6.exchangerate-api.com/v6/a3ea28724bccabef94689e8f/latest";

const dropdown=document.querySelectorAll("#dropdown select");
const msg=document.querySelector(".msg");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");

let btn=document.querySelector("button");
let i=0;
 for(let select of dropdown){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        if(select.name == 'from' && code == "USD"){
            newoption.selected="selected";
        }
        else if(select.name == 'to' && code == "INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })
}
const updateExchangeRate=async ()=>{
    let amount=document.querySelector("p+input");
    let amtVal=amount.value;
    if(amtVal == "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let exRate=data.conversion_rates[toCurr.value];
    let finalAmount = (amtVal * exRate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


}
const updateFlag=(ele)=>{
    let currCode=ele.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= ele.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})


