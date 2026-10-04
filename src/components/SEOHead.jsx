import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { siteDescription, sitePages, siteUrl } from '../data/site'

function SEOHead({ title = 'Portfolio', description, noIndex = false, keywords = 'portfolio, cybersecurity, networking, computer science, react, web development' }) {
  const { pathname } = useLocation()
  const canonical = new URL(pathname, siteUrl).href
  const pageDescription = description || sitePages.find((page) => page.path === pathname)?.description || siteDescription
  const fullTitle = title === 'Portfolio' ? 'Saimum Al-Mahmud | Portfolio' : `${title} | Saimum Al-Mahmud`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow'} />
      {!noIndex && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Saimum Al-Mahmud Portfolio" />
      <meta property="og:image" content={`${siteUrl}/social-preview.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Saimum Al-Mahmud - Cybersecurity and Networking" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${siteUrl}/social-preview.png`} />
    </Helmet>
  )
}

export default SEOHead
