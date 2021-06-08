//Setup Devtools Elements Side Panel
chrome.devtools.panels.elements.createSidebarPane(
    "[STS] Inspector Gadget", (panel)=>{
        console.log("[!] Devtools Panel Succesfully Created !")
        panel.setPage("sidepanel/sidepanel.html");        
 });
            
    