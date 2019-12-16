const API_URL = 'http://localhost:5000/videos';
const videosElement = document.querySelector('#videos');
const filterInput = document.querySelector('#filter');

let allVideos;
let videoElementsById = {};

filterInput.addEventListener('keyup', filterList);

fetch(API_URL)
.then(response => response.json())
.then(videos => {
    allVideos = videos;
    // Create elements for each video
    videos.forEach((video) => {
        // Row container
        const colDiv = document.createElement('div');
        colDiv.className = 'col-4';
        videoElementsById[video.id.videoId] = colDiv;

        // Card container
        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        const videoElement = document.createElement('div');
        videoElement.className = 'ma-1';

        // Extra append for proper styling
        colDiv.appendChild(videoElement);

        // Thumbnail
        const imageRes = video.snippet.thumbnails.standard || video.snippet.thumbnails.medium || video.snippet.thumbnails.high;
        const img = document.createElement('img');
        img.src = imageRes.url;
        img.className = 'card-img-top';

        videoElement.appendChild(img);

        // Title container
        const mediaBody = document.createElement('div');
        mediaBody.className = 'card-body';

        videoElement.appendChild(mediaBody);

        // Title
        const h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.textContent = video.snippet.title;
        mediaBody.appendChild(h5);

        
        videosElement.appendChild(colDiv);
    });
});

function filterList(event) {
    const filter = event.target.value;
    if (allVideos) {
        const regExp = new RegExp(filterInput.value, 'gi');
        allVideos.forEach(video => {
            if (video.snippet.title.match(regExp)) {
                console.log(video);
                // Show video
                videoElementsById[video.id.videoId].style.display = '';
            } else {
                // Hide video
                videoElementsById[video.id.videoId].style.display = 'none';
            }
        });
    }
}