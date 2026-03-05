import axios from "axios"

const OMDB_BASE_URL = "http://www.omdbapi.com/"

export async function fetchMovieFromOMDb(imdbId: string) {
  const apiKey = process.env.OMDB_API_KEY

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      i: imdbId,
      apikey: apiKey,
    },
  })

  const data = response.data

  // 🔥 IMPORTANT CHECK
  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found")
  }

  return data
}