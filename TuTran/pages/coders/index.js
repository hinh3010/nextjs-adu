import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Coder.module.css'

// gửi requét tới link api...... và trả về props dưới dạng một json
export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    return {
        props: { coders: data }
    }
}

export default function AllCoders({ coders }) {
    const params = useRouter().pathname
    return (
        <div className='codes'>
            <h1>AllCoders</h1>
            {
                coders.map((coder) => (
                    <Link href={`${params}/${coder.id}`} key={coder.id} >
                        <a className={styles.single}>
                            <h3>{coder.name}</h3>
                        </a>
                    </Link>
                ))
            }
        </div>
    )
}
