// Audio Visualization Music Player
class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.audioContext = null;
        this.analyser = null;
        this.source = null;
        this.dataArray = null;
        this.bufferLength = 0;
        this.canvas = document.getElementById('visualizer');
        this.canvasCtx = this.canvas.getContext('2d');
        this.isPlaying = false;
        this.currentMode = 'bars';
        this.playlist = [];
        this.currentTrackIndex = -1;
        this.currentBlobUrl = null;

        this.initializeElements();
        this.setupEventListeners();
        this.resizeCanvas();
        this.drawInitialState();
    }

    initializeElements() {
        this.fileInput = document.getElementById('audio-file');
        this.playBtn = document.getElementById('play-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeValue = document.getElementById('volume-value');
        this.progressSlider = document.getElementById('progress-slider');
        this.progressFill = document.getElementById('progress-fill');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');
        this.trackNameEl = document.getElementById('track-name');
        this.vizModeSelect = document.getElementById('viz-mode');
    }

    setupEventListeners() {
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.volumeSlider.addEventListener('input', (e) => this.handleVolumeChange(e));
        this.progressSlider.addEventListener('input', (e) => this.handleProgressChange(e));
        this.vizModeSelect.addEventListener('change', (e) => this.changeVisualizationMode(e));
        
        this.audio.addEventListener('loadedmetadata', () => this.handleLoadedMetadata());
        this.audio.addEventListener('timeupdate', () => this.handleTimeUpdate());
        this.audio.addEventListener('ended', () => this.handleTrackEnded());
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            this.playlist = files;
            this.currentTrackIndex = 0;
            this.loadTrack(0);
        }
    }

    loadTrack(index) {
        if (index >= 0 && index < this.playlist.length) {
            // Revoke previous blob URL to prevent memory leak
            if (this.currentBlobUrl) {
                URL.revokeObjectURL(this.currentBlobUrl);
            }
            
            const file = this.playlist[index];
            const url = URL.createObjectURL(file);
            this.currentBlobUrl = url;
            this.audio.src = url;
            this.trackNameEl.textContent = file.name;
            this.currentTrackIndex = index;
            
            if (!this.audioContext) {
                this.initializeAudioContext();
            }
            
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.playBtn.textContent = '⏸';
                this.visualize();
            }).catch((error) => {
                console.error('Playback failed:', error);
                alert('播放失败，请确保浏览器允许自动播放或选择其他音频文件');
                this.isPlaying = false;
                this.playBtn.textContent = '▶';
            });
        }
    }

    initializeAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        
        // Set initial volume
        this.audio.volume = this.volumeSlider.value / 100;
    }

    togglePlay() {
        if (!this.audio.src) {
            alert('请先选择音频文件');
            return;
        }

        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.textContent = '▶';
            this.isPlaying = false;
        } else {
            this.audio.play().then(() => {
                this.playBtn.textContent = '⏸';
                this.isPlaying = true;
                this.visualize();
            }).catch((error) => {
                console.error('Playback failed:', error);
                alert('播放失败，请确保浏览器允许自动播放或选择其他音频文件');
                this.isPlaying = false;
                this.playBtn.textContent = '▶';
            });
        }
    }

    previousTrack() {
        if (this.playlist.length === 0) return;
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentTrackIndex);
    }

    nextTrack() {
        if (this.playlist.length === 0) return;
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack(this.currentTrackIndex);
    }

    handleVolumeChange(e) {
        const volume = e.target.value;
        this.audio.volume = volume / 100;
        this.volumeValue.textContent = volume + '%';
    }

    handleProgressChange(e) {
        const progress = e.target.value;
        this.audio.currentTime = (progress / 100) * this.audio.duration;
    }

    handleLoadedMetadata() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
        this.progressSlider.value = 0;
    }

    handleTimeUpdate() {
        if (!this.audio.duration) return;
        
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressSlider.value = progress;
        this.progressFill.style.width = progress + '%';
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }

    handleTrackEnded() {
        if (this.currentTrackIndex < this.playlist.length - 1) {
            this.nextTrack();
        } else {
            this.isPlaying = false;
            this.playBtn.textContent = '▶';
        }
    }

    changeVisualizationMode(e) {
        this.currentMode = e.target.value;
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth - 40;
        this.canvas.height = 280;
    }

    drawInitialState() {
        this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.canvasCtx.font = '20px Arial';
        this.canvasCtx.textAlign = 'center';
        this.canvasCtx.fillText('选择音频文件开始播放', this.canvas.width / 2, this.canvas.height / 2);
    }

    visualize() {
        if (!this.isPlaying || !this.analyser) return;

        requestAnimationFrame(() => this.visualize());

        this.analyser.getByteFrequencyData(this.dataArray);

        switch (this.currentMode) {
            case 'bars':
                this.drawBars();
                break;
            case 'wave':
                this.drawWave();
                break;
            case 'circle':
                this.drawCircle();
                break;
        }
    }

    drawBars() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barWidth = (width / this.bufferLength) * 2.5;
        let x = 0;

        this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.canvasCtx.fillRect(0, 0, width, height);

        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = (this.dataArray[i] / 255) * height * 0.8;
            
            const r = (this.dataArray[i] + 100);
            const g = 50 + (i * 2);
            const b = 200;
            
            this.canvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            this.canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }

    drawWave() {
        const width = this.canvas.width;
        const height = this.canvas.height;

        this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.canvasCtx.fillRect(0, 0, width, height);

        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = 'rgb(102, 126, 234)';
        this.canvasCtx.beginPath();

        const sliceWidth = width / this.bufferLength;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            const v = this.dataArray[i] / 255;
            const y = v * height;

            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.canvasCtx.lineTo(width, height / 2);
        this.canvasCtx.stroke();
    }

    drawCircle() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;

        this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.canvasCtx.fillRect(0, 0, width, height);

        const bars = 100;
        const step = Math.floor(this.bufferLength / bars);

        for (let i = 0; i < bars; i++) {
            const barHeight = (this.dataArray[i * step] / 255) * radius * 0.8;
            const angle = (i / bars) * Math.PI * 2;
            
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);
            
            const r = (this.dataArray[i * step] + 100);
            const g = 50 + (i * 2);
            const b = 200;
            
            this.canvasCtx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
            this.canvasCtx.lineWidth = 3;
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(x1, y1);
            this.canvasCtx.lineTo(x2, y2);
            this.canvasCtx.stroke();
        }

        // Draw center circle
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2);
        this.canvasCtx.fillStyle = 'rgba(102, 126, 234, 0.8)';
        this.canvasCtx.fill();
    }
}

// Initialize the player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
});
