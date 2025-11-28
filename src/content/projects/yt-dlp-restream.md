---
title: "yt-dlp-restream"
emoji: "🎵"
description: "Stream audio from YouTube and yt-dlp sites to HiFi receivers like WiiM and Sonos."
image: ""
tags: ["Go", "Audio Streaming", "yt-dlp", "Docker", "Open Source"]
links:
  - name: "GitHub"
    url: "https://github.com/AlyxPink/yt-dlp-restream"
order: 1
---

<ul>
  <li>Streams audio from YouTube, Vimeo, SoundCloud, Bandcamp, Twitch, and other yt-dlp-supported sites to HTTP-capable audio receivers.</li>
  <li>Converts to MP3 on-the-fly for broad receiver compatibility without disk storage.</li>
  <li>Uses chunked transfer encoding supporting extended content (6+ hours tested).</li>
  <li>Minimal resource usage via direct piping architecture through ffmpeg.</li>
  <li>Available as a single binary or Docker container.</li>
</ul>
