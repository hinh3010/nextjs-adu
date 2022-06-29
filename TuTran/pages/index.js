import styles from '../styles/Home.module.css'
import Link from 'next/link';


export default function Home() {
	return (
		<>
			<div >
				<h1 className={styles.title}>Home</h1>
				<p className={styles.text}>
					row: mặc định, flex item được sắp xếp theo chiều ngang, từ trái qua phải (main axis nằm ngang).
					row-reverse: flex item được sắp xếp theo chiều ngang, từ phải qua trái (main axis nằm ngang).
					column: flex item được sắp xếp theo chiều dọc, từ trên xuống dưới (main axis đứng dọc).
					column-reverse: flex item được sắp xếp theo chiều dọc, từ dưới lên trên (main axis đứng dọc).
				</p>
				<Link href="/coders" >
					<a className="btn">See all coders</a>
				</Link>
				<style jsx>
					{`
					.btn{
						display:block ;
						width : 150px ;
						padding : 10px 0 ;
						margin : 20px auto ;
						text-align : center ;
						border : 1px solid #333 ;
						background : yellow ;
						color : green;
						border-radius : 4px ;
					}	
				`}
				</style>
			</div>
		</>
	)
}
