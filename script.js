function getRandomPlace(obj){
    let keys = Object.keys(obj);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey
}

function distance(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**d2)
}

document.addEventListener("DOMContentLoaded", function() {
    let imageMap = document.getElementById("imageMap");
    let submitBtn = document.getElementById("submitBtn");
    let markHeading = document.getElementById("markHeading");
    let mapItems={Salal:[214,117],"Bhakra Nangal":[246,158],Tehri:[292,206],"Rana Pratap Sagar":[223,338],"Sardar Sarovar":[164,438],Hirakud:[417,444],"Nagarjuna Sagar":[302,576],Tungabhadra:[235,588],Namrup:[701,263],Singrauli:[382,364],Ramagundam:[313,506],Narora:[296,256],Kakrapara:[161,441],Tarapur:[156,485],Kalpakkam:[328,667],Noida:[272,241],Gandhinagar:[134,380],Mumbai:[160,501],Pune:[175,510],Hyderabad:[291,550],Bengaluru:[261,671],Chennai:[333,663],Thiruvananthapuram:[248,779],Kandla:[80,389],Marmagao:[180,603],"New Mangalore":[206,668],Kochi:[238,750],Tuticorin:[274,776],Vishakhapatnam:[413,534],Paradip:[490,463],Haldia:[520,421],"Amritsar(Raja Sansi - Sri Gurum Dass jee)":[218,153],"Delhi(Indira Gandhi)":[259,242],"Mumbai(Chhatrapati Shivaji)":[159,495],"Chennai(Meenam Bakkam)":[329,666],"Kolkata(Netaji Subhash Chandra Bose)":[529,401],"Hyderabad(Rajiv Gandhi)":[295,549]};
    for (let [place,cord] of Object.entries(mapItems)){
        mapItems[place]=[cord[0]-40,cord[1]-5]
    }
    console.log(mapItems)
    let dot = null;
    
    imageMap.addEventListener("click", function(event) {
        let imageMapRect = imageMap.getBoundingClientRect();
        let imageMapLeft = imageMapRect.left + window.scrollX;
        let imageMapTop = imageMapRect.top + window.scrollY;
        if (submitBtn.innerHTML == "START"){return}
        if (dot) {
            dot.remove();
        }
        let x = event.offsetX;
        let y = event.offsetY;
        console.log(x,y)
        dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (x + imageMapLeft) + "px";
        dot.style.top = (y + imageMapTop) + "px";
        imageMap.parentNode.appendChild(dot); 
    });

    submitBtn.addEventListener("click", function() {
        let imageMapRect = imageMap.getBoundingClientRect();
        let imageMapLeft = imageMapRect.left + window.scrollX;
        let imageMapTop = imageMapRect.top + window.scrollY;
        let ansX=null;
        let ansY=null;
        if (submitBtn.innerHTML == "START"){submitBtn.innerHTML = "SUBMIT"}
        if (markHeading.textContent.startsWith("Mark")){
            let askedPlace = markHeading.textContent.slice(5)
            ansX = mapItems[askedPlace][0]
            ansY = mapItems[askedPlace][1]
            let ansDot = document.createElement("div");
            ansDot.className = "ansDot";
            ansDot.style.left = (ansX + imageMapLeft) + "px";
            ansDot.style.top = (ansY + imageMapTop) + "px";
            imageMap.parentNode.appendChild(ansDot); 
            delete mapItems[askedPlace];
            setTimeout(function(){ansDot.remove()}, 3000);
        } 
        place = getRandomPlace(mapItems);
        markHeading.textContent = "Mark " + place;

        if (dot) {
            let userX = parseFloat(dot.style.left.slice(0,-2)) - imageMapLeft;
            let userY = parseFloat(dot.style.top.slice(0,-2)) - imageMapTop;
            console.log(distance(userX,userY,ansX,ansY))
        }
    });
});
