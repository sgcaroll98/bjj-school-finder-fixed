import '../styles/globals.css'
import '../styles/school.css'
import '../styles/submission.css'
import '../styles/schools.css'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  // Check if the component has its own layout
  const getLayout = Component.getLayout || ((page) => (
    <Layout>
      {page}
    </Layout>
  ))
  
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"
        crossOrigin="anonymous"
      />
      {router.pathname === '/' && (
        <Script
          src="/scripts/textAnimation.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('Text animation script loaded successfully');
          }}
          onError={(e) => {
            console.error('Error loading text animation script:', e);
          }}
        />
      )}
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </>
  )
}

export default MyApp
