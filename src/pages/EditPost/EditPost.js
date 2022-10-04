import styles from './EditPost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';


const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  console.log(post);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");



  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!title || !body || !image || !tags) {
      return setFormError("Por favor preencha todos os campos!");
    }

    try {
      new URL(image);
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data);

    navigate("/dashboard");
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do post com desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                placeholder="Pense num bom título..."
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                placeholder="Insira uma imagem que represente o seu post"
                onChange={e => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <div className={styles.image_center}>
              <img className={styles.image_preview} src={post.image} alt={post.title} />
            </div>
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                placeholder='Insira o conteúdo do post'
                onChange={e => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por vírgulas"
                onChange={e => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className='btn'>Cadastrar</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost