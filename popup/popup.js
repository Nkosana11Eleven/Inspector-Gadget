/**
 * @author Nkosana Khoza
 */

var items;
var clearButton;
var heading;


//Handles The Exporting Of The Elements Into A Text File
function exportToFile(textData){
    var fileBlob = new Blob([textData], {type:"text/plain"});
    var link = document.createElement('a');
    var date = new Date().toLocaleDateString();
    let prefix =  "0x11_" + date;
    var fileName = prompt("[*] Enter the POM Filename : ", prefix + "_");

    if(fileName !== null){
        link.download=fileName + ".txt";
       

        //Create an ObjectURL for the file And link It to the Object
        if(window.webkitURL != null){
            link.href = window.webkitURL.createObjectURL(fileBlob);
        }
        else{
            link.href = window.URL.createObjectURL(fileBlob);
        }
        //Click the link to download the text file.
        link.click()
    }
    
}



//Retrieves Saved Elements From The Local Storage
const y = chrome.storage.sync.get("xpaths", (data) =>{
    items = document.getElementById("elements");
    clearButton =  document.getElementById("clearButton");
    heading = document.getElementById("heading2");

    let saved_elements = data.xpaths;

    if(d != undefined){
        if(d.length > 0){
            heading.innerText = "Your elements, Inspector :D"

            //Render Every Saved Element
            for(var x = 0;x < saved_elements.length;x++){
                item.innerHTML += "<p class='element' >" + saved_elements[x].variableName + " - " + saved_elements[x].xpath + "<br /> <b>" + saved_elements[x].comment + "</b> </p>";
            }
        }

        clearButton.hidden = false;
        clearButton.onclick = () =>{
            
            chrome.storage.sync.set({"xpaths" : []}, () =>{
                console.log("[!] Elements Cleared")
                item.innerHTML = "";
            })
            
            chrome.storage.sync.clear(() =>{
                console.log("[!] Removed All Elements From Storage");
            })
        }

        
    }  

let exportButton = document.getElementById("export");
exportButton.onclick = function(){
    var stringData = ""
    for(var x = 0;x < saved_elements.length;x++){

        stringData += "//" + saved_elements[x].comment + "\n@FindBy(xpath=\"" + saved_elements[x].xpath + "\")\nprivate WebElement " + saved_elements[x].variableName + ";\n\n"
    }

    exportToFile(stringData);
}

 
})






