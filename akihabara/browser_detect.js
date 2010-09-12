function loadjsfile(filename){
  var headID = document.getElementsByTagName("head")[0];
  var fileref=document.createElement('script');
  fileref.type = "text/javascript";
  fileref.src = filename;
  fileref.onload = checkCanvas;
  headID.appendChild(fileref);
 }
function checkCanvas() {
  if (Modernizr.canvas === false) {
    window.location = "unsupported.html";
  }
}
loadjsfile("akihabara/modernizr-1.5.min.js");

