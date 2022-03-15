/**
 * @author Nkosana Khoza
 */

var items;
var clearButton;
var heading;
var exportBtn;


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
    exportBtn = document.getElementById("export");

    heading = document.getElementById("heading2");

    let saved_elements = data.xpaths;

    if(saved_elements != undefined){
        if(saved_elements.length > 0){
            heading.innerText = "Your elements, Inspector :D"

            //Render Every Saved Element
            for(var x = 0;x < saved_elements.length;x++){
                items.innerHTML += "<p class='element' >" + saved_elements[x].variableName + " - " + saved_elements[x].xpath + "<br /> <b>" + saved_elements[x].comment + "</b> </p>";
            }
        }

        clearButton.hidden = false;
        exportBtn.hidden = false;

        //Adds a click listener to clear the elements
        clearButton.onclick = () =>{
            
            chrome.storage.sync.set({"xpaths" : []}, () =>{
                console.log("[!] Elements Cleared")
                items.innerHTML = "";
            })
            
            chrome.storage.sync.clear(() =>{
                console.log("[!] Removed All Elements From Storage");
            })
        }

        
    }  

function isXpath(locator){
    let magicSeq = locator.substring(0, 1);

    if(locator.match("//") != null)
        return true;

    return false;
}

//Defines the functionality to export the generated elements
let exportButton = document.getElementById("export");
exportButton.onclick = function(){
    var stringData = ""
    for(var x = 0;x < saved_elements.length;x++){

        //public static By generateQuoteButton = By.id("quoteButton");
        //public static By saveRiskItemButton = By.xpath("//button[contains(@class,'btn btn-primary')]");

        if(isXpath(saved_elements[x].xpath)){
            stringData += "//" + saved_elements[x].comment + "\n@FindBy(xpath=\"" + saved_elements[x].xpath + "\")\nprivate WebElement " + saved_elements[x].variableName + ";\n\n"
        }
        else{
            stringData += "//" + saved_elements[x].comment + "\n@FindBy(id=\"" + saved_elements[x].xpath + "\")\nprivate WebElement " + saved_elements[x].variableName + ";\n\n"
        }

        // "\npublic static By" + saved_elements[x].variableName + " = By.xpath(" + saved_elements[x].xpath + ");"
        // stringData += "//" + saved_elements[x].comment + "\n@FindBy(xpath=\"" + saved_elements[x].xpath + "\")\nprivate WebElement " + saved_elements[x].variableName + ";\n\n"
    }

    exportToFile(stringData);
}

 
})






