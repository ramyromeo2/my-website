









const videoContainer = document.getElementById("videoContainer");


function setActiveButton(index) {
  // Get all the navigation buttons
  const buttons = document.querySelectorAll(".nav-button");

  // Remove the "active" class from all buttons
  buttons.forEach((button) => button.classList.remove("active"));

  // Add the "active" class to the clicked button
  
  buttons[index].classList.add("active");
}

function preventScroll(e) {
autoScrollEnabled && e.preventDefault();
}



function setActiveButton(e) {
let t = document.querySelectorAll(".nav-button");
t.forEach(e => e.classList.remove("active")), t[e].classList.add("active");
}

function preventScroll(e) {
autoScrollEnabled && e.preventDefault();
}

let autoScrollEnabled = !1;
const autoScrollBtn = document.getElementById("autoScrollBtn");

async function autoScroll(e) {
if (autoScrollEnabled) {
let t = e,
  o = t.closest(".video-container").nextElementSibling;
if (o && o.querySelector("video")) {
  let l = (t.duration - t.currentTime) * 1e3;
  await new Promise(e => setTimeout(e, l));
  let r = o.getBoundingClientRect().top - videoContainer.getBoundingClientRect().top;
  await new Promise(e => {
    t.addEventListener("seeked", () => {
      e()
    })
  }), t === e && !t.paused && t.currentTime < t.duration && (videoContainer.scrollBy({
    top: r,
    behavior: "smooth"
  }), o.querySelector("video").play(), t.pause(), await autoScroll(o.querySelector("video")))
} else autoScrollEnabled = !1, autoScrollBtn.textContent = "Enable Auto-Scroll", autoScrollBtn.classList.remove("active");
}
}

autoScrollBtn.addEventListener("click", () => {
if (autoScrollEnabled) {
autoScrollEnabled = !1;
autoScrollBtn.textContent = "Enable Auto-Scroll";
autoScrollBtn.classList.remove("active");
autoScrollBtn.style.backgroundColor = ""; // Change background color when disabled
videoContainer.removeEventListener("wheel", preventScroll);
videoContainer.removeEventListener("touchmove", preventScroll);
} else {
autoScrollEnabled = !0;
autoScrollBtn.textContent = "Disable Auto-Scroll";
autoScrollBtn.classList.add("active");
autoScrollBtn.style.backgroundColor = "rgba(0, 123, 255, 0.5)"; // Change background color when enabled
videoContainer.addEventListener("wheel", preventScroll, {
  passive: !1
});
videoContainer.addEventListener("touchmove", preventScroll, {
  passive: !1
});

let e = document.querySelector("video:not([paused])");
e ? autoScroll(e) : autoScroll(document.querySelector(".video"));
}
});


let lastScrollTime = Date.now();


document.addEventListener('keydown', function (e) {
let t = e.key;

if (autoScrollEnabled) {
e.preventDefault();
} else {
const currentVideo = document.querySelector(".video");
const currentTime = Date.now();
const timeSinceLastScroll = currentTime - lastScrollTime;

if (timeSinceLastScroll > 100) {
  if (t === "ArrowDown") {
    const nextVideo = currentVideo.closest(".video-container").nextElementSibling;
    if (nextVideo && nextVideo.querySelector("video") && !nextVideo.nextElementSibling) {
      nextVideo.querySelector("video").play();
      currentVideo.pause();
      const scrollAmount = nextVideo.getBoundingClientRect().top - videoContainer.getBoundingClientRect().top;
      videoContainer.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
      lastScrollTime = currentTime;
    }
  } else if (t === "ArrowUp") {
    const prevVideo = currentVideo.closest(".video-container").previousElementSibling;
    if (prevVideo) {
      prevVideo.querySelector("video").play();
      currentVideo.pause();
      const scrollAmount = prevVideo.getBoundingClientRect().top - videoContainer.getBoundingClientRect().top;
      videoContainer.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
      lastScrollTime = currentTime;
    }
  }
}
}
});



const currentTime = Date.now();
const timeSinceLastScroll = currentTime - lastScrollTime;

const videos21 = document.querySelectorAll("video");
for (const video of videos21) {
video.addEventListener("play", () => {
autoScrollEnabled && autoScroll(video);
});
}



document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video");
  let lastScrollTime = Date.now();

  const handleVideoPlay = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.play();
        video.addEventListener("ended", () => {
          const nextVideo = entry.target.closest(".video-container").nextElementSibling.querySelector("video");
          if (nextVideo) {
            autoScroll(nextVideo);
          }
        });
      } else {
        entry.target.pause();
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleVideoPlay, options);

  videos.forEach((video) => {
    observer.observe(video);
  });
});







var videoEl = null;
let currentVideo = null;
const dropzone = document.querySelector('.dropzone');
const uploadForm = document.getElementById('upload-form');
const uploadIcon = document.querySelector('.upload-icon1');
const overlay = document.querySelector('.overlay');
const cancelBtn = document.querySelector('.cancel1-btn');
const videoGrid = document.querySelector('.all');

// Get all the video elements on the page
// Get all the video elements on the page
const videos = document.querySelectorAll('video');


// Play the given video and pause any previously playing videos
function playVideo(video) {
  if (currentVideo !== video) {
    if (currentVideo) {
      currentVideo.pause();
    }
    video.play();
    currentVideo = video;
  }
}


// Handle drag and drop events
dropzone.addEventListener('dragover', function (event) {
  event.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', function (event) {
  event.preventDefault();
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', function (event) {
  event.preventDefault();
  dropzone.classList.remove('dragover');
  const files = event.dataTransfer.files;
  handleUpload(files);
  hideUploadForm();
});

// Show upload form
uploadIcon.addEventListener('click', function () {
  overlay.classList.add('show');
});

// Hide upload form
function hideUploadForm() {
  overlay.classList.remove('show');
}

// Hide upload form when clicking cancel button
cancelBtn.addEventListener('click', function () {
  hideUploadForm();
});

// Hide upload form when pressing ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    overlay.classList.remove('show');
  }
});

// Handle file upload
uploadForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const files = document.getElementById('videoInput').files;
  handleUpload(files);
  hideUploadForm();
});

function updateProgressBar(event) {
  const progress = document.querySelector('.progress-bar');
  if (!progress) return;

  const percent = Math.round((event.loaded / event.total) * 100);
  progress.style.width = `${percent}%`;
}

// ...Rest of the script

videos.forEach((video) => {
  const playPauseBtn = video.parentNode.querySelector('.play-pause');
  const muteBtn = video.parentNode.querySelector('.mute');
  const progressBar = video.parentNode.querySelector('.progress-bar');
  const progressContainer = video.parentNode.querySelector('.progress-container');

  // Set initial state of the mute button
  video.muted = false; // Change this to false
  muteBtn.classList.add('fa-volume-up'); // Change this to fa-volume-up



  video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  progressContainer.addEventListener('click', (event) => {
    const containerWidth = progressContainer.clientWidth;
    const clickedPosition = event.offsetX;
    const clickedPercentage = (clickedPosition / containerWidth);
    const newTime = video.duration * clickedPercentage;
    video.currentTime = newTime;
  });
});

// ...Rest of the script

let videos3 = [];



function handleUpload(files) {
  const allowedTypes = ['video/mp4', 'video/quicktime'];
  const invalidFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!allowedTypes.includes(file.type)) {
      invalidFiles.push(file);
      continue;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const videoUrl = event.target.result;
      const fileName = file.name.split('.').slice(0, -1).join('.');
      const cleanFileName = fileName.replace(/(\(\d+p\))/i, '').replace(/\.mp4$/, '');

      const videoHTML = `
  <div class="video-container" >
    <video src="${videoUrl}" class="video" loop >
    </video>
    <div class="video-controls"> 
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <i class="fas fa-volume-up mute"></i>

    </div>
  </div>
  `;

      // Append the HTML code to the videoGrid element
      videoGrid.insertAdjacentHTML('beforeend', videoHTML);

      // Get the newly added video element
      const video = videoGrid.querySelector(".video-container:last-child .video");
      const muteBtn = videoGrid.querySelector(".video-container:last-child .mute");
      const progressContainer = videoGrid.querySelector(".video-container:last-child .progress-container");
      const progressBar = videoGrid.querySelector(".video-container:last-child .progress-bar");


      // Add the click event listener to the video element
      video.addEventListener('click', function () {
        console.log("clickedaaaa1");
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        video.muted = !video.muted;
      });

      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.classList.toggle('fa-volume-up');
        muteBtn.classList.toggle('fa-volume-mute');
        muteBtn.classList.toggle('muted');
      });

      video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
      });

      progressContainer.addEventListener('click', (event) => {
        const containerWidth = progressContainer.clientWidth;
        const clickedPosition = event.offsetX;
        const clickedPercentage = (clickedPosition / containerWidth);
        const newTime = video.duration * clickedPercentage;
        video.currentTime = newTime;
      });

      if (document.readyState === "complete") {
        setupVideos();
      } else {
        document.addEventListener("DOMContentLoaded", setupVideos);
      }
    };
    reader.readAsDataURL(file);
  }
}




function setupVideos() {
  const videos = document.querySelectorAll(".video");


  const handleMuteClick = (event) => {

    const video = event.target.parentNode.querySelector(".video");
    video.muted = !video.muted;





    // Handle mute/unmute events
    videos.forEach((video) => {
      const playPauseBtn = video.parentNode.querySelector('.play-pause');
      const muteBtn = video.parentNode.querySelector('.mute');
      const progressBar = video.parentNode.querySelector('.progress-bar');
      const progressContainer = video.parentNode.querySelector('.progress-container');

      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.classList.toggle('muted');
      });

      video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
      });

      progressContainer.addEventListener('click', (event) => {
        const containerWidth = progressContainer.clientWidth;
        const clickedPosition = event.offsetX;
        const clickedPercentage = (clickedPosition / containerWidth);
        const newTime = video.duration * clickedPercentage;
        video.currentTime = newTime;
      });
    });

  };


  let lastScrollTime = Date.now();

  const handleVideoPlay = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleVideoPlay, options);

  videos.forEach((video) => {
    observer.observe(video);
  });




}


document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video");
  let lastScrollTime = Date.now();

  const handleVideoPlay = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleVideoPlay, options);

  videos.forEach((video) => {
    observer.observe(video);
  });

  // Event listener for touch events
  document.addEventListener("touchmove", () => {
    const currentTime = Date.now();
    const timeSinceLastScroll = currentTime - lastScrollTime;
    if (timeSinceLastScroll > 100) {
      observer.disconnect();
      videos.forEach((video) => {
        observer.observe(video);
      });
      lastScrollTime = currentTime;
    }
  });


});
const videos1 = document.querySelectorAll('video');
for (const video of videos1) {
  video.addEventListener('click', function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

const muteButtons = document.querySelectorAll('.mute');
muteButtons.forEach((muteBtn) => {
  muteBtn.addEventListener('click', () => {
    const video = muteBtn.closest('.video-container').querySelector('video');
    video.muted = !video.muted;
    muteBtn.classList.toggle('fa-volume-up');
    muteBtn.classList.toggle('fa-volume-mute');
    muteBtn.classList.toggle('muted');
  });
});

