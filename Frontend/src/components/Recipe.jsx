import { FaHeart, FaTrash } from "react-icons/fa";
import styles from "../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Recipe({ props, isLogin, isFavourite = true, setFavouriteRecipe }) {
  const { id: recipe_id, image, title } = props;
  console.log(props);

  function handleAddFavourite() {
    if (isLogin) {
      async function saveRecipe() {
        try {
          const res = await axios.post(
            "http://localhost:8000/recipe",
            {
              recipe_id,
              image,
              title,
            },
            { headers: { Authorization: `Bearer ${isLogin.token}` } }
          );

          if (res.data.status) {
            toast.success(res.data.msg);
          }
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      }
      saveRecipe();
    } else {
      toast.error("Please Login first to add favourite item");
    }
  }

  function handleDelete() {
    async function deleteRecipe() {
      const res = await axios.delete(
        `http://localhost:8000/recipe/${props._id}`,
        {
          headers: { Authorization: `Bearer ${isLogin.token}` },
        }
      );

      if (res.data.status) {
        setFavouriteRecipe((prevFavourite) =>
          prevFavourite.filter((e) => e.recipe_id !== props.recipe_id)
        );
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    }
    deleteRecipe();
  }

  return (
    <div className={styles.recipe_item}>
      <div className={styles.cont}>
        <div className="img">
          <img src={image} alt={title} />
        </div>

        <h3 className="title">{title}</h3>
        <div className={styles.btns}>
          {isFavourite ? (
            <FaHeart
              onClick={handleAddFavourite}
              size="1.3rem"
              className={styles.heart}
            />
          ) : (
            <FaTrash
              size="1.3rem"
              className={styles.heart}
              onClick={handleDelete}
            />
          )}
          <Link to={`/recipe/${recipe_id}`} className={styles.btn}>
            View Recipe
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Recipe;
