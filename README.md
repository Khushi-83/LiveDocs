# 📄 LiveDocs

**Version:** 1.1.1  
**Tagline:** Real-Time Document Collaboration with Built-in Video Conferencing

LiveDocs is a collaborative platform designed to streamline teamwork with **real-time document editing** and **integrated video conferencing**. Whether you're brainstorming, drafting proposals, or finalizing reports — LiveDocs keeps everyone connected, productive, and focused.

---

## ✨ Features

### 📝 Document Collaboration
- Real-time multi-user editing with live cursor updates
- Rich-text formatting: headings, images, tables, links
- Auto-save with complete version history and rollback
- Easy sharing with granular permission settings
- Fully responsive on desktop, tablet, and mobile

### 📹 Video Conferencing
- HD video and crystal-clear audio with WebRTC
- Screen sharing support
- In-meeting file sharing and chat
- Secure, encrypted calls with minimal latency
- Supports multiple participants in a single call

### 🔄 Unified Experience
- Seamless integration of editing + conferencing in one view
- Real-time sync between document changes and call events
- Notifications for edits, joins, and system events
- Secure authentication with OAuth 2.0 (Google)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – Fast and dynamic UI
- **Quill.js / Draft.js** – Rich text editing capabilities
- **WebRTC** – Peer-to-peer video/audio calls
- **WebSockets** – Live collaboration and sync

### Backend
- **Appwrite** – User management, auth, and real-time DB
- **Node.js + Express** – RESTful API server and session handling
- **Operational Transformation (OT)** or **CRDTs** – Conflict-free collaborative editing
- **PostgreSQL / MongoDB** – Persistent data storage

### Infrastructure
- **Google Docs API** – Document interactions and syncing
- **Google OAuth 2.0** – Secure authentication
- **Cloud Storage (GCP / AWS S3)** – Document storage
- **STUN / TURN Servers** – WebRTC NAT traversal
- **Elasticsearch** – Real-time document search

---

## 🔒 Security & Privacy
- End-to-end encryption for video/audio streams
- Encrypted document storage
- Secure login with OAuth 2.0
- Fine-grained access control for documents and meetings
- GDPR-compliant data handling

---

## ⚙️ Installation

> 📌 LiveDocs is a full-stack application requiring both frontend and backend setup.

```bash
# Clone the repo MeghaKaushal19/LiveDocs https://share.google/DXoEPGLyOIjmCOUUm
git clone https://github.com/your-org/LiveDocs.git
cd LiveDocs

# Frontend Setup
cd client
npm install
npm start

# Backend Setup
cd ../server
npm install
npm run dev
