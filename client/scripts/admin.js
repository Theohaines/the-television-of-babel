const reportsQueue = document.querySelector(".ReportsQueue");
const reportedVideoPlayer = document.querySelector("#ReportedVideo");
const reportReasonTextarea = document.querySelector("#ReportReasonTextarea");

async function fetchLatestReports() {

    try {
        let reportsResponse = await fetch("/reports", {
            "method": "GET"
        });
        var reports = await reportsResponse.json();
    } catch (err) {
        console.log(err.toString());
        return [];
    }

    for (let report of reports) {

        let reportCard = document.createElement("div");
        reportCard.className = "Report";
        reportCard.setAttribute("data-uuid", report.uuid);
        reportCard.setAttribute("data-reason", report.reason);

        reportCard.innerHTML += "<h4>" + report.uuid + "</h4>";
        reportCard.innerHTML += "<h5>" + report.timestamp + "</h5>";
        reportCard.innerHTML += "<button>Remove video</button><button>Keep video</button>";

        reportCard.addEventListener("click", () => selectReport(reportCard));

        reportsQueue.appendChild(reportCard);

    }

}

function selectReport(reportCard) {

    let uuid = reportCard.getAttribute("data-uuid");
    let reason = reportCard.getAttribute("data-reason");

    reportedVideoPlayer.src = "/media/" + uuid + ".mp4";
    reportReasonTextarea.value = reason;

}

fetchLatestReports();

