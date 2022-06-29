
// lặp ra từng user trong users và gán id của user làm patsh và return

import  Head  from 'next/head';


// => nếu truy câp sai id => page 404
export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()

    const paths = data.map((coder) => {
        return {
            params: { id: coder.id.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

// lấy ra user trong users theo id truyền vào
export const getStaticProps = async (context) => {
    const id = context.params.id
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data = await res.json()
    return {
        props: { coder: data }
    }
}

export default function Coder({ coder }) {
    return (
        <>
            <Head>
                <title>coders/{coder.name}</title>
                <meta name="keywords" content="coders" />
            </Head>
            <div style={{ padding: '0 40px' }}>
                <h1>{coder.name}</h1>
                {/* <h1>{console.log(coder)}</h1> */}
                <div style={{ padding: '0 40px' }}>
                    <h2>email : {coder.email} </h2>
                    <h2>website : {coder.website} </h2>
                    <h2>address : {coder.address.street} , {coder.address.city} </h2>
                    <h2>company : {coder.company.name} </h2>
                </div>
            </div>
        </>
    )
}
