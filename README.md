# FARM'O CONNECT Prototype

This repository contains the prototype for FARM'O CONNECT, designed to connect farmers directly with buyers and transporters.

## Overview
Due to the Google Stitch codebase not being accessible in the workspace, this prototype was built from scratch following the exact specifications provided. It implements three main parts:
- **Shared Backend:** Node.js, Express, MongoDB (via mongodb-memory-server), and Socket.io.
- **Farmer Portal:** React frontend for farmers to list crops and manage live auctions.
- **Transporter Portal:** React frontend for transporters to accept delivery jobs and track earnings.
- **AI Service:** FastAPI microservice for demand forecasting and route recommendations.

## Prerequisites
- Node.js (v18+)
- Python (v3.10+)

## Setup and Running

1. **Start the AI Microservice**
   ```bash
   cd ai-service
   python -m venv venv
   # On Windows: .\venv\Scripts\activate
   # On Mac/Linux: source venv/bin/activate
   pip install -r requirements.txt # (fastapi uvicorn pydantic)
   uvicorn main:app --port 8000
   ```

2. **Start the Shared Backend**
   ```bash
   cd server
   npm install
   npm start
   ```
   *The server runs on port 5000 and automatically seeds demo data via `mongodb-memory-server` if no `MONGO_URI` is provided.*

3. **Start the Farmer Portal**
   ```bash
   cd farmer-portal
   npm install
   npm run dev
   ```

4. **Start the Transporter Portal**
   ```bash
   cd transporter-portal
   npm install
   npm run dev
   ```

## Demo Credentials
All passwords are `demo123`

- **Farmer:** farmer@demo.com
- **Buyer:** buyer@demo.com
- **Transporter 1:** transporter@demo.com
- **Transporter 2:** transporter2@demo.com
- **Admin:** admin@demo.com

## Limitations
- This is a prototype. Payments and GPS tracking are simulated.
- Real Google Maps integration is mocked to avoid requiring an API key.
- The AI forecasting uses deterministic sample logic.
