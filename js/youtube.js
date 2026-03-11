(function () {
    var WORKER_URL = 'https://yt-api-worker.resonanceteam.workers.dev';

    var container = document.getElementById('yt-cards');
    if (!container) return;

    function formatCount(n) {
        n = parseInt(n, 10);
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return n.toLocaleString();
    }

    function formatDate(iso) {
        var d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function renderCards(videos) {
        videos.forEach(function (v) {
            var snippet = v.snippet;
            var stats = v.statistics;
            var videoId = v.id;
            var card = document.createElement('a');
            card.className = 'yt-card';
            card.href = 'https://www.youtube.com/watch?v=' + videoId;
            card.target = '_blank';
            card.rel = 'noopener';

            card.innerHTML =
                '<div class="yt-thumb">' +
                    '<img src="' + snippet.thumbnails.medium.url + '" alt="' + snippet.title.replace(/"/g, '&quot;') + '" loading="lazy">' +
                '</div>' +
                '<div class="yt-info">' +
                    '<h3>' + snippet.title + '</h3>' +
                    '<span class="yt-meta">' +
                        '<span class="yt-stat">' + formatDate(snippet.publishedAt) + '</span>' +
                        '<span class="yt-stat">' + formatCount(stats.viewCount) + ' views</span>' +
                        '<span class="yt-stat">' + formatCount(stats.likeCount) + ' likes</span>' +
                        '<span class="yt-stat">' + formatCount(stats.commentCount) + ' comments</span>' +
                    '</span>' +
                '</div>';

            container.appendChild(card);
        });
    }

    function loadVideos() {
        fetch(WORKER_URL)
            .then(function (res) {
                if (!res.ok) throw new Error('Worker error: ' + res.status);
                return res.json();
            })
            .then(function (data) {
                if (data.items) renderCards(data.items);
            })
            .catch(function (err) {
                console.error('Failed to load YouTube videos:', err);
                container.innerHTML =
                    '<p style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; padding: 2rem 0;">' +
                    'Couldn\u2019t load videos right now.</p>';
            });
    }

    loadVideos();
})();
