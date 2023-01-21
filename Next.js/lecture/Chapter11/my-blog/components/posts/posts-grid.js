import PostItem from './post-item'
import classes from './posts-grid.module.css'

const PostGrid=(props)=>{
    const {posts}=props
    return (
        <ul className={classes.grid}>
            {posts.map((post)=><PostItem/>)}
        </ul>
    )
}
export default PostGrid