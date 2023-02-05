import './styles.css';

export const PostCard = ({ title, cover, body, id }) => {
    return (
        <div className='post'>
            <img src={cover} alt={title} />
            <div className="post-content">
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        </div>
    )
}