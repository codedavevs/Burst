// ==========================================
// SEASONS CONFIGURATION & AVAILABILITY
// ==========================================
function getSeasonDetails(seasonNum) {
  switch (seasonNum) {
    case 1:
      return { name: "Beyblade Burst", folder: "Beyblade Burst", image: "Photos/Beyblade.jpg", totalEpisodes: 26, isAvailable: false };
    case 2:
      return { name: "Beyblade Burst Evolution", folder: "Beyblade Burst Evolution", image: "Photos/Beyblade Burst Evolution.jpg", totalEpisodes: 26, isAvailable: false };
    case 3:
      return { name: "Beyblade Burst Turbo", folder: "BEYBLADE BURST TURBO", image: "Photos/Beyblade Burst Turbo.jpg", totalEpisodes: 1, isAvailable: false };
    case 4:
      return { name: "Beyblade Burst Rise", folder: "BEYBLADE BURST RISE", image: "Photos/Beyblade Burst Rise.jpg", totalEpisodes: 26, isAvailable: false };
    case 5:
      return { name: "Beyblade Burst Surge", folder: "BEYBLADE BURST SURGE", image: "Photos/Beyblade burst surge.jpg", totalEpisodes: 26, isAvailable: false };
    case 6:
      return { name: "Beyblade Burst QuadDrive", folder: "Beyblade Burst QuadDrive", image: "Photos/Beyblade Burst Quad Drive.jpg", totalEpisodes: 26, isAvailable: false };
    case 7:
      return { name: "Beyblade Burst QuadStrike", folder: "Beyblade Burst QuadStrike", image: "Photos/Beyblade Burst Quad Strike.jpg", totalEpisodes: 26, isAvailable: false };
    default:
      return { name: "Beyblade Burst", folder: "Beyblade Burst", image: "Photos/Beyblade.jpg", totalEpisodes: 26, isAvailable: true };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomeSeasonsShowcase();
  renderSeason(1);
});

function renderHomeSeasonsShowcase() {
  const gridContainer = document.getElementById('home-seasons-grid');
  if (!gridContainer) return;

  let html = '';
  for (let i = 1; i <= 7; i++) {
    const season = getSeasonDetails(i);

    if (season.isAvailable) {
      html += `
        <div class="season-showcase-card" onclick="goToSeasonAndPlay(${i})">
          <div class="season-card-img-container">
            <img src="${season.image}" alt="${season.name}">
            <div class="season-card-fade"></div>
          </div>
          <div class="season-card-content">
            <span class="season-tag">Season ${i}</span>
            <h3>${season.name}</h3>
            <button class="play-btn-card"><i class="fas fa-play"></i> Watch Season</button>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="season-showcase-card unavailable-card">
          <div class="season-card-img-container">
            <img src="${season.image}" alt="${season.name}">
            <div class="season-card-fade unavailable-fade"></div>
          </div>
          <div class="unavailable-center-overlay">
            <span class="status-badge">UNAVAILABLE</span>
            <div class="status-text-centered">Not Available Yet</div>
          </div>
          <div class="season-card-content">
            <span class="season-tag unavailable-tag">Season ${i}</span>
            <h3>${season.name}</h3>
            <button class="play-btn-card disabled-btn" disabled>Not Available</button>
          </div>
        </div>
      `;
    }
  }
  gridContainer.innerHTML = html;
}

// ==========================================
// TABS & NAVIGATION HANDLERS (Optimized to prevent lag)
// ==========================================
function openTab(event, tabId) {
  // Pause any playing videos across the document when switching tabs to prevent freezing/lag
  const activeVideos = document.querySelectorAll('video');
  activeVideos.forEach(video => {
    video.pause();
  });

  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(button => button.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  if (event) {
    event.currentTarget.classList.add('active');
  }

  if (tabId === 'episodes') {
    renderSeason(1);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToAbout() {
  const aboutSection = document.getElementById('about-section-wrapper');
  if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToSocials() {
  const homeTabBtn = document.querySelector('button[onclick*="home"]');
  openTab({ currentTarget: homeTabBtn }, 'home');
  setTimeout(() => {
    const socialsSection = document.getElementById('socials-section-wrapper');
    if (socialsSection) socialsSection.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function openSeason(event, seasonId) {
  // Pause active videos before changing seasons
  const activeVideos = document.querySelectorAll('video');
  activeVideos.forEach(v => v.pause());

  const seasonButtons = document.querySelectorAll('.season-btn');
  seasonButtons.forEach(btn => btn.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const seasonNum = parseInt(seasonId.replace('season-', ''));
  renderSeason(seasonNum);
}

// ==========================================
// THUMBNAIL & VIDEO PLAYER MANAGEMENT
// ==========================================
function renderSeason(seasonNum) {
  const container = document.getElementById('season-content-container');
  const seasonInfo = getSeasonDetails(seasonNum);
  
  if (!seasonInfo.isAvailable) {
    container.innerHTML = `
      <h3 class="episode-grid-title">${seasonInfo.name} - Episodes</h3>
      <div id="episode-viewer" class="episode-display-box">
        <h3>${seasonInfo.name}</h3>
        <div class="unavailable-video-box">
          <i class="fas fa-lock"></i>
          <h4>Season Not Available Yet</h4>
          <p>Episodes for ${seasonInfo.name} are currently locked or under maintenance.</p>
        </div>
      </div>
    `;
    return;
  }

  let buttonsHTML = '';
  for (let i = 1; i <= seasonInfo.totalEpisodes; i++) {
    const activeClass = i === 1 ? 'active' : '';
    buttonsHTML += `<button class="ep-btn ${activeClass}" onclick="selectEpisode(event, ${seasonNum}, ${i})">E${i}</button>`;
  }

  container.innerHTML = `
    <h3 class="episode-grid-title">${seasonInfo.name} - Episodes</h3>
    <div class="episodes-grid">
      ${buttonsHTML}
    </div>
    <div id="episode-viewer" class="episode-display-box">
      <h3>${seasonInfo.name} - Episode 1</h3>
      <!-- Initial Thumbnail View with Movie-style Play Overlay -->
      <div class="video-preview-wrapper" onclick="loadAndPlayVideo(${seasonNum}, 1)">
        <div class="video-thumbnail-container">
          <img src="${seasonInfo.image}" alt="${seasonInfo.name} Episode 1">
          <div class="video-thumbnail-overlay">
            <div class="big-play-btn"><i class="fas fa-play"></i></div>
            <div class="thumbnail-title-hint">${seasonInfo.name} - Episode 1</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectEpisode(event, seasonNum, epNum) {
  // Pause any existing playing videos
  const activeVideos = document.querySelectorAll('video');
  activeVideos.forEach(v => v.pause());

  const epButtons = document.querySelectorAll('.ep-btn');
  epButtons.forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const seasonInfo = getSeasonDetails(seasonNum);
  const viewer = document.getElementById('episode-viewer');
  
  // Render thumbnail view first before loading actual video payload
  viewer.innerHTML = `
    <h3>${seasonInfo.name} - Episode ${epNum}</h3>
    <div class="video-preview-wrapper" onclick="loadAndPlayVideo(${seasonNum}, ${epNum})">
      <div class="video-thumbnail-container">
        <img src="${seasonInfo.image}" alt="${seasonInfo.name} Episode ${epNum}">
        <div class="video-thumbnail-overlay">
          <div class="big-play-btn"><i class="fas fa-play"></i></div>
          <div class="thumbnail-title-hint">${seasonInfo.name} - Episode ${epNum}</div>
        </div>
      </div>
    </div>
  `;
}

// Function triggered when clicking the thumbnail: swaps in the actual video player with skip indicators
function loadAndPlayVideo(seasonNum, epNum) {
  const seasonInfo = getSeasonDetails(seasonNum);
  const viewer = document.getElementById('episode-viewer');

  viewer.innerHTML = `
    <h3>${seasonInfo.name} - Episode ${epNum}</h3>
    <div class="video-container" style="position: relative;">
      <!-- Skip Indicator Feedback Badge -->
      <div id="skip-indicator-badge" class="skip-indicator">Skipped <span id="skip-time-target">0:00</span></div>
      <video id="active-episode-video" controls width="100%" autoplay preload="auto">
        <source src="${seasonInfo.folder}/Episode${epNum}.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;

  // Attach skip/seek detection event listener to show indicator when jumping through the video
  const videoElem = document.getElementById('active-episode-video');
  const badgeElem = document.getElementById('skip-indicator-badge');
  const timeTargetElem = document.getElementById('skip-time-target');

  let lastTime = 0;
  let hideTimeout = null;

  videoElem.addEventListener('timeupdate', () => {
    // Detects if user skipped forward or backward more than 2 seconds instantly
    if (Math.abs(videoElem.currentTime - lastTime) > 2.0) {
      const minutes = Math.floor(videoElem.currentTime / 60);
      const seconds = Math.floor(videoElem.currentTime % 60);
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      timeTargetElem.textContent = formattedTime;
      badgeElem.classList.add('show');

      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        badgeElem.classList.remove('show');
      }, 1200);
    }
    lastTime = videoElem.currentTime;
  });
}

function goToSeasonAndPlay(seasonNum) {
  const seasonInfo = getSeasonDetails(seasonNum);
  if (!seasonInfo.isAvailable) {
    alert(`Season ${seasonNum} (${seasonInfo.name}) is currently Not Available.`);
    return;
  }

  const episodesBtn = document.querySelector('button[onclick*="episodes"]');
  if (episodesBtn) {
    openTab({ currentTarget: episodesBtn }, 'episodes');
  } else {
    openTab(null, 'episodes');
  }

  setTimeout(() => {
    const seasonButtons = document.querySelectorAll('.season-btn');
    seasonButtons.forEach((btn, index) => {
      btn.classList.remove('active');
      if (index === seasonNum - 1) {
        btn.classList.add('active');
      }
    });
    renderSeason(seasonNum);
  }, 50);
}

// Add this scroll function to script.js:
function scrollToUpdates() {
  const homeTabBtn = document.querySelector('button[onclick*="home"]');
  openTab({ currentTarget: homeTabBtn }, 'home');
  setTimeout(() => {
    const updatesSection = document.getElementById('updates-section-wrapper');
    if (updatesSection) updatesSection.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// Scroll to Photo Gallery section smoothly from the top navbar
function scrollToGallery() {
  const homeTabBtn = document.querySelector('button[onclick*="home"]');
  openTab({ currentTarget: homeTabBtn }, 'home');
  setTimeout(() => {
    const gallerySection = document.getElementById('gallery-section-wrapper');
    if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// Lightbox modal viewer for character photos
function openLightbox(imgSrc, captionText) {
  const modal = document.getElementById('photo-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  modal.style.display = 'flex';
  modalImg.src = imgSrc;
  caption.textContent = captionText;
}

function closeLightbox() {
  const modal = document.getElementById('photo-lightbox');
  modal.style.display = 'none';
}