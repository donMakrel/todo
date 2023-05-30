let sugestions = [];

getSugestions();

let input = document.getElementById("inputTask");
input.addEventListener("keyup", (e) => {
    removeItems();
    for(let i of sugestions){
        if(i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != ""){
            let liItem = document.createElement("li");

            liItem.classList.add("list-items");
            liItem.style.cursor = "pointer";
            liItem.setAttribute("onclick", "distplayNames('"+ i + "')");

            let word = "<b>" + i.substring(0,input.value.length) + "</b>";
            word += i.substring(input.value.length);

            liItem.innerHTML = word;
            document.querySelector(".list").appendChild(liItem);
        }
    }
});

function distplayNames(item) {
    input.value = item;
    removeItems();
}

function removeItems() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

function getSugestions(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4){
            return;
        }
        if (xhr.status === 200 || xhr.status === 400){
            sugestions=[];
            const data = xhr.responseXML;
            const xmlRoot = data.querySelector("Data");
            xmlData = [...xmlRoot.children].map(element => {
                return element.textContent;
            });
            for (let i = 0; i<xmlData.length; i++){
                sugestions.push(xmlData[i])
            }
        }
    };
        
    xhr.open("GET", "./php/sugestions.php", true);
    xhr.setRequestHeader("Content-Type", " application/xml");
    xhr.send();
}

function addSugestion(item){
    if(!sugestions.includes(item)){
        sugestions.push(item);
    }
    sendSugestions(sugestions)
}

function sendSugestions(items){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
    };

    const data = 
        `<?xml version='1.0'?>
            <Data>
            ${items.map(a => {
                return `<element>${a}</element>`
            })}
            </Data>`

    xhr.open("POST", "./php/sugestions.php");
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(data);
}