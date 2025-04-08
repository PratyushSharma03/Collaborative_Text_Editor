<h1 align="center">📝 Collaborative Text Editor</h1>

<p align="center">
  A real-time collaborative <strong>text editor</strong> built with <strong>React</strong>, <strong>Express</strong>, <strong>Socket.IO</strong>, and <strong>MongoDB</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/PratyushSharma03/Collaborative_Word_Document?style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/PratyushSharma03/Collaborative_Word_Document?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/PratyushSharma03/Collaborative_Word_Document?style=for-the-badge" />
</p>

---

## 📽️ Demo

[![▶️ Watch Video Demo](https://img.shields.io/badge/▶️%20Watch%20Video-Demo-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/10CloV3ZV5v178ceif4s1BCYP_eBBASQa/view?usp=sharing)

> 📌 Click to see the real-time collaborative editing in action!

---

## 🚀 Features

- 🔄 **Real-time Editing** – See changes from all users as they happen
- 💾 **Auto-Save** – Saves document content every 2 seconds
- 📡 **WebSocket Syncing** – Uses Socket.IO for live updates
- 📁 **MongoDB Storage** – Document persistence on every save
- 👥 **User Count Display** – Shows number of active collaborators
- 📝 **Rich Text Support** – Powered by [Quill](https://quilljs.com/)

---

## ⚙️ Tech Stack

| Frontend | Backend | Database | Real-time |
|----------|---------|----------|-----------|
| React    | Express | MongoDB (via Mongoose) | Socket.IO |

---

## 🧰 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Steps to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/PratyushSharma03/Collaborative_Word_Document.git

# 2. Run the backend and frontend (from their respective folders)
cd server
node server.js

cd ../client
npm install
npm start
