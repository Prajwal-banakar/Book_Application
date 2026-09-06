# 📚 BookHaven — Modern Full-Stack Book Store & Management Platform

BookHaven is a high-performance e-commerce platform built with a **Spring Boot 3.5** backend, **MongoDB** database, and a glassmorphic **React 18** frontend with real-time **WebSocket** notifications and live customer support chat.

---

## ⚡ Tech Stack

| Layer | Tech | Purpose |
| :--- | :--- | :--- |
| **Backend** | Java 21, Spring Boot 3.5 | REST APIs, Spring Security (RBAC), STOMP WebSockets |
| **Database** | MongoDB | Document storage for books, orders, users, reviews, and carts |
| **Frontend** | React 18, Bootstrap 5, Framer Motion | Glassmorphic UI, animations, responsive layouts |
| **Real-time** | SockJS & STOMP Protocol | Instant order status notifications & admin support chat |

---

## ✨ Features Overview

### 🛒 Customer Storefront
- **Glassmorphic Design**: Sleek SaaS-style hero, ambient gradient cards, and smooth micro-interactions.
- **Dynamic Catalog & Multi-Filter Search**: Browse titles by genre, author, price range, and publication year.
- **Wishlist & Cart**: Persistent shopping cart with quantity steppers and quick wishlist saved items.
- **Multi-Step Checkout**: Mock payment card interface and order fulfillment tracking.
- **Community Reviews**: Book detail pages featuring star ratings, reviews, and author recommendations.
- **Live Support Chat**: Floating chat widget for direct real-time communication with admins.

### 🛡️ Admin Control Center
- **Executive Analytics Dashboard**: Live metrics for total catalog books, registered users, and active orders.
- **Order Fulfillment**: Review, approve, deliver, or cancel orders (automatic stock deduction on approval).
- **Inventory Management**: Create, edit, update covers, and delete catalog titles.
- **Real-Time Support Desk**: Admin chat interface for managing incoming user support tickets.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java JDK 21+**
- **Node.js 18+** & `npm`
- **MongoDB** (running on `localhost:27017`)

---

### 1️⃣ Backend Setup (Spring Boot)
```bash
# Clone repository & navigate to root
cd BookHaven

# Build & run backend server (starts on http://localhost:8080)
mvn clean install
mvn spring-boot:run
```

---

### 2️⃣ Frontend Setup (React App)
```bash
# Open a new terminal & navigate to frontend
cd frontend

# Install dependencies & launch client (starts on http://localhost:3000)
npm install
npm start
```

> **💡 Administrator Role Tip**: Usernames containing `"admin"` (e.g. `superadmin`) automatically register with **`ROLE_ADMIN`** access.

---
