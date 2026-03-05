interface Props {
  reviews: string[]
}

export default function AudienceReviews({ reviews }: Props) {
  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-700">
      <h3 className="text-xl font-semibold mb-4">
        📝 Audience Reviews ({reviews.length})
      </h3>

      {reviews.length === 0 ? (
        <p className="text-gray-400">
          No audience reviews found for this movie.
        </p>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
          {reviews.slice(0, 5).map((review, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded-lg">
              • {review}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}