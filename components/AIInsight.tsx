interface Props {
  summary: string
  sentiment: string
  themes: string[]
}

export default function AIInsight({
  summary,
  sentiment,
  themes,
}: Props) {
  const sentimentColor = () => {
    if (sentiment === "positive")
      return "bg-green-500/20 text-green-400"
    if (sentiment === "negative")
      return "bg-red-500/20 text-red-400"
    return "bg-yellow-500/20 text-yellow-400"
  }

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-700 space-y-4">
      <h3 className="text-xl font-semibold">
        🤖 AI Audience Insight
      </h3>

      <ul className="space-y-2 text-gray-300">
        {summary
          .split(". ")
          .filter(Boolean)
          .map((point, i) => (
            <li key={i}>• {point.trim()}.</li>
          ))}
      </ul>

      <div>
        <span className="text-gray-400 mr-2">
          Overall Sentiment:
        </span>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${sentimentColor()}`}
        >
          {sentiment.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {themes.map((theme, i) => (
          <span
            key={i}
            className="bg-gray-800 px-3 py-1 rounded-full text-sm"
          >
            {theme}
          </span>
        ))}
      </div>
    </div>
  )
}