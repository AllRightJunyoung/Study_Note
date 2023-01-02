import Link from 'next/link'

export const HomePage=()=>{
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  )
}
export default HomePage