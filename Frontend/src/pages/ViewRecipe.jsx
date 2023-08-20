import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewRecipe.module.css";
import Navbar from "../components/Navbar";

function ViewRecipe() {
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  console.log(details);

  const params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=0cc27eb538ba4019aa9d3ee0b8bc8000&`
      );
      const data = res.data;
      console.log(data);
      setDetails(data);
    };
    fetchDetails();
  }, [params.id]);

  return (
    <main>
      <Navbar showSearch={false} />
      <div className={styles.cont}>
        <div className={styles.cont2}>
          <h2>{details.title}</h2>
          <img src={details.image} alt={details.title} />
        </div>
        <div className={styles.info}>
          <button
            className={activeTab === "ingredients" ? styles.active : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
          <button
            className={activeTab === "instructions" ? styles.active : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients.map(({ id, original }) => (
                <li key={id}>{original}</li>
              ))}
            </ul>
          )}

          {activeTab === "instructions" && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ViewRecipe;
