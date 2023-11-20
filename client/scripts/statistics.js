let totalVideosCounter = document.querySelector("#TotalVideosCounter");

async function getStatistics() {

    try {
        var statistics = await fetch("/statistics", {
            "method": "GET"
        });
        return await statistics.json();
    } catch (err) {
        return 0;
    }

}

getStatistics().then(statistics => {
    totalVideosCounter.innerHTML = statistics.count;
});