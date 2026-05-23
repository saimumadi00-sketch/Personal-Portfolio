function QuoteCard({ quote, author }) {
  return (
    <div className="quote-card">
      <div className="quote-mark" aria-hidden="true">
        &quot;
      </div>
      <p className="quote-text mb-0">{quote}</p>
      <div className="quote-author">{author}</div>
    </div>
  )
}

export default QuoteCard
