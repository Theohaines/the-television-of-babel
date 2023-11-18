//REPORTING SHITE
const reportMenu = document.getElementById("ReportMenu");
const videoContainer = document.getElementById("VideoContainer");

function toggleReportMenu(){
    if (reportMenu.style.display == "block"){
        reportMenu.style.display = "none";
        videoContainer.style.display = "block";
    } else {
        reportMenu.style.display = "block";
        videoContainer.style.display = "none";
    }
}

reportMenu.style.display = "none";