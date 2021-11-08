const videoSources = ["videos/pexels-rostislav-uzunov-7385122.mp4","videos/productionID_4779866.mp4", "videos/pexels-rostislav-uzunov-9629255.mp4", "videos/pexels-rostislav-uzunov-8303104.mp4", "videos/pexels-rostislav-uzunov-6151238.mp4"];

const btnBg = document.querySelector(".btn-bg-change");

let bgchoice = 0;

btnBg.addEventListener('click', function(){
    if (bgchoice < videoSources.length - 1){
        bgchoice++
    } else {
        bgchoice = 0
    }
    document.querySelector('.videoBg').innerHTML = `<video src=${videoSources[bgchoice]} autoplay loop></video>`
});


