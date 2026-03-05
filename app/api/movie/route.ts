/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { fetchMovieFromOMDb } from '@/lib/omdb'
import { fetchReviewsFromTMDB } from '@/lib/tmdb'
import { analyzeReviewsWithAI } from '@/lib/openai'

// ✅ In-memory cache (persists while server runs)
const cache = new Map<string, any>()

export async function POST(req: NextRequest) {
  try {
    const { imdbId } = await req.json()

    // 🔹 Validate IMDb ID
    if (!imdbId || !/^tt\d+$/.test(imdbId)) {
      return NextResponse.json(
        { error: 'Invalid IMDb ID format' },
        { status: 400 }
      )
    }

    // 🔹 Check cache first
    if (cache.has(imdbId)) {
      return NextResponse.json(cache.get(imdbId))
    }

    // 🔹 Fetch movie details
    const movie = await fetchMovieFromOMDb(imdbId)

    const formattedMovie = {
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      rating: movie.imdbRating,
      plot: movie.Plot,
      cast: movie.Actors?.split(',').map((actor: string) =>
        actor.trim()
      ),
    }

    // 🔹 Fetch reviews
    let reviews = await fetchReviewsFromTMDB(imdbId)

    // Fallback to plot if no reviews found
    if (!reviews.length) {
      reviews = [movie.Plot]
    }

    // 🔹 AI analysis
    const aiInsights = await analyzeReviewsWithAI(reviews)

    const responseData = {
      ...formattedMovie,
      reviews,
      ai: aiInsights,
    }

    // 🔹 Store in cache
    cache.set(imdbId, responseData)

    return NextResponse.json(responseData)

  } catch (error: any) {
    console.error('API ERROR:', error)

    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 400 }
    )
  }
}