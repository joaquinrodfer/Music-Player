const songData = [
    {
        "title": "La difícil",
        "author": "Bad Bunny",
        "url": "music/la-dificil.mp3",
        "cover": "images/la-dificil.png"
    } , {
        "title": "Lorito",
        "author": "ElIlluminari",
        "url": "music/lorito.mp3",
        "cover": "images/lorito.png"
    } , {
        "title": "Ma Vie (feat. Yay)",
        "author": "Kidd Keo",
        "url": "music/ma-vie.mp3",
        "cover": "images/ma-vie.png"
    } , {
        "title": "On My Mind",
        "author": "Diplo & SIDEPIECE",
        "url": "music/on-my-mind.mp3",
        "cover": "images/on-my-mind.png"
    } , 
]

//Variables
let actual = [new Audio(songData[0].url), 0];
let playing = false;

// Getting DOM elements
let cover = document.querySelector(".cover")
let title = document.querySelector(".title")
let author = document.querySelector(".author")
let progressContainer = document.querySelector(".progressBar")
let progress = document.querySelector(".bar")
let time = document.querySelector(".currentTime")
let duration = document.querySelector(".duration")
let play = document.querySelector(".play")
let next = document.querySelector(".next")
let backward = document.querySelector(".backward")
let playLogo = document.querySelector(".fa-circle-play")
let pauseLogo = document.querySelector(".fa-circle-pause")

// Adding event listeners for the buttons
play.addEventListener("click", function () {
    playSong(actual)
})

next.addEventListener("click", function () {
    if (actual[1] == songData.length - 1) {
        actual[1] = 0;
    } else {
        actual[1] += 1;
    }
    changeSong(actual)
    console.log(actual[0])
})

backward.addEventListener("click", function () {
    if (actual[1] == 0) {
        actual[1] = songData.length - 1;
    } else {
        actual[1] -= 1;
    }
    changeSong(actual)
    console.log(actual[0])
})

//Loading song
function loadSong(songIndex) {
    cover.setAttribute("src", songData[songIndex].cover)
    title.textContent = songData[songIndex].title;
    author.textContent = songData[songIndex].author;
}

//Play music
function playSong(actual) {
    if (playing == false) {
        loadSong(actual[1]);
        actual[0].volume = 0.2;
        actual[0].play();
        playing = true;
        playLogo.style.display = "none";
        pauseLogo.style.display = "block";
    } else {
        actual[0].pause();
        playing = false;
        playLogo.style.display = "block";
        pauseLogo.style.display = "none";
    }
}

//Changing song
function changeSong(actual) {
    if (playing) {
        playSong(actual)
        actual[0] = new Audio(songData[actual[1]].url);
        playSong(actual)
    } else {
        actual[0] = new Audio(songData[actual[1]].url);
        playSong(actual)
    }
}

// Modifying the progress bar
function progressBar() {
    progress.style.width = actual[0].currentTime / actual[0].duration * 100 + "%";
}

// Modifying the current time
function changeCurrentTime() {
    let minutes = 0;
    let seconds;

    if(actual[0].currentTime >= 60){
        minutes = parseInt(actual[0].currentTime) / 60;
        seconds = parseInt(actual[0].currentTime) % 60;
    }else{
        seconds = parseInt(actual[0].currentTime)
    }

    if(seconds < 10){
        seconds.toString()
        seconds = "0" + seconds;
    }

    time.textContent = parseInt(minutes) + ":" + seconds;
}

// Modifying the duration
function changeDuration() {
    let minutes = 0;
    let seconds;

    if(actual[0].duration >= 60){
        minutes = parseInt(actual[0].duration) / 60;
        seconds = parseInt(actual[0].duration) % 60;
    }else{
        seconds = parseInt(actual[0].duration)
    }

    if(seconds < 10){
        seconds.toString()
        seconds = "0" + seconds;
    }

    duration.textContent = parseInt(minutes) + ":" + seconds;
}

//Loading the page
function load() {
    cover.setAttribute("src", "images/music.png")
    title.textContent = "Waiting for a song";
    author.textContent = "Waiting for an artist";
    progressContainer.style.width = "70%";
}

//GO!
load()
setInterval('progressBar()', 50);
setInterval('changeCurrentTime()', 50)
setInterval('changeDuration()', 50)