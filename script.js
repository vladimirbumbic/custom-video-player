const videoPlayer = document.querySelector('.video_player');
const video = document.querySelector('.video');
const progressAreaTime = document.querySelector('.progressAreaTime');
const controls = document.querySelector('.controls');
const progressArea = document.querySelector('.progress-area');
const progressBar = document.querySelector('.progress-bar');
const playPause = document.querySelector('.play_pause');
const volume = document.querySelector('.volume');
const volumeRange = document.querySelector('.volume_range');
const current = document.querySelector('.current');
const duration = document.querySelector('.duration');
const settingsCircle = document.querySelector('.settingsCircle');
const piP = document.querySelector('.picture_in_picutre');
const fullscreen = document.querySelector('.fullscreen');
const settings = document.querySelector('.settings');
const playback = document.querySelectorAll('.playback li');

// play/ pause

playVideo = () => {
    playPause.innerHTML = 'pause';
    videoPlayer.classList.add('paused');
    video.play();
};

pauseVideo = () => {
    playPause.innerHTML = 'play_arrow';
    videoPlayer.classList.remove('paused');
    video.pause();
};

playPause.addEventListener('click', () => {
    const isVideoPaused = videoPlayer.classList.contains('paused');
    if (isVideoPaused) {
        pauseVideo();
    } else {
        playVideo();
    }
});

// video load/ duration

video.addEventListener('loadeddata', (e) => {
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    if (totalSec < 10) {
        totalSec = '0' + totalSec;
    } else {
        totalSec;
    }
    duration.innerHTML = `${totalMin} : ${totalSec}`;
});

video.addEventListener('timeupdate', (e) => {
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);

    if (currentSec < 10) {
        currentSec = '0' + currentSec;
    } else {
        currentSec;
    }
    current.innerHTML = `${currentMin} : ${currentSec}`;

    let videoDuration = e.target.duration;

    let progress = (currentVideoTime / videoDuration) * 100;
    progressBar.style.width = `${progress}%`;
});

// progress bar click and update video

progressArea.addEventListener('click', (e) => {
    let videoDuration = video.duration;
    let progressWidth = progressArea.clientWidth;
    let offsetX = e.offsetX;
    video.currentTime = (offsetX / progressWidth) * videoDuration;
});

// volume

changeVolume = () => {
    video.volume = volumeRange.value / 100;
    if (volumeRange.value == 0) {
        volume.innerHTML = 'volume_off';
    } else if (volumeRange.value < 49) {
        volume.innerHTML = 'volume_down';
    } else {
        volume.innerHTML = 'volume_up';
    }
};

muteVolume = () => {
    if (volumeRange.value == 0) {
        volumeRange.value = 50;
        video.volume = 0.5;
        volume.innerHTML = 'volume_up';
    } else {
        volumeRange.value = 0;
        video.volume = 0;
        volume.innerHTML = 'volume_off';
    }
};

volumeRange.addEventListener('change', () => {
    changeVolume();
});

volume.addEventListener('click', () => {
    muteVolume();
});

// Update progress area time and display on mouse move

progressArea.addEventListener('mousemove', (e) => {
    let progressWidth = progressArea.clientWidth;
    let pr = e.offsetX;
    progressAreaTime.style.setProperty('--progressT', `${pr}px`);
    progressAreaTime.style.display = 'block';
    let videoDuration = video.duration;
    let progressTime = Math.floor((pr / progressWidth) * videoDuration);
    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);

    if (currentSec < 10) {
        currentSec = '0' + currentSec;
    } else {
        currentSec;
    }

    progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
});

progressArea.addEventListener('mouseleave', () => {
    progressAreaTime.style.display = 'none';
});

// picture in picture

piP.addEventListener('click', () => {
    video.requestPictureInPicture();
});

// full screen

fullscreen.addEventListener('click', () => {
    if (!videoPlayer.classList.contains('fullScreen')) {
        videoPlayer.classList.add('fullScreen');
        fullscreen.innerHTML = 'fullscreen_exit';
        videoPlayer.requestFullscreen();
    } else {
        videoPlayer.classList.remove('fullScreen');
        fullscreen.innerHTML = 'fullscreen';
        document.exitFullscreen();
    }
});

video.addEventListener('dblclick', () => {
    if (!videoPlayer.classList.contains('fullScreen')) {
        videoPlayer.classList.add('fullScreen');
        fullscreen.innerHTML = 'fullscreen_exit';
        videoPlayer.requestFullscreen();
    } else {
        videoPlayer.classList.remove('fullScreen');
        fullscreen.innerHTML = 'fullscreen';
        document.exitFullscreen();
    }
});

// open settings
settingsCircle.addEventListener('click', () => {
    settings.classList.toggle('active');
    settingsCircle.classList.toggle('active');
});

// playback

playback.forEach((event) => {
    event.addEventListener('click', () => {
        removeActiveClass();
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        video.playbackRate = speed;
    });
});

removeActiveClass = () => {
    playback.forEach((event) => {
        event.classList.remove('active');
    });
};

// Mouse move controls

videoPlayer.addEventListener('mouseover', () => {
    controls.classList.add('active');
});

videoPlayer.addEventListener('mouseleave', () => {
    if (videoPlayer.classList.contains('paused')) {
        if (settingsCircle.classList.contains('active')) {
            controls.classList.add('active');
        } else {
            controls.classList.remove('active');
        }
    } else {
        controls.classList.add('active');
    }
});

if (videoPlayer.classList.contains('paused')) {
    if (settingsCircle.classList.contains('active')) {
        controls.classList.add('active');
    } else {
        controls.classList.remove('active');
    }
} else {
    controls.classList.add('active');
}
