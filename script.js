const podcastFolder = './podcasts';   // path to folder
const podcastFiles = ['Digital payments.mp3', 'podcast2.wav', 'podcast3.wav'];  // Simulate .wav files
const podcastList = document.getElementById('podcast-list');
const playerSection = document.getElementById('player');
const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const backBtn = document.getElementById('back-btn');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');

let audio = new Audio();
let isPlaying = false;
let currentPodcastIndex = null;

// Create podcast items
podcastFiles.forEach((file, index) => {
    const podcastItem = document.createElement('div');
    podcastItem.classList.add('podcast-item');
    
    // Get the file name without the extension
    const fileName = file.split('.').slice(0, -1).join('.');
    
    // Set the podcast name to the file name
    podcastItem.textContent = fileName.charAt(0).toUpperCase() + fileName.slice(1); // Capitalize first letter
    
    podcastItem.addEventListener('click', () => {
      playPodcast(index);
    });
    
    podcastList.appendChild(podcastItem);
  });

// Play podcast
function playPodcast(index) {
  currentPodcastIndex = index;
  audio.src = `${podcastFolder}/${podcastFiles[index]}`;
  audio.play();
  isPlaying = true;
  updatePlayerUI();
}

// Update player UI
function updatePlayerUI() {
  podcastList.classList.add('hidden');
  playerSection.classList.remove('hidden');
  playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';

  audio.addEventListener('loadedmetadata', () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  });
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
});

// Seek bar functionality
seekBar.addEventListener('input', () => {
  const seekTime = (seekBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Back to podcast list
backBtn.addEventListener('click', () => {
  playerSection.classList.add('hidden');
  podcastList.classList.remove('hidden');
  audio.pause();
});

// Format time in mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
