

var item;
var clear;
var heading;


var isRun = false;
//Hides The Clear Button Upon Popup Initialization
document.onload = () =>{
     item = document.getElementById("elements")
     clear =  document.getElementById("clearButton")
     clear.hidden = true;
}


         //Retrieves Saved Elements From The Local Storage
 let y =chrome.storage.sync.get("xpaths", (data) =>{
    item = document.getElementById("elements");
    clear =  document.getElementById("clearButton");
    let ex = document.getElementById("export");
    heading = document.getElementById("heading2");

    let d = data.xpaths;

    if(d != undefined && !isRun){
        if(d.length > 0){
            heading.innerText = "Your elements, Inspector :D"
            for(var x = 0;x < d.length;x++){
                item.innerHTML += "<p class='element' >" + d[x].variableName + " - " + d[x].xpath + "<br /> <b>" + d[x].comment + "</b> </p>"
            }
        }else{
            heading.innerText = "Please use this gadget, Inspector :{"
        }

        isRun = false;
    }

       
    
   // alert(d.length)
   if(d != undefined ){
        clear.hidden = false;
        clear.onclick = () =>{
            
            chrome.storage.sync.set({"xpaths" : []}, () =>{
                console.log("[!] Elements Cleared")
                item.innerHTML = "";
            })
            
            chrome.storage.sync.clear(() =>{
          //      alert("[*] Saved Elements Cleared !")
            })

          

        }

        //Sets Up A Click Handler On The Export Button
        ex.onclick = ()=>{
            var stringData = ""
            for(var x = 0;x < d.length;x++){
      
                stringData += "//" + d[x].comment + "\n@FindBy(xpath=\"" + d[x].xpath + "\")\nprivate WebElement " + d[x].variableName + ";\n\n"
            }

            exportToFile(stringData)
        }
   }
})



//Handles The Exporting Of The Elements Into A Text File
function exportToFile(textData){
    var fileBlob = new Blob([textData], {type:"text/plain"});
    var link = document.createElement('a');
    link.download="STSInspection.txt";
    
    //Chrome Doesn't Require You To Add The Link To document Before Clicking
    if(window.webkitURL != null){
        link.href = window.webkitURL.createObjectURL(fileBlob)
    }
    link.click()
}



