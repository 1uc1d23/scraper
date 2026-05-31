const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const video = document.getElementById('video');

if (movieId) {
    // Rewritten to match the vercel.json rewrite rule
    const apiUrl = `/api?id=${movieId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
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
    alert("Please add a movie ID to the URL! Example: ?id=550");
}
