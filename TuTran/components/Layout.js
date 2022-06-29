import Navbar from '../components/Navbar.js'
import Footer from '../components//Footer.js'
import { useRouter } from 'next/router'
import Head from 'next/head';

export default function AllCoders({ children }) {
    const params = useRouter()
    return (
        <div className='next_app'>
            <Navbar />
            <Head>
                <title>trang{params.pathname === '/' ? '/home' : params.pathname}</title>
                <meta name="keywords" content="coders" />
            </Head>
            {children}
            <hr />
            <Footer />
        </div>

    )
}
