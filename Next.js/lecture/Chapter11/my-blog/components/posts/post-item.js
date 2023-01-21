import Link from 'next/link'
import classes from './post-item.module.css'
import Image from 'next/image';
const PostItem=(props)=>{
    const {title,image,except,date,slug}=props

    const formattedDate=new Date(data).toLocaleDateString('en-US',{
        day:'numeric',
        month:'long',
        year:'numeric'
    })
    const imagePath=`/images/posts/${slug}/${image}`

    return (
        <li className={classes.post}>
            <Link>
            <a>
                <div className={classes.image}>
                <Image src={imagePath} alt={title} width={300} height={200}/>
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{except}</p>
                </div>

            </a>
            </Link>

        </li>
    )
}
export default PostItem