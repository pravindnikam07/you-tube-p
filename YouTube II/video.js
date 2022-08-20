let videoData = JSON.parse(localStorage.getItem("video"));
let div = document.getElementById('videoInfo');
let iframe = document.getElementById('ifr');
let playVideo = () => {
    iframe.src = `https://www.youtube.com/embed/${videoData.videoId}`;
    iframe.title = video.title;
    let v_title = document.createElement('h3');
    v_title.innerText = videoData.title;
    let channel_title = document.createElement('p');
    channel_title.innerText = videoData.channelTitle;
    div.append(v_title,channel_title);
}
playVideo();