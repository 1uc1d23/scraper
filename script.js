const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const season = urlParams.get('s');   // Grabs the season number
const episode = urlParams.get('e');  // Grabs the episode number
const video = document.getElementById('video');

if (movieId) {
    // 1. Start with the basic movie URL
    let apiUrl = `/api?id=${movieId}`;

    // 2. If season and episode exist, turn it into a TV series request
    if (season && episode) {
        apiUrl += `&s=${season}&e=${episode}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error || !data.url) {
                alert("Error from server: " + (data.error || "No stream URL found"));
                return;
            }

            const streamUrl = data.url; 

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(streamUrl);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = streamUrl;
            }
        })
        .catch(err => console.error("Error loading stream:", err));
} else {
    alert("Please add an ID to the URL!\nMovie Example: ?id=550\nTV Example: ?id=1399&s=1&e=1");
}
