import {useRouter} from 'next/router'
export const BlogPostPage=()=>{
    const router=useRouter()
    console.log(router.query) // /blog/12/20 들어갈시 12와 20이 배열안에저장되어있음
    return (
        <div>
            <h1>The Blog Posts</h1>
        </div>

    )
}
export default BlogPostPage