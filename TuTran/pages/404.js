import { useEffect,useState } from "react"
import {useRouter} from 'next/router'
import Link from 'next/link';

export default function NotFound() {
    const router = useRouter()
    const [time, settime] = useState(20)
    // dùng useEffect chỉ load 1 lần vs set time quay lại trang home
    setTimeout(()=>{
        if(time<=0){
            router.push('/')
        }
        settime(time-1)
    },1000)
    return (
        <div className="not-found" style={{textAlign : 'center'}}>
            <h1>NotFound</h1>
            <Link href="/">
                <a>go home</a>
            </Link>
            <h3>sẽ tự động về trang home sau {time}s</h3>
        </div>
    )
}
