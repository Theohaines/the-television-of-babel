const VideoSrc = document.getElementById("VideoSrc");
const ImageSrc = document.getElementById("ImageSrc");
let darkModeEnabled = false;

function getVideo(){ //Shit I don't understand (If it breaks I will ask Wilson about it lol)
    fetch("/getVideo", {
        "method": "GET"
    }).then(async res => {
        let video = await res.text();
        VideoSrc.src = video;
    });
}

function toggleVideo(){
    setTimeout(() => {
        ImageSrc.style.display = "none";
    }, 2000);
}

// ***** SITE ALWAYS IN DARK MODE NOW ***** 

/* function toggleDarkMode(){ // I HATE GOOD INTERFACE DESIGN 
    if (darkModeEnabled == false){
        // Change these elements to dark colours
        darkModeEnabled = true;
    } else {
        // Change these elements to light colours 
        darkModeEnabled = false;
    }
} */

function toggleElement(ID){ // Reusable way to toogle element visibility via ID tag (only works on block elements)
    var element = document.getElementById(ID);

    if (element.style.display == "none"){
        element.style.display == "block";
    } else {
        element.style.display == "none";
    }
}

getVideo()
toggleVideo();