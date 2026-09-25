# Moodify 🎵😊

> **Play music that matches your vibe — automatically detected through your facial expressions.**

**Moodify** is an intelligent, camera-driven music recommendation engine. It captures your real-time facial expression via your webcam, predicts your dominant emotion using computer vision and deep learning, and instantly curates and plays a matching playlist or track.

---

## ✨ Features

- **Real-Time Facial Expression Recognition:** Uses deep learning to classify core emotions: *Happy*, *Sad*, *Energetic/Angry*, *Calm/Neutral*, and *Surprised*.
- **Emotion-to-Audio Mapping:** Seamlessly routes detected emotional states to curated playlists via Spotify API / YouTube Music API.
- **Privacy First:** Video streams are processed locally in real time; raw frames are never stored or uploaded.
- **Interactive UI:** Live webcam feedback overlay showing real-time confidence scores and emotion metrics.
- **Manual Mood Override:** Prefer a different vibe? Override the detection manually with a single click.

---

## 🛠️ Tech Stack

- **Frontend:** React.js / HTML5 Video API / Tailwind CSS *(or Streamlit for Python-only builds)*
- **Backend:** Node.js / express
- **Computer Vision & ML:** Mediapipe
- **Music Integration:** Spotify Web API (`Spotipy`) /audio preinstalled DB

---

## 📋 Emotion-to-Music Architecture