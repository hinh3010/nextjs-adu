import Link from 'next/link'


export default function Coder() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <Link href="/" >
                <a className="navbar-brand" href="#">Home</a>
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/coders" >
                            <a className="nav-link">All Coders</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/about">
                            <a className="nav-link disabled">About</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
