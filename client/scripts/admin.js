const reportsQueue = document.querySelector(".ReportsQueue");
const reportedVideoPlayer = document.querySelector("#ReportedVideo");
const reportReasonTextarea = document.querySelector("#ReportReasonTextarea");

async function fetchLatestReports() {

    reportedVideoPlayer.src = "";

    try {
        let reportsResponse = await fetch("/report/get", {
            "method": "GET"
        });
        var reports = await reportsResponse.json();
    } catch (err) {
        return [];
    }

    reportsQueue.innerHTML = "";

    for (let report of reports) {

        let reportCard = document.createElement("div");
        reportCard.className = "Report";
        reportCard.setAttribute("data-uuid", report.uuid);
        reportCard.setAttribute("data-reason", report.reason);
        reportCard.setAttribute("data-timestamp", report.timestamp);

        reportCard.innerHTML += "<h4>" + report.uuid + "</h4>";
        reportCard.innerHTML += "<h5>" + report.timestamp + "</h5>";

        let removeVideoButton = document.createElement("button");
        removeVideoButton.innerHTML = "Remove video";
        removeVideoButton.addEventListener("click", () => acceptReport(reportCard));

        let keepVideoButton = document.createElement("button");
        keepVideoButton.innerHTML = "Keep video";
        keepVideoButton.addEventListener("click", () => rejectReport(reportCard));

        reportCard.appendChild(removeVideoButton);
        reportCard.appendChild(keepVideoButton);

        reportCard.addEventListener("click", () => selectReport(reportCard));

        reportsQueue.appendChild(reportCard);

    }

}

function selectReport(reportCard) {

    let uuid = reportCard.getAttribute("data-uuid");
    let reason = reportCard.getAttribute("data-reason");

    reportedVideoPlayer.src = "/media/" + uuid;
    reportReasonTextarea.value = reason;

}

function acceptReport(reportCard) {

    let uuid = reportCard.getAttribute("data-uuid");
    let timestamp = reportCard.getAttribute("data-timestamp");

    fetch("/report/accept", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": `uuid=${uuid}&timestamp=${timestamp}`
    });

    fetchLatestReports();

}

function rejectReport(reportCard) {

    let uuid = reportCard.getAttribute("data-uuid");
    let timestamp = reportCard.getAttribute("data-timestamp");

    fetch("/report/reject", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": `uuid=${uuid}&timestamp=${timestamp}`
    });

    fetchLatestReports();

}

fetchLatestReports();

