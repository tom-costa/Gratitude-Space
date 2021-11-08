const musicContainer = document.querySelector('.music-container');
const musicInfo = document.querySelector('.music-info');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

// Array with Song titles:
const songs = ["hey", "summer", "ukulele"]

// Song Index (keep track of songs):
let songIndex = 1;

// To initially load song info:
loadSong(songs[songIndex]);

// Load Song Function:
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};

// Player Controls Functions
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
};

function pauseSong() {
    musicContainer.classList.remove('play');
    play.querySelector('i.fas').classList.add('fa-play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
};

function prevSong() {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
   loadSong(songs[songIndex]);
   playSong();

   console.log(songIndex); // Logging for TESTING
};

function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();

    console.log(songIndex); // Logging for TESTING
} 

// Function to Update & Set the Progress bar:

function updateProgress(e){
    // currentTime and duration are HTML Media elements, use them to calculate progress percentage:
    const { duration, currentTime } = e.srcElement;
    // const currentTime = e.srcElement.currentTime
    // const duration = e.srcElement.duration
    const progressPercent = (currentTime/ duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// When Play button is pressed, add "play" class to music-container.

// EVENT LISTENERS:

// Play/ Pause button"
playBtn.addEventListener('click', () => {
    // check if that "play" class is present in the music container:
    const isPlaying = musicContainer.classList.contains('play');

    // If so, then show Pause button:
    if(isPlaying) {
        pauseSong();
    }
    // If not, song is not playing, so show Play button:
    else {
        playSong();
    }
})

// Previous Song button:
prevBtn.addEventListener('click', prevSong);

// Next Song button:
nextBtn.addEventListener('click', nextSong);

// Progress Bar:
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// Autoplay next song:
audio.addEventListener('ended', nextSong);