import styles from './Post.module.css';

import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  window.scrollTo(0, 0); 

  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <p>Esse post trata sobre:</p>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>{tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post