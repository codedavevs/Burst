// ==========================================
// SEASONS CONFIGURATION & STREAMING LINKS
// Add your direct .mp4 streaming links inside each episode array!
// ==========================================
function getSeasonDetails(seasonNum) {
  const seasonsData = {
    1: { 
      name: "Beyblade Burst", 
      image: "Photos/Beyblade.jpg", 
      isAvailable: false,
      episodes: [
        { epNum: 1, videoUrl: "" },
        { epNum: 2, videoUrl: "" }
      ]
    },
    2: { 
      name: "Beyblade Burst Evolution", 
      image: "Photos/Beyblade Burst Evolution.jpg", 
      isAvailable: false, // Set to true when ready
      episodes: [
        { epNum: 1, videoUrl: "" }
      ]
    },
    3: { 
      name: "Beyblade Burst Turbo", 
      image: "Photos/Beyblade Burst Turbo.jpg", 
      isAvailable: true,
      episodes: [
        { epNum: 1, videoUrl: "https://archive.org/download/episode-1_202611/Episode1.mp4" },
        { epNum: 2, videoUrl: "https://archive.org/download/episode-2_202611/Episode2.mp4" },
        { epNum: 3, videoUrl: "https://archive.org/download/episode-2_202611/Episode3.mp4" },
        { epNum: 4, videoUrl: "https://archive.org/download/episode-2_202611/Episode4.mp4" },
        { epNum: 5, videoUrl: "https://archive.org/download/episode-2_202611/Episode5.mp4" }
        
      ]
    },
    4: { 
      name: "Beyblade Burst Rise", 
      image: "Photos/Beyblade Burst Rise.jpg", 
      isAvailable: false,
      episodes: [
        { epNum: 1, videoUrl: "" }
      ]
    },
    5: { 
      name: "Beyblade Burst Surge", 
      image: "Photos/Beyblade burst surge.jpg", 
      isAvailable: false,
      episodes: [
        { epNum: 1, videoUrl: "" }
      ]
    },
    6: { 
      name: "Beyblade Burst QuadDrive", 
      image: "Photos/Beyblade Burst Quad Drive.jpg", 
      isAvailable: false,
      episodes: [
        { epNum: 1, videoUrl: "" }
      ]
    },
    7: { 
      name: "Beyblade Burst QuadStrike", 
      image: "Photos/Beyblade Burst Quad Strike.jpg", 
      isAvailable: false,
      episodes: [
        { epNum: 1, videoUrl: "" }
      ]
    }
  };

  return seasonsData[seasonNum] || seasonsData[1];
}

// Initialize website elements on load
document.addEventListener('DOMContentLoaded', () => {
  renderHomeSeasonsShowcase();
  renderGalleryGrid();
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
// CHARACTER GALLERY DATA & STORY CONFIGURATION
// Leave image string empty ("") for "No photo available"
// ==========================================
function getGalleryCharacterDetails(charKey) {
  const charactersData = {
    valt: { 
      name: "Valt Aoi", 
      image: "Photo Galery/Valt Aoi/Valt.jpg",
      info: "Beyblade: Valtryek",
      story: "Valt Aoi is the main protagonist of the Beyblade Burst series. Energetic, passionate, and deeply loyal to his friends, Valt dreams of becoming the world's best Blader alongside his trusty companion, Victory Valtryek."
    },
    shu: { 
      name: "Shu Kurenai", 
      image: "Photo Galery/Shu Kurenai/Shu.jpg",
      info: " Beyblade: Spryzen",
      story: "Shu Kurenai is a legendary Blader and one of Valt's best friends. Known for his calm, tactical prowess and intense dedication, Shu rises through the ranks as a member of the Supreme Four."
    },
    free: { 
      name: "Free De La Hoya", 
      image: "Photo Galery/Free De La Hoya/Free.jpg", // Empty string = Triggers "No photo available" placeholder state
      info: "Beyblade: Fafnir",
      story: "Free De La Hoya is widely considered the world's strongest Blader. Laid-back and seemingly effortless in his battles, Free possesses extraordinary instincts and spin-stealing mastery with Fafnir."
    },
    silas: { 
      name: "Silas Karlisle", 
      image: "Photo Galery/Silas Karlisle/Silas.jpg",
      info: "Beyblade: Satomb",
      story: "Silas Karlisle is a proud, clever Blader known for his unconventional launch techniques and strategic mind. Initially a rival, he becomes a key teammate and fierce competitor in international leagues."
    }
  };

  return charactersData[charKey] || { name: "Character", image: "", info: "", story: "No information available yet." };
}

function renderGalleryGrid() {
  const gridContainer = document.getElementById('home-gallery-grid');
  if (!gridContainer) return;

  const characters = ['valt', 'shu', 'free', 'silas'];
  let html = '';

  characters.forEach(key => {
    const char = getGalleryCharacterDetails(key);
    const hasPhoto = char.image && char.image.trim() !== "";

    if (hasPhoto) {
      html += `
        <div class="gallery-card">
          <div class="gallery-img-container">
            <img src="${char.image}" alt="${char.name}">
          </div>
          <div class="gallery-info">
            <h3>${char.name.split(" ")[0]}</h3>
            <button class="btn btn-primary view-btn" onclick="openLightbox('${key}')">
              <i class="fas fa-eye"></i> View
            </button>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="gallery-card unavailable-gallery-card">
          <div class="gallery-img-container unavailable-gallery-img">
            <i class="fas fa-image-slash"></i>
            <span>No photo available</span>
          </div>
          <div class="gallery-info">
            <h3>${char.name}</h3>
            <button class="btn btn-primary view-btn" onclick="openLightbox('${key}')">
              <i class="fas fa-eye"></i> View
            </button>
          </div>
        </div>
      `;
    }
  });

  gridContainer.innerHTML = html;
}

// ==========================================
// TABS & NAVIGATION HANDLERS
// ==========================================
function openTab(event, tabId) {
  document.querySelectorAll('video').forEach(video => video.pause());
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  if (event) {
    event.currentTarget.classList.add('active');
  }

  if (tabId === 'episodes') {
    renderSeason(1);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToUpdates() {
  const homeTabBtn = document.querySelector('button[onclick*="home"]');
  openTab({ currentTarget: homeTabBtn }, 'home');
  setTimeout(() => {
    const updatesSection = document.getElementById('updates-section-wrapper');
    if (updatesSection) updatesSection.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function scrollToGallery() {
  const homeTabBtn = document.querySelector('button[onclick*="home"]');
  openTab({ currentTarget: homeTabBtn }, 'home');
  setTimeout(() => {
    const gallerySection = document.getElementById('gallery-section-wrapper');
    if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
  }, 50);
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
  document.querySelectorAll('video').forEach(v => v.pause());
  document.querySelectorAll('.season-btn').forEach(btn => btn.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const seasonNum = parseInt(seasonId.replace('season-', ''));
  renderSeason(seasonNum);
}

// ==========================================
// DYNAMIC EPISODE & VIDEO PLAYER MANAGEMENT
// ==========================================
function renderSeason(seasonNum) {
  const container = document.getElementById('season-content-container');
  const seasonInfo = getSeasonDetails(seasonNum);
  
  if (!seasonInfo.isAvailable || !seasonInfo.episodes || seasonInfo.episodes.length === 0) {
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
  seasonInfo.episodes.forEach((ep, index) => {
    const activeClass = index === 0 ? 'active' : '';
    buttonsHTML += `<button class="ep-btn ${activeClass}" onclick="selectEpisode(event, ${seasonNum}, ${ep.epNum})">E${ep.epNum}</button>`;
  });

  const firstEp = seasonInfo.episodes[0];

  container.innerHTML = `
    <h3 class="episode-grid-title">${seasonInfo.name} - Episodes</h3>
    <div class="episodes-grid">
      ${buttonsHTML}
    </div>
    <div id="episode-viewer" class="episode-display-box">
      <h3>${seasonInfo.name} - Episode ${firstEp.epNum}</h3>
      <div class="video-preview-wrapper" onclick="loadAndPlayVideo(${seasonNum}, ${firstEp.epNum})">
        <div class="video-thumbnail-container">
          <img src="${seasonInfo.image}" alt="${seasonInfo.name} Episode ${firstEp.epNum}">
          <div class="video-thumbnail-overlay">
            <div class="big-play-btn"><i class="fas fa-play"></i></div>
            <div class="thumbnail-title-hint">${seasonInfo.name} - Episode ${firstEp.epNum}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectEpisode(event, seasonNum, epNum) {
  document.querySelectorAll('video').forEach(v => v.pause());
  document.querySelectorAll('.ep-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const seasonInfo = getSeasonDetails(seasonNum);
  const viewer = document.getElementById('episode-viewer');
  
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

function loadAndPlayVideo(seasonNum, epNum) {
  const seasonInfo = getSeasonDetails(seasonNum);
  const episodeObj = seasonInfo.episodes.find(e => e.epNum === epNum);
  const videoUrl = episodeObj ? episodeObj.videoUrl : "";
  const viewer = document.getElementById('episode-viewer');

  if (!videoUrl) {
    viewer.innerHTML = `
      <h3>${seasonInfo.name} - Episode ${epNum}</h3>
      <div class="unavailable-video-box">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Video Link Missing</h4>
        <p>The streaming link for this episode hasn't been added yet.</p>
      </div>
    `;
    return;
  }

  viewer.innerHTML = `
    <h3>${seasonInfo.name} - Episode ${epNum}</h3>
    <div class="video-container" style="position: relative;">
      <video id="active-episode-video" controls width="100%" autoplay preload="auto">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
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

// ==========================================
// CHARACTER LIGHTBOX STORY MODAL VIEWER
// ==========================================
function openLightbox(charKey) {
  const char = getGalleryCharacterDetails(charKey);
  const modal = document.getElementById('photo-lightbox');
  const modalContainer = modal.querySelector('.lightbox-content');
  
  const hasPhoto = char.image && char.image.trim() !== "";
  let imageHTML = hasPhoto 
    ? `<img src="${char.image}" alt="${char.name}" class="lightbox-img">` 
    : `<div class="lightbox-no-photo"><i class="fas fa-image-slash"></i><span>No photo available yet</span></div>`;

  modalContainer.innerHTML = `
    <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
    <div class="lightbox-body-grid">
      <div class="lightbox-left">
        ${imageHTML}
      </div>
      <div class="lightbox-right">
        <h2>${char.name}</h2>
        <span class="lightbox-info-badge">${char.info}</span>
        <p class="lightbox-story">${char.story}</p>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeLightbox() {
  const modal = document.getElementById('photo-lightbox');
  modal.style.display = 'none';
}