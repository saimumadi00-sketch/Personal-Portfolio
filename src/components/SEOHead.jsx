import { Helmet } from 'react-helmet-async'

const defaultDescription =
  'Portfolio of Saimum Al-Mahmud, Computer Science student focused on machine learning, computer vision, full-stack web development and systems security.'

function SEOHead({ title = 'Portfolio', description = defaultDescription, keywords = 'portfolio, computer science, react, web development' }) {
  const fullTitle = title === 'Portfolio' ? 'Saimum Al-Mahmud | Portfolio' : `${title} | Saimum Al-Mahmud`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}

export default SEOHead
