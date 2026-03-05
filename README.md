# 🎬 AI Movie Insight Builder

AI Movie Insight Builder is a full-stack Next.js application that allows users to analyze audience sentiment for any movie using its IMDb ID.

The app fetches movie metadata, retrieves audience reviews, and uses an AI model to summarize audience sentiment and identify key themes.

---

## 🚀 Features

- Search movies using **IMDb ID**
- Display **movie title, poster, year, rating, and plot**
- Show **cast list**
- Retrieve **audience reviews**
- AI-generated **sentiment summary**
- Sentiment classification (**positive / mixed / negative**)
- Scrollable review sections
- Popular movie quick-search
- Responsive modern UI

---

## 🛠 Tech Stack

Frontend:
- Next.js (React + App Router)
- TailwindCSS
- Framer Motion

Backend:
- Next.js API Routes

APIs:
- OMDb API (movie metadata)
- TMDB API (audience reviews)

AI:
- Groq LLM (audience sentiment analysis)

---

## ⚙️ Setup Instructions

Clone the repository:


git clone https://github.com/ayushnegi30/ai-movie-insight-builder.git

cd ai-movie-insight-builder


Install dependencies:


npm install


Create `.env.local`:


OMDB_API_KEY=
TMDB_API_KEY=
GROQ_API_KEY=


Run locally:


npm run dev


Open:


http://localhost:3000


---

## 📊 How It Works

1. User enters an **IMDb ID**
2. OMDb API fetches movie metadata
3. TMDB API retrieves audience reviews
4. Reviews are sent to an **LLM (Groq)**
5. AI summarizes sentiment and themes
6. Results are displayed in a structured UI

---

## ⚠️ Assumptions

- IMDb ID is used as the primary identifier
- TMDB reviews represent audience sentiment
- AI analysis is generated from a subset of reviews for efficiency

---

## 🔮 Future Improvements

- Movie search by title
- Redis caching
- Advanced AI insight extraction
- Rating visualization charts

---

## 📦 Deployment

The application is deployed on **Vercel**.
