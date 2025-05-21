# JobAI – AI-Powered Job Recommendation App

**JobAI** is a full-stack MERN (MongoDB, Express, React, Node.js) application that uses **OpenAI** to intelligently recommend jobs based on a user's **skills, location, and experience**. It features real-time suggestions, infinite scrolling job listings, reusable components, and authentication support.

---

## Features

- Token-based user authentication
- AI-powered job suggestions via OpenAI API
- Location and skills autocomplete (with backend proxy to avoid CORS)
- Infinite scroll-based job listing
- Reusable and responsive job card UI (grid/list)
- Backend APIs with pagination, JWT auth, and MongoDB

---

## Folder Structure

```
jobai/
├── client/
    src/            # React frontend
    │   ├── components/     # Reusable UI components
    |   ├── miscelleneous    # small Reusable UI components
    │   ├── StoreContext/    # Context for user and suggestions
    |   ├── pages            #react pages
    │   ├── constants/       # URL & global constants
    │   └── App.jsx
│
├── server/              # Express backend
│   ├── controllers/     # Logic for auth, jobs, AI
│   ├── routes/          # Express routes
│   ├── models/          # Mongoose schemas
│   ├── middleware/      # Auth middleware
│   └── utils/           # Prompt handler (OpenAI)
```

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Arjun34-bit/jobai.git
cd jobai
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` in `/server`:

```env
PORT=5000
MONGO_URI=MONGO_URI=mongodb+srv://arjundevendra:<*******>@cluster0.t3jbku1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=
OPENAI_API_KEY=
```

Start backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

For production build:

```bash
npm run build
```

---

## AI Usage & Prompt Design

The backend sends user inputs to OpenAI's GPT model gpt-4o-mini with a carefully crafted prompt:

### Example Prompt:

```
Suggest 3 job titles with descriptions based on the following:
Location: Mumbai
Skills: React, Node.js
Experience: 2 years
Returns the output in string format.
Then converted into JSON format
```

### Expected Output:

```json
[
  {
    "job_title": "Frontend Developer",
    "location": "Mumbai",
    "role": "React.js UI development",
    "salary": "₹6,00,000 - ₹8,00,000",
    "required_experience": "1-2 years"
  }
]
```

The result is parsed and shown via `JobMatchCard` compoenent.

---

## API Documentation

### Auth

- `POST /api/auth/login` – login user

---

### Job APIs

- `POST /api/job/create` – Create new job (admin) frontend not done yet
- `GET /api/job/get?page=1&limit=5` – Get paginated jobs
- `POST /api/job/getRecommendations` – Get AI-powered job suggestions

---

## Code Architecture Overview

| Layer          | Tools Used                                   |
| -------------- | -------------------------------------------- |
| Frontend       | React, Tailwind, Axios, CoreUI               |
| Backend        | Node.js, Express.js, MongoDB                 |
| Auth           | JWT + Context API                            |
| AI Integration | OpenAI API                                   |
| Autocomplete   | OpenStreetMap (via backend proxy) Nominative |

---

## Assumptions & Trade-offs

- AI always returns valid JSON (cleaned with regex)
- Skills/location match based on keyword matching
- Location API proxied through Express due to CORS
- Infinite scroll is simple only five jobs will be fetched first then scroll event takes care (no virtualized list)
- Suggestions are cached in `localStorage` for use preferences again and again which redice out hit to the apis

---

## Author

**Arjun Devendra**  
📧 arjundevendra34@gmail.com  
🔗 [GitHub](https://github.com/Arjun34-bit)

---

## Deployment Notes (Render)

- React app deployed as **Static Site**
- `_redirects` file used in `public/`:
  ```
  /*    /index.html   200
  ```
- Backend deployed as **Web Service**
- Axios requests use relative path (`/api/...`) or full `URL` constant
