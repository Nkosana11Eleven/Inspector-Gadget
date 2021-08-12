/**
 * @author Nkosana Khoza
 * 
 * 
 * [*] TODO : clean up code and add some comments, Like this here ;)
 */

//Setup Devtools Elements Side Panel
chrome.devtools.panels.elements.createSidebarPane(
    "[STS] Inspector Gadget", (panel)=>{
        console.log("[!] Devtools Panel Succesfully Created !")
        panel.setPage("sidepanel/sidepanel.html");        
 });
            
    