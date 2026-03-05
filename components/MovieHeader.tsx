/* eslint-disable @next/next/no-img-element */
"use client"

interface Props {
  title: string
  poster: string
  year: string
  rating: string
  plot: string
  cast: string[]
}

export default function MovieHeader({
  title,
  poster,
  year,
  rating,
  plot,
  cast,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-10">

      <img
        src={poster}
        alt={title}
        className="w-full md:w-80 rounded-2xl shadow-xl"
      />

      <div className="space-y-4">
        <h2 className="text-4xl font-bold">{title}</h2>

        <p className="text-gray-400">
          {year} • ⭐ {rating}
        </p>

        <p className="text-gray-300">{plot}</p>

        <div>
          <h3 className="font-semibold mb-2">Cast</h3>
          <div className="flex flex-wrap gap-2">
            {cast.map((actor, i) => (
              <span
                key={i}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}