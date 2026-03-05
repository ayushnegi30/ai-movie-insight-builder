/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MovieHeader from "@/components/MovieHeader"
import AudienceReviews from "@/components/AudienceReviews"
import AIInsight from "@/components/AIInsight"

interface Movie {
  title: string
  poster: string
  year: string
  rating: string
  plot: string
  cast: string[]
  reviews: string[]
  ai: {
    summary: string
    sentiment: string
    themes: string[]
  }
}

export default function Home() {
  const [imdbId, setImdbId] = useState("")
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (id?: string) => {
    const searchId = id || imdbId

    if (!searchId) return

    if (!/^tt\d+$/.test(searchId)) {
      setError("Please enter a valid IMDb ID (e.g. tt0133093)")
      return
    }

    try {
      setError("")
      setLoading(true)
      setMovie(null)

      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imdbId: searchId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setMovie(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const sentimentColor = (sentiment: string) => {
    if (sentiment === "positive")
      return "bg-green-500/20 text-green-400"
    if (sentiment === "negative")
      return "bg-red-500/20 text-red-400"
    return "bg-yellow-500/20 text-yellow-400"
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white px-6 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl font-bold">🎬 AI Movie Insight Builder</h1>
      </div>

      {/* Hero Section */}
      {!movie && !loading && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10">

          <div className="text-center max-w-2xl space-y-4">
            <h2 className="text-5xl font-bold">
              Discover <span className="text-yellow-400">AI-Powered</span> Movie Insights
            </h2>
            <p className="text-gray-400 text-lg">
              Search any movie to get audience sentiment analysis,
              key themes, and detailed insights.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-3xl flex bg-[#111827] border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
            <input
              type="text"
              value={imdbId}
              onChange={(e) => setImdbId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
              placeholder="Enter IMDb ID (e.g. tt0111161)"
              className="flex-1 bg-transparent px-6 py-4 outline-none text-lg"
            />
            <button
              onClick={() => handleSearch()}
              className="bg-yellow-500 text-black font-semibold px-8 hover:opacity-90 transition"
            >
              Search
            </button>
          </div>

          {error && (
            <div className="text-red-400 bg-red-500/10 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Popular Picks */}
          <div className="w-full max-w-6xl mt-10">
            <h3 className="text-center text-xl font-semibold mb-6">
              Popular Picks
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {[
                { id: "tt0111161", img: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg" },
                  { id: "tt0068646", img: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg" },
                  { id: "tt0468569", img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
                  { id: "tt0133093", img: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg" },
                  { id: "tt0109830", img: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_SX300.jpg" },
              ].map((movie) => (
                <img
                  key={movie.id}
                  src={movie.img}
                  alt="poster"
                  onClick={() => handleSearch(movie.id)}
                  className="rounded-xl cursor-pointer hover:scale-105 transition duration-300 shadow-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="max-w-6xl mx-auto animate-pulse space-y-6">
          <div className="h-96 bg-gray-800 rounded-xl" />
          <div className="h-6 bg-gray-800 w-1/2 rounded" />
          <div className="h-6 bg-gray-800 w-1/3 rounded" />
        </div>
      )}

      {/* Movie Result */}
      {movie && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto space-y-12"
        >
          <button
            onClick={() => setMovie(null)}
            className="text-gray-400 hover:text-white"
          >
            ← Back to search
          </button>

          <MovieHeader
            title={movie.title}
            poster={movie.poster}
            year={movie.year}
            rating={movie.rating}
            plot={movie.plot}
            cast={movie.cast}
          />

          <AudienceReviews reviews={movie.reviews} />

          <AIInsight
            summary={movie.ai.summary}
            sentiment={movie.ai.sentiment}
            themes={movie.ai.themes}
          />
        </motion.div>
      )}
      <footer className="text-center text-gray-500 mt-16 text-sm">
          Powered by OMDb • TMDB • Groq LLM
        </footer>
    </main>
  )
}