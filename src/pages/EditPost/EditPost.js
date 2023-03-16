import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useFetchDocument } from "../../hooks/useFetchDocument";


const EditPost = () => {

    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const { insertDocument, response } = useInsertDocuments("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

    useEffect(() => {

        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");

            setTags(textTags);
        }
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault();

        setFormError("");

        //validando dados
        try {
            new URL(image)
        } catch (error) {
            setFormError("Imagem precisa ser uma URL!");
            return;
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !tags || !body) {
            setFormError("Preencha todos so campos!");
        }

        if (formError) return;

        //inserindo doc
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        navigate("/");

    }


    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar Post: {post.title}</h2>
                    <p>Altere os dados do post e compartilhe</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título</span>
                            <input type="text" name="title" required placeholder="Informe um título para seu post..." onChange={(e) => setTitle(e.target.value)} value={title} />
                        </label>

                        <label>
                            <span>URL da imagem:</span>
                            <input type="text" name="image" required placeholder="Insira uma imagem para seu post" onChange={(e) => setImage(e.target.value)} value={image} />
                        </label>

                        <p className= { styles.preview_title }>Preview da Imagem: </p>
                        <img className= { styles.image_preview } src= { post.image } alt= { post.title } />

                        <label>
                            <span>Conteúdo</span>
                            <textarea name="body" required placeholder="Insira o conteúdo do post" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                        </label>

                        <label>
                            <span>Tags:</span>
                            <input type="text" name="tags" required placeholder="Insira tags para seu post separadas por vírgula" onChange={(e) => setTags(e.target.value)} value={tags} />
                        </label>

                        {!response.loading && <button className="btn">Cadastrar</button>}
                        {response.loading && (<button className="btn" disabled>Aguarde...</button>)}
                        {response.error && (<p className="error">{response.error}</p>)}
                        {formError && (<p className="error">{formError}</p>)}

                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost