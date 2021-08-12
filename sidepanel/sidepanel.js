/**
 * @author Nkosana Khoza
 * 
 * 
 * [*] TODO : clean up code and add some comments, Like this here ;)
 */

var kount = 0;
var elements = []


function saveElement(data){
    elements.push(data)
    chrome.storage.sync.set({"xpaths" : elements}, () =>{
        console.log("[!] Element Saved! : " + data.name);
        //alert("[!] Element Saved! : " + data.variableName)
        kount++;
    })
}

function cleanXpath(xpath){
    return xpath.replace(/"/g, "'");
}


var btn = document.getElementById("capBtn");

const t = chrome.storage.sync.get("xpaths", (d) =>{
    let b = document.getElementById("savedKount");

    if(b !== undefined && d.xpaths !== undefined){
        b.innerText = d.xpaths.length > 0 ? " " + d.xpaths.length : 0
    }
    
});
btn.onclick = () =>{
    
    var variableName = document.getElementById("variableName");
    let v = document.getElementById("elementXpath")
    let comment = document.getElementById('comment');
    var xpath1 = cleanXpath(v.value);
    let savedKount = document.getElementById("savedKount");
    

    if(variableName.value === "" || v.value === ""){
        let footer = document.getElementById("footer");
        footer.style.backgroundColor = "var(--danger)";
        setTimeout(()=>{
            footer.style.backgroundColor = "var(--siteColor)";
        }, 500)
    }else{
        var data = {
            variableName : variableName.value,
            xpath : xpath1,
            comment : comment.value
        }
        saveElement(data);
        chrome.storage.sync.get("xpaths", (d) =>{
            savedKount.innerText = " " + d.xpaths.length
        });

        let footer = document.getElementById("footer");
        footer.style.transition = "300ms ease-in";
        footer.style.backgroundColor = "var(--success)";
        
        setTimeout(()=>{
            footer.style.backgroundColor = "var(--siteColor)";
            footer.style.transition = "300ms ease-in-out";
        }, 500)

        variableName.value = ""
        v.value = ""
        comment.value = ""
    }


    

}
