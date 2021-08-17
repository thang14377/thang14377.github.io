const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const player = $('.main-bar')
const tabNav = $$('.nav-item');
const tabLists = $$('.tablist');
const tabActive2 = $('.nav-item.active2');
const heading = $('.music-textname h5')
const sub = $('.music-textname p')
const cdThumb = $('.music-img')
const audio = $('#audio')
const volumBtn = $('.volum')
const volumArea =$('.volumbox')
const volumArea2 =$('.volumbox.mute')
const volumUp = $('.volumbox .fa-volume-up')
const volumMute = $('.volumbox.mute .fa-volume-mute')
const playBtn = $('.play-pause')
const progress = $('.progress-bar')
const progressArea = $('.progress-area')
const nextBtn = $('.music-icon .ti-control-skip-forward')
const prevBtn = $('.music-icon .ti-control-skip-backward')
const randomBtn = $('.music-icon .ti-control-shuffle')
const loopBtn = $('.music-icon .ti-loop')
const playList = $('.all-musicplay')
const icon = $('.allicon')

tabNav.forEach((tab,index) => {
    const tabList = tabLists[index]
    tab.onclick = function() {
        $('.nav-item.active2').classList.remove('active2')
        $('.tablist.active2').classList.remove('active2')

        this.classList.add('active2');
        tabList.classList.add('active2');
    }
});

    const app = 
    {
        isLoop: false,
        isPlaying: false,
        isRandom: false,
        config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
        currentIndex: 0,
        setConfig: function(key,value) {
            this.config[key] = value;
            localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
        },
        songs: 
        [
                    {
                        name: '3017-1',
                        singer: 'Dương/Nâu',
                        path: './assets/music/1.mp3',
                        image:'./assets/img/3017-1.jpg'
                    },
                    {
                        name: '3017-3',
                        singer: 'Avicii',
                        path: './assets/music/2.mp3',
                        image:'./assets/img/3017-3.jpg'
                    },
                    {
                        name: '3017-2',
                        singer: 'Nâu,Duongg,Titie',
                        path: './assets/music/3.mp3',
                        image:'data:image/jpeg;base64,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'
                    },
                    {
                        name: 'Ước Gì',
                        singer: 'JAYKII ',
                        path: './assets/music/4.mp3',
                        image:'./assets/img/uocgi.jpg'
                    },
                    {
                        name: 'Sài gòn hôm nay mưa',
                        singer: 'Jsol & Hoàng Yến',
                        path: './assets/music/5.mp3',
                        image:'https://avatar-ex-swe.nixcdn.com/song/2021/05/30/2/6/7/5/1622365032910_640.jpg'
                    },
                    {
                        name: 'Crush 2',
                        singer: 'W/n ft Tez',
                        path: './assets/music/6.mp3',
                        image:'data:image/jpeg;base64,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'
                    },
                    {
                        name: 'Tháng Năm',
                        singer: 'Soobij',
                        path: './assets/music/7.mp3',
                        image:'https://o.vdoc.vn/data/image/2020/12/16/loi-bai-hat-thang-nam-soobin-hoang-son-700.jpg'
                    },
                    {
                        name: 'Đã lỡ yêu em nhiều',
                        singer: 'JútaTee',
                        path: './assets/music/8.mp3',
                        image:'https://i1.sndcdn.com/artworks-000259082795-zaq81t-t500x500.jpg'
                    },
                    {
                        name: 'Mẹ Ơi Cho Con Về',
                        singer: ' Bùi Vĩnh Phúc',
                        path: './assets/music/9.mp3',
                        image:'https://i.ytimg.com/vi/Vgzz9pHqN2g/hqdefault.jpg'
                    },
                    {
                        name: 'Thì Thôi',
                        singer: 'Reddy',
                        path: './assets/music/10.mp3',
                        image:'https://i.ytimg.com/vi/iB1rxetW5gA/maxresdefault.jpg'
                    },
                    {
                        name: 'Tình Khúc Vàng',
                        singer: 'Jaykii',
                        path: './assets/music/11.mp3',
                        image:'https://i.ytimg.com/vi/14STlznvJxA/maxresdefault.jpg'
                    }
                    
        ],
        render: function() {
            
            const htmls = this.songs.map((song,index) => {
                 return `
                 <div class="box-musicplay ${index === this.currentIndex ? 'active4': ''}" data-index = "${index}">
                 <!-- Song -->
                 <div class="info-musicplay">
                     <div class="texts-infomusic">
                         <div class="imgmn-music" style="background-image: url('${song.image}')">
                            <div class="hoverplay">
                                <i class="fas fa-play"></i>
                            </div>
                         </div>
                         <div class="text-musics">
                             <h5 class="song">${song.name}</h5>
                             <p class="author">${song.singer}</p>
                         </div>
                     </div>
                     <div class="time-musicplay" id="${index}">
                         <p></p>
                     </div>
                 </div>
                 <div class="btn-musicplay">
                     <i class="ti-microphone-alt"></i>
                     <i class="ti-heart"></i>
                     <i class="ti-more-alt"></i>
                 </div>
             </div>
               `
            })
            playList.innerHTML = htmls.join('')
        },
        defineProperties: function() {
            Object.defineProperty(this, 'currentSong', {
                get: function() {
                    return this.songs[this.currentIndex]
                }
            })
        },
        handleEvents: function() {
            const _this = this
            // xử lí khi play 
            playBtn.onclick = function() {
                if(_this.isPlaying) {
                    audio.pause()
                }else {
                    audio.play()
                }
            }
 
            // xử lý cd quay 
            const cdThumbAnimate = cdThumb.animate([
                {transform: 'rotate(360deg)'}
            ], {
                duration:10000,
                iterations : Infinity
            })
            cdThumbAnimate.pause()
            // Playing 
            audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add("playing")
                icon.classList.add("active5")
                cdThumbAnimate.play()
            }
            // Pause
            audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove("playing")
                icon.classList.remove("active5")
                cdThumbAnimate.pause()
            }

            // Vomlum
            volumBtn.onchange = function(e) {
                let currentValum = e.target.value
                audio.volume = currentValum / 100
                if(currentValum == 0) {
                    volumArea.classList.add('mute')
                }else {
                    volumArea.classList.remove('mute')
                }
            }
            volumUp.onclick = function() {
                let currentValum = volumBtn.value
                currentValum = 0
                audio.volume = currentValum
                volumArea.classList.add('mute')
            }
            
            
            // tiến độ bài hát 
            audio.addEventListener("timeupdate",(e) => {
                const currentTime = e.target.currentTime
                const duration = e.target.duration
                let progressWidth = (currentTime / duration) * 100
                progress.style.width = `${progressWidth}%`

                let musicCurrentTime = $(".current"),
                musicDuartion = $(".duration");
                audio.addEventListener("loadeddata", ()=>{
                    // update song total duration
                    let mainAdDuration = audio.duration;
                    let totalMin = Math.floor(mainAdDuration / 60);
                    let totalSec = Math.floor(mainAdDuration % 60);
                    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
                    totalSec = `0${totalSec}`;
                    }
                    musicDuartion.innerText = `${totalMin}:${totalSec}`;
                });
                // update playing current song
                let currentMin = Math.floor(currentTime / 60);
                let currentSec = Math.floor(currentTime % 60);
                if(currentSec < 10){ //if sec is less than 10 then add 0 before it
                currentSec = `0${currentSec}`;
                }
                musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
            })
            
            // xử lí click tua 
            progressArea.addEventListener("click",(e) => {
                let progressWidthval = progressArea.clientWidth
                let clickedOffset = e.offsetX
                let songDuration = audio.duration

                audio.currentTime = (clickedOffset / progressWidthval) * songDuration
            })
            //khi next song 
            nextBtn.onclick = function() {
                if(_this.isRandom) {
                    _this.playRandomSong()
                    audio.play()
                }
                else {
                    _this.nextSong()
                    audio.play()
                    _this.render()
                    _this.loadDurationSong(_this.songs)
                    _this.scrollToActiveSong()
                }   
            }

            //khi Prev song 
            prevBtn.onclick = function() {
                    if(_this.isRandom) {
                        _this.playRandomSong()
                        audio.play()
                    }
                    else {
                        _this.prevSong()
                        audio.play()
                        _this.render()
                        _this.loadDurationSong(_this.songs)
                        _this.scrollToActiveSong()
                    }   
            }
            //khi random
             randomBtn.onclick = function(e) {
                 _this.isRandom = !_this.isRandom
                 _this.setConfig('isRandom',_this.isRandom)
                 randomBtn.classList.toggle('active3', _this.isRandom)
             }
            
            // Tự động Next khi kết thúc bài hát
            audio.onended = function() {
                if(_this.isLoop){
                    setTimeout(function () {
                        audio.play()
                    },1000)
                }
                else{
                    setTimeout(function() {
                        nextBtn.click()
                    },1000)
                }
            }

            // Lắng nghe click vào playlist
            playList.onclick = function(e) {
                const songNode = e.target.closest('.box-musicplay:not(.active4)')
                const optionNode = e.target.closest('.btn-musicplay')
                if( songNode || optionNode){
                        if(songNode) {
                            _this.currentIndex = Number(songNode.dataset.index)
                            _this.loadCurrentSong()
                            audio.play()
                            _this.render()
                            _this.loadDurationSong(_this.songs)
                        }
                        if(optionNode) {

                        }
                }
            }

            // xử lí loop song
            loopBtn.onclick = function(e) {
                _this.isLoop = !_this.isLoop
                _this.setConfig('isLoop',_this.isLoop)
                loopBtn.classList.toggle('active3',_this.isLoop)
            }
        },
        loadconfig: function() {
            this.isRandom = this.config.isRandom
            this.isLoop = this.config.isLoop
            loopBtn.classList.toggle('active3',this.isLoop)
            randomBtn.classList.toggle('active3', this.isRandom)
        },

        scrollToActiveSong: function() {
            setTimeout(() => {
                $('.box-musicplay.active4').scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                })
            },500)
        },
        loadCurrentSong: function() {
            heading.textContent = this.currentSong.name
            sub.textContent = this.currentSong.singer
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
        },
        // Time duration song 
        loadDurationSong: function(songs) {
            let listAu = document.getElementById('listAudio')
            let timeMusic =document.getElementsByClassName("time-musicplay");
            for(let i =0 ; i < timeMusic.length;i++) {
                let au = document.createElement('audio')
                au.src = songs[i].path;
                au.setAttribute("id",`au${i}`)
                listAu.appendChild(au);
                let timer = document.getElementById(`au${i}`)
                timer.addEventListener("loadeddata", ()=>{
                    let mainAdDuration = timer.duration;
                    let totalMin = Math.floor(mainAdDuration / 60);
                    let totalSec = Math.floor(mainAdDuration % 60);
                    if(totalSec < 10){ 
                    totalSec = `0${totalSec}`;
                    }
                    timeMusic[i].innerText = `0${totalMin}:${totalSec}`;
                });
            }
            listAu.innerHTML = ""
        },
        nextSong: function() {
            this.currentIndex++
            if(this.currentIndex >= this.songs.length ){
                this.currentIndex = 0
            }
            this.loadCurrentSong()
        },
        prevSong: function() {
            this.currentIndex--
            if(this.currentIndex <= 0  ){
                this.currentIndex = this.songs.length - 1 
            }
            this.loadCurrentSong()
        },
        playRandomSong: function() {
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while (newIndex === this.currentIndex)

            this.currentIndex = newIndex
            this.loadCurrentSong()
            this.render()
            this.loadDurationSong(this.songs)
            this.scrollToActiveSong()
        },
        start: function() {
            // gán cấu hình từ config vào ứng dụng
            this.loadconfig()

            // định nghĩa thuộc tính object
            this.defineProperties()

            // Lắng nghe xử lí sự kiện 
            this.handleEvents()
            
            // tải thông tin bài hát đầu tiên vao UI
            this.loadCurrentSong()
            
            // render playlist
            this.render()
            this.loadDurationSong(this.songs)
        }
    }
    app.start()

            