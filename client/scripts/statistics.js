let totalVideosCounter = document.querySelector("#TotalVideosCounter");

async function getTotalVideos() {

    try {
        var totalVideoCount = await fetch("/getvideocount", {
            "method": "GET"
        });
        return parseInt(await totalVideoCount.text());
    } catch (err) {
        return 0;
    }

}

getTotalVideos().then(totalVideoCount => {
    totalVideosCounter.innerHTML = totalVideoCount
});