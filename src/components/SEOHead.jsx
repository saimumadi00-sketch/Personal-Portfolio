import { Helmet } from 'react-helmet-async'

const defaultDescription =
  'Portfolio of Saimum Al-Mahmud, CSE student majoring in Cybersecurity and Networking, with projects in network security, machine learning, and full-stack development.'

function SEOHead({ title = 'Portfolio', description = defaultDescription, noIndex = false, keywords = 'portfolio, cybersecurity, networking, computer science, react, web development' }) {
  const fullTitle = title === 'Portfolio' ? 'Saimum Al-Mahmud | Portfolio' : `${title} | Saimum Al-Mahmud`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}

export default SEOHead
