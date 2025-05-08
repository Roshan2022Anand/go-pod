# WebRTC Video Call Application

A simple WebRTC video call application built with Go and React.

## Features

- Real-time video and audio communication
- Room-based video calls
- Simple and intuitive UI
- WebRTC peer-to-peer connection

## Prerequisites

- Go 1.21 or later
- Node.js 14 or later
- npm or yarn

## Setup

### Backend (Go)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Run the server:
   ```bash
   go run main.go
   ```

The server will start on port 8080.

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on port 3000.

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a room ID to join or create a new room
3. Allow camera and microphone access when prompted
4. Share the room ID with others to join the same video call

## Security Note

This is a basic implementation for demonstration purposes. For production use, consider adding:
- Authentication
- HTTPS
- TURN server support for NAT traversal
- Error handling
- Room management
- User presence indicators