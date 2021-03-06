# yarn create next-app
cài next

# thêm typescrip
yarn add --dev typescript @types/react @types/node
và tạo file tsconfig.json

file js -> ts
file js có return jsx -> tsx

# dùng ts với getStaticProps, getStaticPaths và getServerSideProps
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
}

# dùng ts với api
import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}

# lấy url router của trang hiện tại
import {useRouter} from 'next/router'
export default function UserId() {
    const router = useRouter()
    console.log(router)
    console.log(router.query.id)    // id của trang hiện tại
    console.log(router.push('/'))   // về trang home
}

# custom title meta link css trong thẻ <Head></Head>
import Head from 'next/head'
export default function UserId() {
   return (
        <>
            <Head>
                <title>adu</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
   )
}

# folder public có thể link css
<img src="/ảnh.jpg" alt="" />

# folder assets lên dùng cách import
import ảnh from '../assets/ảnh.jpg'
<img src={ảnh.src} />

# import css hoặc scss global  trong _app/tsx
yarn add sass
import '../styles/globals.css'
import '../styles/style.scss'



# LifeCycle trong class (1 số LifeCycle quan trọng )
* constructor là hàm chạy dầu tiên và chỉ chạy 1 lần khi component đc khởi tạo
    constructor(props){
        super(props)
        this.state = { }
    }

* sau đó render()  render ra cấu trúc DOM và chạy khi có DOM và update DOM

* sau đó componentWillMount gắn cấu trúc Dom chỉ chạy 1 lần trước khi render DOM
	=> chạy trước render chỉ chạy 1 lần
* sau đó componentDidMount chạy 1 lần sau khi render xong cấu trúc DOM
	=> chạy sau render chỉ chạy 1 lần

* componentWillUpdate chỉ chạy khi update lại DOM (=> chạy xong render lại DOM)
	=> chạy trước render chạy khi DOM thay đổi
* componentDidUpdate chạy sau khi render xong cấu trúc DOM đc update
	=> chạy sau render lại được DOM thay đổi

# LifeCycle trong Function (hook)
* useState( callback , deps? )
* useEffect() === componentDidMount && componentDidUpdate
	useEffect( ()=>{} ) => chạy sau khi render xong DOM và sau khi DOM thay đổi
	useEffect( ()=>{} , [] ) => chỉ chạy 1 lần khi render DOM lần đầu tiên === didMount
	useEffect( ()=>{} , [arr] ) => chạy 1 lần sau khi render DOM , và chạy
		lại khi [arr] thay đổi
  
  đặc biệt
	  useEffect( ()=>{
      return ()=>{}
    } ) 
    => unmount chạy trước  useState( callback , deps? )
===> dùng để thực thi code và hàm ko trả về cái gì cả
* useMeno( callback , deps )
    callback return về cái gì thì kết quả của useMeno bằng cái đó
	chạy trước hàm render DOM
	=> useMeno( callback , [] ) (chỉ gọi 1 lần) ==>> tương đương với constructor
===> hàm trả về value , và chỉ gọi lại hàm khi deps thay đổi => tiết kiệm hiệu xuất

* useCallback( callback , deps)
	bên trong callback dùng biến gì thì trong dép phải có biến đó
	chạy trước hàm render DOM
===> dùng với các hàm thực thi

* useRef 
ứng dụng chủ yếu với thẻ input vd : focus() , click()
	const inputFile = useRef(null)
	const handleUploadFile = ()=>{
		inputFile.current.click()
	}
	<input ref={inputFile} type="file" />
	<button className="upload-file" onClick={handleUploadFile}>Upload file</button>
* trong Hook ko có constructor
=> c1 : tạo biến isRun chỉ chạy 1 lần
            isRun = false 
            const LifeCycle = ()=>{
                if(isRun === false ){
                    // code
                    isRun = true 
                }
            }
=> c2 :  tạo biến isRunRef với useRef
            isRunRef = useRef(false) 
            const LifeCycle = ()=>{
                if(isRunRef.currun === false ){
                    // code
                    isRunRef.currun = true 
                }
            }
=> c3 :  useMemo
            useMemo(()=>{
                // code
            },[])
=> c4 : customHook ( với Constructor lên để trước các hook khác)
        b1 : tạo tên vd = useConstructor
        b2 : nhận tham số = func-callback
        b3 : chỉ gọi 1 lần duy nhất

        cấu trúc 1 customHook
            type customHookCallback = () => void
            function useCustomHook( callback : customHookCallback ): void {}
            export default useCustomHook