/**
 * @author Nkosana Khoza
 */

//Setup Devtools Elements Side Panel And Render The UI
chrome.devtools.panels.elements.createSidebarPane(
    "[STS] Inspector Gadget", (panel)=>{
        console.log("[!] Devtools Panel Succesfully Created !")
        panel.setPage("sidepanel/sidepanel.html");        
 });
            
    