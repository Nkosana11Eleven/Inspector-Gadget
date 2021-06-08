
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
btn.onclick = () =>{
    
    var variableName = document.getElementById("variableName");
    let v = document.getElementById("elementXpath")
    let comment = document.getElementById('comment');
    var xpath1 = cleanXpath(v.value);


    var data = {
        variableName : variableName.value,
        xpath : xpath1,
        comment : comment.value
    }
    saveElement(data)

    variableName.value = ""
    v.value = ""
    comment.value = ""

}
