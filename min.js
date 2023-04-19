document.addEventListener("DOMContentLoaded",function(){let e=document.querySelectorAll(".video-container");for(let t=0;t<e.length;t++){let o=Math.floor(1280*Math.random())+1,l=o.toString(),r=e[t].querySelector(".video");r.src=`../shorts_videos/${l}.mp4`,r.poster=`../shorts-posters/${l}.jpg`,r.setAttribute("data-src",`../shorts_videos/${l}.mp4`)}});const videoContainer=document.getElementById("videoContainer");function setActiveButton(e){let t=document.querySelectorAll(".nav-button");t.forEach(e=>e.classList.remove("active")),t[e].classList.add("active")}function preventScroll(e){autoScrollEnabled&&e.preventDefault()}function setActiveButton(e){let t=document.querySelectorAll(".nav-button");t.forEach(e=>e.classList.remove("active")),t[e].classList.add("active")}function preventScroll(e){autoScrollEnabled&&e.preventDefault()}let autoScrollEnabled=!1;const autoScrollBtn=document.getElementById("autoScrollBtn");async function autoScroll(e){if(autoScrollEnabled){let t=e,o=t.closest(".video-container").nextElementSibling;if(o&&o.querySelector("video")){let l=(t.duration-t.currentTime)*1e3;await new Promise(e=>setTimeout(e,l));let r=o.getBoundingClientRect().top-videoContainer.getBoundingClientRect().top;await new Promise(e=>{t.addEventListener("seeked",()=>{e()})}),t===e&&!t.paused&&t.currentTime<t.duration&&(videoContainer.scrollBy({top:r,behavior:"smooth"}),o.querySelector("video").play(),t.pause(),await autoScroll(o.querySelector("video")))}else autoScrollEnabled=!1,autoScrollBtn.textContent="Enable Auto-Scroll",autoScrollBtn.classList.remove("active")}}autoScrollBtn.addEventListener("click",()=>{if(autoScrollEnabled)autoScrollEnabled=!1,autoScrollBtn.textContent="Enable Auto-Scroll",autoScrollBtn.classList.remove("active"),autoScrollBtn.style.backgroundColor="",videoContainer.removeEventListener("wheel",preventScroll),videoContainer.removeEventListener("touchmove",preventScroll);else{autoScrollEnabled=!0,autoScrollBtn.textContent="Disable Auto-Scroll",autoScrollBtn.classList.add("active"),autoScrollBtn.style.backgroundColor="rgba(0, 123, 255, 0.5)",videoContainer.addEventListener("wheel",preventScroll,{passive:!1}),videoContainer.addEventListener("touchmove",preventScroll,{passive:!1});let e=document.querySelector("video:not([paused])");e?autoScroll(e):autoScroll(document.querySelector(".video"))}});let lastScrollTime=Date.now();document.addEventListener("keydown",function(e){let t=e.key;if(autoScrollEnabled)e.preventDefault();else{let o=document.querySelector(".video"),l=Date.now(),r=l-lastScrollTime;if(r>100){if("ArrowDown"===t){let n=o.closest(".video-container").nextElementSibling;if(n&&n.querySelector("video")&&!n.nextElementSibling){n.querySelector("video").play(),o.pause();let i=n.getBoundingClientRect().top-videoContainer.getBoundingClientRect().top;videoContainer.scrollBy({top:i,behavior:"smooth"}),lastScrollTime=l}}else if("ArrowUp"===t){let a=o.closest(".video-container").previousElementSibling;if(a){a.querySelector("video").play(),o.pause();let d=a.getBoundingClientRect().top-videoContainer.getBoundingClientRect().top;videoContainer.scrollBy({top:d,behavior:"smooth"}),lastScrollTime=l}}}}});const currentTime=Date.now(),timeSinceLastScroll=currentTime-lastScrollTime,videos21=document.querySelectorAll("video");for(const video of videos21)video.addEventListener("play",()=>{autoScrollEnabled&&autoScroll(video)});document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll(".video");Date.now();let t=(e,t)=>{e.forEach(e=>{if(e.isIntersecting){let t=e.target;t.play(),t.addEventListener("ended",()=>{let t=e.target.closest(".video-container").nextElementSibling.querySelector("video");t&&autoScroll(t)})}else e.target.pause()})},o={root:null,rootMargin:"0px",threshold:.5},l=new IntersectionObserver(t,o);e.forEach(e=>{l.observe(e)})});var videoEl=null;let currentVideo=null;const dropzone=document.querySelector(".dropzone"),uploadForm=document.getElementById("upload-form"),uploadIcon=document.querySelector(".upload-icon1"),overlay=document.querySelector(".overlay"),cancelBtn=document.querySelector(".cancel1-btn"),videoGrid=document.querySelector(".all"),videos=document.querySelectorAll("video");function playVideo(e){currentVideo!==e&&(currentVideo&&currentVideo.pause(),e.play(),currentVideo=e)}function hideUploadForm(){overlay.classList.remove("show")}function updateProgressBar(e){let t=document.querySelector(".progress-bar");if(!t)return;let o=Math.round(e.loaded/e.total*100);t.style.width=`${o}%`}dropzone.addEventListener("dragover",function(e){e.preventDefault(),dropzone.classList.add("dragover")}),dropzone.addEventListener("dragleave",function(e){e.preventDefault(),dropzone.classList.remove("dragover")}),dropzone.addEventListener("drop",function(e){e.preventDefault(),dropzone.classList.remove("dragover");let t=e.dataTransfer.files;handleUpload(t),hideUploadForm()}),uploadIcon.addEventListener("click",function(){overlay.classList.add("show")}),cancelBtn.addEventListener("click",function(){hideUploadForm()}),document.addEventListener("keydown",e=>{"Escape"===e.key&&overlay.classList.remove("show")}),uploadForm.addEventListener("submit",function(e){e.preventDefault();let t=document.getElementById("videoInput").files;handleUpload(t),hideUploadForm()}),videos.forEach(e=>{e.parentNode.querySelector(".play-pause");let t=e.parentNode.querySelector(".mute"),o=e.parentNode.querySelector(".progress-bar"),l=e.parentNode.querySelector(".progress-container");e.muted=!1,t.classList.add("fa-volume-up"),e.addEventListener("timeupdate",()=>{let t=e.currentTime/e.duration*100;o.style.width=`${t}%`}),l.addEventListener("click",t=>{let o=l.clientWidth,r=t.offsetX,n=r/o,i=e.duration*n;e.currentTime=i})});let videos3=[];function handleUpload(e){let t=["video/mp4","video/quicktime"],o=[];for(let l=0;l<e.length;l++){let r=e[l];if(!t.includes(r.type)){o.push(r);continue}let n=new FileReader;n.onload=function(e){let t=e.target.result,o=r.name.split(".").slice(0,-1).join(".");o.replace(/(\(\d+p\))/i,"").replace(/\.mp4$/,"");let l=`
 <div class="video-container" >
   <video src="${t}" class="video" loop >
   </video>
   <div class="video-controls"> 
     <div class="progress-container">
       <div class="progress-bar"></div>
     </div>
     <i class="fas fa-volume-up mute"></i>

   </div>
 </div>
 `;videoGrid.insertAdjacentHTML("beforeend",l);let n=videoGrid.querySelector(".video-container:last-child .video"),i=videoGrid.querySelector(".video-container:last-child .mute"),a=videoGrid.querySelector(".video-container:last-child .progress-container"),d=videoGrid.querySelector(".video-container:last-child .progress-bar");n.addEventListener("click",function(){console.log("clickedaaaa1"),n.paused?n.play():n.pause(),n.muted=!n.muted}),i.addEventListener("click",()=>{n.muted=!n.muted,i.classList.toggle("fa-volume-up"),i.classList.toggle("fa-volume-mute"),i.classList.toggle("muted")}),n.addEventListener("timeupdate",()=>{let e=n.currentTime/n.duration*100;d.style.width=`${e}%`}),a.addEventListener("click",e=>{let t=a.clientWidth,o=e.offsetX,l=o/t,r=n.duration*l;n.currentTime=r}),"complete"===document.readyState?setupVideos():document.addEventListener("DOMContentLoaded",setupVideos)},n.readAsDataURL(r)}}function setupVideos(){let e=document.querySelectorAll(".video");Date.now();let t=(e,t)=>{e.forEach(e=>{e.isIntersecting?e.target.play():e.target.pause()})},o=new IntersectionObserver(t,{root:null,rootMargin:"0px",threshold:.5});e.forEach(e=>{o.observe(e)})}document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll(".video"),t=Date.now(),o=(e,t)=>{e.forEach(e=>{e.isIntersecting?e.target.play():e.target.pause()})},l={root:null,rootMargin:"0px",threshold:.5},r=new IntersectionObserver(o,l);e.forEach(e=>{r.observe(e)}),document.addEventListener("touchmove",()=>{let o=Date.now(),l=o-t;l>100&&(r.disconnect(),e.forEach(e=>{r.observe(e)}),t=o)})});const videos1=document.querySelectorAll("video");for(const video of videos1)video.addEventListener("click",function(){video.paused?video.play():video.pause()});const muteButtons=document.querySelectorAll(".mute");muteButtons.forEach(e=>{e.addEventListener("click",()=>{let t=e.closest(".video-container").querySelector("video");t.muted=!t.muted,e.classList.toggle("fa-volume-up"),e.classList.toggle("fa-volume-mute"),e.classList.toggle("muted")})});