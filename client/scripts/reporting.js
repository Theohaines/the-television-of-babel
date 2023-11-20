//REPORTING SHITE
const reportMenu = document.getElementById("ReportMenu");
const reportReasonSelect = document.getElementById("ReportReasonSelection");
const reportReason = document.getElementById("ReportReason");
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

function setReportReason(){
    reportReason.value = reportReasonSelect.options[reportReasonSelect.value].text; 
}

function toggleReportReasonEdit(){
    if (reportReason.readOnly == true && reportReasonSelect.value == "12"){
        reportReason.readOnly = false;
    } else {
        reportReason.readOnly = true;
    }
}

reportMenu.style.display = "none";