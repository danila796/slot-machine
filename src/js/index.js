let app = document.getElementsByClassName('slot-machine-app')[0];
let app_hidden = document.getElementsByClassName('panel_hidden-app')[0];
let app_body_buttons = document.getElementsByClassName('app-body_buttons')[0];

function hideApp(){
  app.style.visibility = "hidden";
  app_hidden.classList.remove("panel_hidden-app_active");
  app_body_buttons.style.display = "none";
}
function toggleAppVisibility(){
  if (app_hidden.classList.contains("panel_hidden-app_active")){
    hideApp();
  } else {
    app.style.visibility = "visible";
    app_hidden.classList.add("panel_hidden-app_active");
    app_body_buttons.style.display = "flex";
  }
}
function closeApp(){
  app.style.display = "none";
  app_hidden.style.display = "none";
}
function openApp(){
  app.style.display = "flex";
  app_hidden.style.display = "inline-flex";
}