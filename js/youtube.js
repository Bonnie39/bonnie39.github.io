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
        container.innerHTML = '';
        if (!Array.isArray(videos) || videos.length === 0) {
            // If videos is an object with an error property, show the error
            var errorMsg = (videos && videos.error) ? String(videos.error) : 'No videos available at this time.';
            container.innerHTML =
                '<p style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; padding: 2rem 0;">' +
                errorMsg + '</p>';
            return;
        }
        videos.forEach(function (v) {
            var snippet = v.snippet;
            var stats = v.statistics;
            var videoId = v.id;
            var card = document.createElement('a');
            card.className = 'yt-card';
            card.href = 'https://www.youtube.com/watch?v=' + videoId;
            card.target = '_blank';
            card.rel = 'noopener';

            var statsHtml = '';
            if (stats && stats.viewCount) {
                statsHtml =
                    '<span class="yt-stats">' +
                        '<span class="yt-stat">' +
                            '<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>' +
                            formatCount(stats.viewCount) +
                        '</span>' +
                        '<span class="yt-stat">' +
                            '<svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11a2 2 0 00-2-2h-6.31l.95-4.57.03-.32a1.49 1.49 0 00-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>' +
                            formatCount(stats.likeCount) +
                        '</span>' +
                        '<span class="yt-stat">' +
                            '<svg viewBox="0 0 24 24"><path d="M21.99 4A2 2 0 0020 2H4a2 2 0 00-2 2v12a2 2 0 002 2h14l4 4-.01-18z"/></svg>' +
                            formatCount(stats.commentCount) +
                        '</span>' +
                    '</span>';
            }

            card.innerHTML =
                '<div class="yt-thumb">' +
                    '<img src="' + snippet.thumbnails.medium.url + '" alt="' + snippet.title.replace(/"/g, '&quot;') + '" loading="lazy">' +
                '</div>' +
                '<div class="yt-info">' +
                    '<h3>' + snippet.title + '</h3>' +
                    '<div class="yt-meta">' +
                        '<span class="yt-date">' +
                            '<svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>' +
                            formatDate(snippet.publishedAt) +
                        '</span>' +
                        statsHtml +
                    '</div>' +
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
                if (Array.isArray(data.items) && data.items.length > 0) {
                    renderCards(data.items);
                } else if (data && data.error) {
                    renderCards({ error: data.error });
                } else {
                    renderCards([]);
                }
            })
            .catch(function (err) {
                console.error('Failed to load YouTube videos:', err);
                container.innerHTML =
                    '<p style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; padding: 2rem 0;">' +
                    (err && err.message ? err.message : 'Couldn\u2019t load videos right now.') + '</p>';
            });
    }

    loadVideos();
})();
