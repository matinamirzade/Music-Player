const musics = [
    {
        name : "jadeye yektarafe",
        singer : "morteza pashaie",
        cover : "./images/images.jpg",
        audio : new Audio("songs/Morteza Pashaei - Jadeye Yektarafe (320).mp3")
    },
    {
        name : "nafas",
        singer : "morteza pashaie",
        cover : "./images/R.jpg",
        audio : new Audio("songs/Morteza Pashaei - Nafas (320).mp3")
    },
    {
        name : "yeki hast",
        singer : "morteza pashaie",
        cover : "./images/OIP.webp",
        audio : new Audio("songs/Morteza Pashaei - Yeki Hast.mp3")
    },
    {
        name : "man oghde i am",
        singer : "golzar",
        cover : "./images/ed-sheeren-golzar-ahmagh-man-oghdeiam-1024x1024.jpg",
        audio :new Audio("./songs/Ed Sheeren ft Golzar - Azizam(Ahmagh) (128).mp3")
    },
    {
        name : "nazi hamdam man",
        singer : "ali graili",
        cover : "./images/Ali-Geraieli-Nazi-Hamdame-Man-150x150.jpg",
        audio :new Audio("./songs/Ali Geraieli - Nazi Hamdame Man [SevilMusic].mp3")
    }
]

const cover = document.querySelector("#music-cover")
const name = document.querySelector("#music-name")
const from = document.querySelector("#music-singer")
const range = document.querySelector("#music-time")
const backBTN = document.querySelector("#back-btn")
const playBTN = document.querySelector("#play-btn")
const nextBTN = document.querySelector("#next-btn")

let currentMusic = 0

let audio = musics[currentMusic].audio
cover.src = musics[currentMusic].cover
name.innerText = musics[currentMusic].name
from.innerText = musics[currentMusic].singer

audio.addEventListener("canplay" , ()=>{
    range.max = audio.duration
    console.log(audio.duration)
})

audio.addEventListener("timeupdate" , ()=>{
    range.value = audio.currentTime;
})

playBTN.addEventListener("click" , ()=>{
    
    if(audio.paused){
        audio.play();
        playBTN.classList.replace("fa-play","fa-pause")
        cover.classList.add("playing")
    }else{
        audio.pause();
        playBTN.classList.replace("fa-pause","fa-play")
        cover.classList.remove("playing")
    }
})

range.addEventListener("change" , ()=>{
    audio.currentTime = range.value;
})

audio.addEventListener("ended" , ()=>{
    changeMusic("next" , true)
})

nextBTN.addEventListener("click" , ()=> {
    changeMusic("next")
})

backBTN.addEventListener("click" , ()=> {
    changeMusic("back")
})

function changeMusic(action ,autoPlay = false){
    let isPaused = audio.paused
    audio.pause()
    audio.currentTime = 0

    if (action === "next"){
        if (currentMusic == musics.length -1){
            currentMusic = 0
        }else{
            currentMusic += 1
        }
    }else if(action === "back"){
        if (currentMusic == 0){
            currentMusic = musics.length -1
        }else{
            currentMusic -=1
        }
    }



audio = musics[currentMusic].audio
cover.src = musics[currentMusic].cover
name.innerText = musics[currentMusic].name
from.innerText = musics[currentMusic].singer

audio.oncanplay = () => {
    range.max = audio.duration
}

audio.ontimeupdate = () => {
    range.value = audio.currentTime
}

    if (!isPaused || autoPlay){
        audio.play()
    }
}