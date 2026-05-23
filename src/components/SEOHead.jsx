import { Helmet } from 'react-helmet-async'

const defaultDescription =
  'Portfolio of Md Saimum Al Mahmud, Computer Science student at North South University, Dhaka.'

function SEOHead({ title = 'Portfolio', description = defaultDescription, keywords = 'portfolio, computer science, react, web development' }) {
  const fullTitle = title === 'Portfolio' ? 'Md Saimum Al Mahmud | Portfolio' : `${title} | Md Saimum Al Mahmud`

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
