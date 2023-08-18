import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "../pages/Home.module.css";

function Recipe({ props }) {
  const [like, setLike] = useState(false);
  const { id, image, title } = props;
  return (
    <div className={styles.recipe_item}>
      <div className={styles.cont}>
        <div className="img">
          <img src={image} alt={title} />
        </div>

        <h3 className="title">{title}</h3>
        <div className={styles.btns}>
          <FaHeart
            color={like ? "red" : "black"}
            onClick={() => setLike(!like)}
          />
          <button className={styles.btn}>View Recipe</button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
