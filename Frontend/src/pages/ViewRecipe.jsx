import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewRecipe.module.css";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

function ViewRecipe({ isLogin, setIsLogin, setLoading, loading }) {
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  console.log(details);

  const params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=47bab7bb955f45ddb2384f8d9f579348&`
        );
        const data = res.data;
        setLoading(false);
        setDetails(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchDetails();
  }, [params.id, setLoading]);

  return (
    <main>
      <Navbar showSearch={false} isLogin={isLogin} setIsLogin={setIsLogin} />
      {loading ? (
        <Loading />
      ) : (
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
                <p
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                ></p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default ViewRecipe;
