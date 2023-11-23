/**
 * @type {HTMLVideoElement}
 */
const video = document.querySelector("#VideoSrc");

/**
 * @type {HTMLImageElement}
 */
const staticImage = document.querySelector("#ImageSrc");

/**
 * @type {HTMLAudioElement}
 */
const staticAudio = document.querySelector("#StaticFX");

const videoUUIDText = document.getElementById("UUIDText");

let inStatic = false;

const splashText = document.getElementById("SplashText");
const splashTexts = [
    "The tiktok aggregate!",
    "4 > F12 > Developer console > :)",
    "SKIN! SKIN! SKIN!",
    "Poo + 2",
    "One of the websites of all time!",
    "100% stolen content",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "Are you manually dragging and dropping the changes?",
    "console.log('REMOVE SKIN');",
    "*may cause internal bleeding",
    "happy birthday ern",
    "where am i?",
    "i hope ye like leather",
    "Are you sure you wanna refund this item?",
    "You will die!",
    "STOP POSTING FEET!",
    "New TOS!",
    "Slopping all over the place",
    "Slop content is bannable!"
];

const videoUUIDInput = document.getElementById("VideoUUIDInput");

async function fetchVideo() {
    try {
        let videoUrl = await fetch("/getvideo", {
            "method": "GET"
        });

        return await videoUrl.text();
    } catch (err) {
        return null;
    }
}

async function toggleVideo() {
    let videoUrl = await fetchVideo();
    if (!videoUrl) return;

    inStatic = true;
    video.style.display = "none";
    video.src = ""
    staticImage.style.display = "block";
    staticAudio.play();

    setTimeout(() => {
        inStatic = false;
        video.style.display = "block";
        staticImage.style.display = "none";
        staticAudio.pause();
        staticAudio.currentTime = 0;
        video.src = videoUrl;
        grabVideoUUID(videoUrl);

        clearInterval(toggler);
    }, 2000);
}

function splashTextUpdater(){
    var randomSplash = Math.floor((Math.random() * splashTexts.length));
    splashText.textContent = splashTexts[randomSplash];
}

function grabVideoUUID(URL){
    videoUUIDText.textContent = URL.replace("/media/", "");
    VideoUUIDInput.value = URL.replace("/media/", "");
}

function hideElement(ID){
    document.getElementById(ID).style.display = "none";
}

addEventListener("keypress", event => {
    if (event.key == "4") {
        console.log("         .-\"\"\"\"\"\"-.\n" +
        "       .'          '.\n" +
        "      /   O      O   \\\n" +
        "     :                :\n" +
        "     |                |\n" +
        "     : ',          ,' :\n" +
        "      \\  '-......-'  /\n" +
        "       '.          .'\n" +
        "         '-......-'\n");
    } else if (event.key == " " && !inStatic && document.activeElement.id != "ReportReason") {
        toggleVideo();
    }
});

videoUUIDText.addEventListener("click", () => {
    if (videoUUIDText.innerHTML.startsWith("Loading")) return;
    
    navigator.clipboard.writeText(`${location.protocol}//${location.host}/?uuid=${videoUUIDText.innerHTML}`);
});

staticAudio.volume = 0.1;
video.volume = 0.1;
splashTextUpdater();

let queryParameters = new URLSearchParams(location.search);
let permalinkId = queryParameters.get("uuid");
let reportRedirect = queryParameters.get("report");

if (reportRedirect) {
    alert("Thank you for your report, it will be reviewed shortly.");
}

if (permalinkId) {
    video.style.display = "block";
    staticImage.style.display = "none";
    staticAudio.pause();
    staticAudio.currentTime = 0;
    video.src = "/media/" + permalinkId;
    grabVideoUUID("/media/" + permalinkId);
} else {
    let toggler = setInterval(() => {
        staticAudio.play().then(() => {
            clearInterval(toggler);
        });
    }, 100);
    
    toggleVideo();
}

let splashTick = 0;
setInterval(() => {
    let splashSize = Math.sin(splashTick) * 0.25;
    splashTick += 0.05;
    splashText.style.transform = `rotate(${splashSize}deg)`;
}, 10);

//NEW MOBILE SHIT IM TESTING

var btn_reqPermission = document.getElementById("btn_reqPermission")
btn_reqPermission.addEventListener("click", () => { this.checkMotionPermission() })


// ON PAGE LOAD
this.checkMotionPermission()


// FUNCTIONS
async function checkMotionPermission() {

    // Any browser using requestPermission API
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {

        // If previously granted, user will see no prompts and listeners get setup right away.
        // If error, we show special UI to the user.
        // FYI, "requestPermission" acts more like "check permission" on the device.
        await DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
            if (permissionState == 'granted') {
                // Hide special UI; no longer needed
                btn_reqPermission.style.display = "none"
                this.setMotionListeners()
            }
        })
        .catch( (error) => {
            console.log("Error getting sensor permission: %O", error)
            // Show special UI to user, suggesting they should allow motion sensors. The tap-or-click on the button will invoke the permission dialog.
            btn_reqPermission.style.display = "block"
        })

    // All other browsers
    } else {
        this.setMotionListeners()
    }

}

async function setMotionListeners() {

    // ORIENTATION LISTENER
    await window.addEventListener('orientation', event => {
        console.log('Device orientation event: %O', event)
    })

    // MOTION LISTENER
    await window.addEventListener('devicemotion', event => {
        console.log('Device motion event: %O', event)

        // SHAKE EVENT
        // Using rotationRate, which essentially is velocity,
        // we check each axis (alpha, beta, gamma) whether they cross a threshold (e.g. 256).
        // Lower = more sensitive, higher = less sensitive. 256 works nice, imho.
        if ((event.rotationRate.alpha > 256 || event.rotationRate.beta > 256 || event.rotationRate.gamma > 256)) {
            this.output_message.innerHTML = "SHAKEN!"
            toggleVideo();
            setTimeout(() => {
                this.message.innerHTML = null
            }, "2000")
        }
    })
}

//NORMAL PEOPLE STUFF