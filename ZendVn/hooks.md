# Mounted & Unmounted
    lắp vào - tháo ra

# import {memo} from 'react'
export default memo(...)
kiểm tra xem trong component đc memo có prop đc truyền từ component cha  thay đổi hay ko 
nếu có thì cho re-render lại 
nếu ko có thì ko cho component re-render lại

# hooks             chỉ dùng cho function component
    useState                : ƒ useState(initialState)
    useEffect               : ƒ useEffect(create, deps)
    useLayoutEffect         : ƒ useLayoutEffect(create, deps)
    useCallback             : ƒ useCallback(callback, deps)
    useMemo                 : ƒ useMemo(create, deps)
    useRef                  : ƒ useRef(initialValue)
    useReducer              : ƒ useReducer(reducer, initialArg, init)
    useContext              : ƒ useContext(Context, unstable_observedBits)
    useImperativeHandle     : ƒ useImperativeHandle(ref, create, deps)
    useDebugValue           : ƒ useDebugValue(value, formatterFn)

# useState ()
    - sd khi nào
        khi muốn dữ liệu thay đổi thì giao diện tự động đc cập nhật
    - cách sd
        import {useState} from 'react'
        const [a,setA]  = useState(1) // lần 1 lấy 1 gán cho a từ các lần sau lấy giá trị 
            của func setA gán cho a
    *** vd cơ bản :
const gifts = [
    'core i9',
    'ram 32gb',
    'fan rgb',
]
function App() {
    const [gift,setGift] = useState()
        // lần đầu tiên chạy gift = useSate() các lần sau xẽ = setGift
    const randomGift = () => {
        const index = Math.floor(Math.random()*gifts.length)
        setGift(gifts[index])
            // gọi setGift() và truyền vào p/tử của gifts vs chỉ mục đc random phía trên
    }
    return (
        <div className="App">
            <h1>{gift || 'Chưa nhận phần thưởng'}</h1>
                // nếu có gift thì render 'Chưa nhận phần thưởng'
            <button onClick={randomGift} >Lấy thưởng</button>
        </div>
    );
}
    *** vd two-way binding ( ràng buộc 2 chiều) :
// lấy value của input name,email
function App() {
    const [name,setName]  = useState()
    const [email,setEmail]  = useState()
    const handleSubmit = ()=>{
        console.log({name,email})
    }
    return (
        <div className="App" >
            <h1>{name}</h1>
            <h1>{email}</h1>
            <input 
                value = {name}
                onChange = { (e)=> {return setName(e.target.value)}}
                placeholder = 'Nhập tên đầy đủ'
            />
            <input 
                value = {email}
                onChange = { (e)=> {return setEmail(e.target.value)}}
                placeholder = 'Nhập email'
            />
            <button 
                onClick={handleSubmit} >
                submit
            </button>
        </div>
    );
}

// lấy value của input/radio lấy value của 1 radio
const khoahoc = [{id:1,name:"HTML,CSS"},{id:2,name:"ReacJs"},{id:3,name:"VueJs"}]
function App() {
    const [checked,setchecked]  = useState()
    // lần 1 checked = undefine các lần sau = g/trị của setchecked
    const handleSubmit = ()=>{
        console.log({id:checked})
    }
    return (
        <div className="App" >
            {khoahoc.map(monhoc=>{  // lặp mảng và trả về từng p/tử của mảng gán vào monhoc
                return (
                    <div key={monhoc.id}> 
                        <input 
                            checked = {checked===monhoc.id}
                            type = "radio"
                            onChange = { (e)=> {return setchecked(monhoc.id)}}
                        />
                        {monhoc.name}
                    </div>
                ) 
                // đặt key để tránh warning , 
                // nếu biến checked trùng vs monhoc.id thì gán vào checked(của input/radio)
                // onChange khi thay đổi thì trả về setchecked với g/trị là monhoc.id
            })}
            <button onClick={handleSubmit}> submit </button>
        </div>
    );
}

// lấy value của input/checkbox lấy value của nhiều checkbox
const khoahoc = [{id:1,name:"HTML,CSS"},{id:2,name:"ReacJs"},{id:3,name:"VueJs"}]
function App() {
    const [checked,setchecked]  = useState([])
    // lần 1 checked = []rỗng các lần sau = g/trị của setchecked
    const handleCheck = (id)=>{
        setchecked(prev => {
            const isChecked = checked.includes(id) // includes trả về true nếu biến checked chứa id
            if (isChecked){ // nếu có id thì trả về id khác id đc checked => bỏ check id hiện tại
                return checked.filter(item => item!== id)
            }else{ // nếu chưa có thì thêm id vào setchecked => check thêm id hiện tại
                return [...prev,id]
            }
        })
    }
    const handleSubmit = ()=>{
        console.log({ids:checked})
    }
    return (
        <div className="App" >
            {khoahoc.map(monhoc=>{  // lặp mảng và trả về từng p/tử của mảng gán vào monhoc
                return (
                    <div key={monhoc.id}> 
                        <input 
                            type = "checkbox"
                            checked = {checked.includes(monhoc.id)}
                            onChange = { ()=> handleCheck(monhoc.id) }
                        />
                        {monhoc.name}
                    </div>
                ) 
                // đặt key để tránh warning , 
                // includes trả về true nếu biến checked chứa (monhoc.id) gán vào checked(của input/checkbox)
                // để hiện dấu tích trên type checkbox
            })}
            <button onClick={handleSubmit}> submit </button>
        </div>
    );
}

// tạo list cong việc
function App() {

    const [job,setJob] = useState('')
    const [jobs,setJobs] = useState(()=>{
        const storageJobs = JSON.parse(localStorage.getItem('jobs'))
        return storageJobs ?? []
    } ) 
    // nếu storageJobs = null or undefine thì ?? lấy [] làm g/trị thay cho storageJobs
    const handleSubmit = ()=>{
        setJobs(prev => {
            const newJobs = [...prev,job]
            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs',jsonJobs)
            return newJobs
        })
        setJobs('')
        // prev = g/trị của setjobs
        // [...prev,job] = g/trị cũ + thêm g/trị của job truyền vào
        // sau đó  setjobs('') = chuỗi rỗng 
    }
    return (
        <div className="App" >
            <input value={jobs} onChange={(e)=>setJobs(e.target.value)} />
            <button onClick={handleSubmit}> ADD </button>
            <ul> 
                {jobs.map((jobs,index) => (
                    <li key={index}>{jobs}</li>
                ))}
            </ul>
        </div>
    );
}








# useEffect () 
    - sd khi nào side effects (hiệu ứng phụ)
        khi update DOM , call Ipi , listens Dom event , Cleanup(remove listener/ Unsubcribe)
    - cách sd
        import {useEffect} from 'react'
        useEffect(callback,[deps]) nhận 2 đối số
            callback là hàm thực hiện side effects      (bắt buộc)
            [deps]  là mảng ,phụ thuộc về mặt dữ liệu    (ko bắt buộc)

        TH 1 : useEffect(callback)      ít dùng
        TH 2 : useEffect(callback,[] )
        TH 3 : useEffect(callback,[deps])
vd: render tiêu đề theo input nhập (TH1 chỉ có callback)
    function Content() {
        const [title,setTitle] = useState('')
        useEffect(()=>{
            document.title=title
        })
        return (
            <div className="Content" >
                <h1>useEffect(callback)</h1>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
        );
    }

vd: call API(chỉ cho gọi API chạy 1 lần) (TH2 có callback và mảng rỗng)
    function Content() {
        const [posts,setPosts] = useState([])
        useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(posts => setPosts(posts))
            // call api trả về posts và gán làm đối số cho setPosts
        },[])
        return (
            <div className="Content" >
                <h1>useEffect(callback,[] )</h1>
                <ul>
                    {posts.map(post=>(
                        <li key={post.id}>
                            {post.title}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


vd:  callback đc gọi lại mỗi khi [deps] của nó thay đổi (TH 3 : useEffect(callback,[deps]))
const tabs = ['posts','users','comments','albums']
function Effect() {
    const [type,setType] = useState([])
    const [datas,setDatas] = useState([])
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => response.json())
            .then(datas => setDatas(datas))
        // call api trả về post và gán làm đối số cho setPosts
    },[type])
    return (
        <div className="Effect" >
            {tabs.map((tab,index)=>(
                <button 
                    key={index}
                    style={type === tab ? {color:'violet',backgroundColor:'tomato'} : {} }
                    onClick={()=>setType(tab)}
                    >{tab}
                </button>
            ))}
            <ul>
                {datas.map(data=>(
                    <li key={data.id}>
                        {data.id} : {data.name || data.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}


# useLayoutEffect()

# import {memo} from 'react'
export default memo(...)
* dùng để tránh component con re render khi ko cần thiết
* kiểm tra xem trong component đc memo có prop đc truyền từ component cha  thay đổi hay ko 
    nếu có thì cho re-render lại 
    nếu ko có thì ko cho component re-render lại
* tuy nhiên nếu component con truyền cho component cha 1 emit func 
    thì component con vẫn re render lại => cần dùng kết hợp với useCallback()

# useCallback() cách dùng giống useEffect()
khi dùng kết hợp vs memo giúp component con tránh re render khi ko cần thiết

# useMemo()

# useReduce()
/*                      useReduce()
            dùng thay thế useState giống vs redux
vd useStatte
        phân tích : giá trị khởi tạo
        hành động : set lại giá trị khởi tạo
vd useReduce
        phân tích : giá trị khởi tạo
        hành động : set lại giá trị khởi tạo    
        tạo reducer
        dispatch
 */
        
import { useReducer } from 'react';


// giá trị khởi tạo
const initState = 0
// actions
const UP_ACTION ='up'
const DOWN_ACTION ='down'
// reducer
const reducer = (state ,action)=>{
    switch(action){
        case UP_ACTION :
            return state + 1
        case DOWN_ACTION :
            return state - 1
        default :
            throw new Error('action sai')
    }
}

function Reducer() {
    const [counter, dispatch] = useReducer(reducer,initState)
    // nhận 3 tham sô 
            // 1: hàm k/tra và return kết quả
            // 2 : giá trị khởi tạo
    // lần 1 chạy useReducer sẽ gán initState làm g/trị mặc định cho counter
    // khi gọi đến dispatch có tham số là action thì useReducer sẽ gọi hàm reducer
    // hàm reducer có 2 tham số là state = counter và action
    // k/tra trong reducer có action tương ứng đc gọi và sử lý code return ra state
    // lấy ra g/trị trả về của state gán lại vào counter
    return (
        <div className='Reduce'>
            <h1>{counter}</h1>
            <button onClick={()=>dispatch(UP_ACTION)}>tăng</button>
            <button onClick={()=>dispatch(DOWN_ACTION)}>giảm</button>
        </div>
    )
}

export default Reducer


# useReducer() lv2
/*                      useReduce()
    dùng  giống vs redux
*/
        
import { useReducer,useRef } from 'react';


// giá trị khởi tạo
const initState = {
    job : '' ,
    jobs : [] ,
}
// actions
const SET_JOB ='set_job'
const ADD_JOB ='add_job'
const DELETE_JOB ='delete_job'
const setJob = payload => {
    return {
        type : SET_JOB ,
        payload
    }
}
const addJob = payload => {
    return {
        type : ADD_JOB ,
        payload
    }
}
const deleteJob = payload => {
    return {
        type : DELETE_JOB ,
        payload
    }
}
// reducer
const reducer = (state ,action)=>{
    console.log(action)
    switch(action.type){
        case SET_JOB :
            return {
                ...state,       // bảo lưu state cũ và thêm job = g/trị truyền vào
                job : action.payload
            }
        case ADD_JOB :
            return {
                ...state,       // bảo lưu state cũ và thêm jobs vào sau
                jobs : [...state.jobs , action.payload] 
                // trong jobs bảo lưu jobs cũ và thêm g/trị truyền vào
            }
        case DELETE_JOB :
            const newJob = [...state.jobs]  // bảo lưu mảng state.jobs cũ vào biến mới
            newJob.splice(action.payload , 1) // xóa 1 phần tử ở vị trí = v/trí truyền vào
            return {
                ...state,       // bảo lưu state cũ và thêm jobs vào sau
                jobs : newJob
            }
        default :
            throw new Error('action sai')
    }
}

function Reducer1() {
    const [state, dispatch] = useReducer(reducer,initState)
    const inputRef = useRef()
    /* 
    
    */
    console.log(state)
    const {job,jobs} = state
    const handleSubmit = ()=>{
        dispatch(addJob(job))
        dispatch(setJob(''))
        inputRef.current.focus()
    }
    return (
        <div className='Reduce'>
            <h1>todo</h1>
            <input
                ref ={inputRef}
                value ={job}
                placeholder='enter todo ...'
                onChange={e=>{
                    dispatch(setJob(e.target.value))
                }}
            />
            <button onClick={handleSubmit}>
                add
            </button>
            <ul>
                {jobs.map((job,i)=>(
                    <li key={i}>
                        {job} 
                        <span onClick={()=>{
                            dispatch(deleteJob(i))
                        }}>
                            &times;
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Reducer1








# useContext
* trong component cha
    import { createContext } from 'react'
    export const DataContext = createContext()
    <ThemeContext.Provider value={data truyền đi}>
        jsx
        <componentCon>
    </ThemeContext.Provider>
* trong component con
    import { useContext } from 'react'
    import { DataContext } from 'componentCha'
    const data = useContext(DataContext)


# import { forwardRef } from 'react'
export default forwardRef(Component)

forwardRef giúp cho người dùng có thể truyền ref qua lại giữa comp cha vs con qua đối số thứ 2 của func trong component con

lên dùng kết hợp vs useImperativeHandle để tăng tính bảo mật 