const VideoSrc = document.getElementById("VideoSrc");

function getVideo(){
    fetch("/getVideo", {
        "method": "GET"
    }).then(async res => {
        let video = await res.text();
        VideoSrc.src = video;
    });
}

getVideo()