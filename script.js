// this function retrieves data from the dog API
async function start(){
const response= await fetch ("https://dog.ceo/api/breeds/list/all");
const data=await response.json();
createDogList(data.message);
}
start();
// this function creates list of the dogs got from the start function
function createDogList(breadList){
document.getElementById("breed").innerHTML=`
<select>
<option>Choose a Dog Breed</option>
${Object.keys(breadList).map(function(breed){
    return `<option>${breed}</option>`
}).join(" ")}
`
}
