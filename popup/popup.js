/**
 * @author Nkosana Khoza
 * 
 * 
 * [*] TODO : clean up code and add some comments, Like this here ;)
 */

var item;
var clear;
var heading;


//Handles The Exporting Of The Elements Into A Text File
function exportToFile(textData){
    var fileBlob = new Blob([textData], {type:"text/plain"});
    var link = document.createElement('a');

    var date = new Date()
    let prefix =  "inspection";
    var fileName = prompt("[*] Enter the POM Filename : ", prefix + "_");

    if(fileName !== null){
        link.download=fileName + ".txt";
        //Chrome Doesn't Require You To Add The Link To document Before Clicking
        if(window.webkitURL != null){
            link.href = window.webkitURL.createObjectURL(fileBlob)
       
        }
        else{
            link.href = window.URL.createObjectURL(fileBlob)
        }
        link.click()
    }
    else{

    }
    
    
    
}



         //Retrieves Saved Elements From The Local Storage
const y = chrome.storage.sync.get("xpaths", (data) =>{
    item = document.getElementById("elements");
    clear =  document.getElementById("clearButton");
   
    heading = document.getElementById("heading2");

    let d = data.xpaths;

    if(d != undefined){
        if(d.length > 0){
            heading.innerText = "Your elements, Inspector :D"
            for(var x = 0;x < d.length;x++){
                item.innerHTML += "<p class='element' >" + d[x].variableName + " - " + d[x].xpath + "<br /> <b>" + d[x].comment + "</b> </p>"
            }
        }

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

        
    }  

   let ex = document.getElementById("export");
   ex.onclick = function(){
    var stringData = ""
    for(var x = 0;x < d.length;x++){

        stringData += "//" + d[x].comment + "\n@FindBy(xpath=\"" + d[x].xpath + "\")\nprivate WebElement " + d[x].variableName + ";\n\n"
    }

    exportToFile(stringData)
}

 
})






