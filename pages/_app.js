import '../styles/globals.css'
import '../styles/school.css'
import '../styles/submission.css'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"
        crossOrigin="anonymous"
      />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default MyApp
