import {useRouter} from 'next/router'
export const aboutIdPage=()=>{
    const router=useRouter()

    // console.log(router.pathname)
    console.log(router.query)


    return <div>
        <h1>about Id page</h1>
    </div>
}
export default aboutIdPage