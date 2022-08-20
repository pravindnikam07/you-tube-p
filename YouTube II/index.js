const api_key = `AIzaSyD1cI9bo22R495xsExKRRqk3eZBH2n6X0Y`;
// search link
// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=thor&key=[YOUR_API_KEY]' 
// let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`;

// popular video link
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=[YOUR_API_KEY]
let url_p = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=${api_key}`;


let getData = async (url, query = "trending") => {
    try{
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data.items);
        return data.items;
    }catch(error){
        console.log(error);
    }
}

let main = async (url) => {
    
    let res = getData(url, query);
    let data = await res;
    // console.log(data);
    displayData(data);
    
}
main(url_p);
// Debounce function to inmprove process according to search speed
let id;
function debounceFunction(func,delay){
    let query = document.getElementById('query').value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`;
    if(id){
        clearTimeout(id);
    }
    id = setTimeout(function(){
        if(query!=='')
            func(url);
        else{
            main(url_p);
        }
    },delay);
}

// append data to page
let displayData = (data) => {
    let cont = document.getElementById('results');
    cont.innerHTML = null;
    data.forEach(({id:{videoId},snippet:{title,channelTitle,thumbnails:{high:{url}}}}) => {
        // console.log(videoId);
        // console.log(title);
        let cart = document.createElement('div');
        let img = document.createElement('img');
        img.src = url;
        let v_title = document.createElement('h3');
        v_title.innerText = title;
        let channel_title = document.createElement('p');
        channel_title.innerText = channelTitle;

        cart.onclick = () => {
            let curr_video_data = {
                videoId,
                title,
                channelTitle
            }
            playVideo(curr_video_data);
        }
        
        cart.append(img,v_title,channel_title);
        cont.append(cart);

    });
}

// set click video data to local storage
let playVideo = (curr_video_data) => {
    localStorage.setItem('video',JSON.stringify(curr_video_data));
    window.location.href = 'video.html'
}
