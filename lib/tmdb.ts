/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchReviewsFromTMDB(imdbId: string) {
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey) {
    throw new Error('TMDB API key missing')
  }

  try {
    // Convert IMDb → TMDB ID
    const findResponse = await axios.get(
      `${TMDB_BASE_URL}/find/${imdbId}`,
      {
        params: {
          api_key: apiKey,
          external_source: 'imdb_id',
        },
        timeout: 8000,
      }
    )

    const movieResults = findResponse.data.movie_results

    if (!movieResults?.length) return []

    const tmdbMovieId = movieResults[0].id

    // Fetch reviews
    const reviewResponse = await axios.get(
      `${TMDB_BASE_URL}/movie/${tmdbMovieId}/reviews`,
      {
        params: { api_key: apiKey },
        timeout: 8000,
      }
    )

    return reviewResponse.data.results.map(
      (review: any) => review.content
    )

  } catch (error) {
    console.error('TMDB fetch failed:', error)
    return [] // graceful fallback
  }
}