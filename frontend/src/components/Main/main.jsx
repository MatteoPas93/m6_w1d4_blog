import { useEffect } from "react";
import { allPosts, getAllPosts } from "../../redux/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"

const Main = () => {
    const dispatch = useDispatch();
    const posts = useSelector(allPosts);
    const isLoading = useSelector(state => state.postData.isLoading);
    
    console.log(posts);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (isLoading) {
        return <div> Loading...</div>
    }

    if (!Array.isArray(posts) || posts.length === 0) {
        return <div> No posts available!</div>
    }
    return (
        <div>
            <h3> Total post: {posts.length} </h3>
           <ul>
            {posts.map(post => (
                <li key={post._id}>
                    <h5> {post.title} </h5>
                    <h6> {post.author.name} </h6>
                    <img src={post.cover} alt="img" />
                    <p> {post.category} </p>
                    <a href={post.content}>Link</a>
                    <p> {post.readTime} </p>
                </li>
            ))}
           </ul>
        </div>
    )
}

export default Main;