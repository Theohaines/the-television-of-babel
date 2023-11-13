const VideoSrc = document.getElementById("VideoSrc");
const ImageSrc = document.getElementById("ImageSrc");

function getVideo(){
    fetch("/getVideo", {
        "method": "GET"
    }).then(async res => {
        let video = await res.text();
        VideoSrc.src = video;
    });
}

function ToggleVideo(){
    setTimeout(() => {
        ImageSrc.style.display = "none";
    }, 2000);
}

getVideo()
ToggleVideo();