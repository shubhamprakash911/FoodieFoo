import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Recipe from "../components/Recipe";
import styles from "./Home.module.css";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch/?apiKey=0cc27eb538ba4019aa9d3ee0b8bc8000`
      );
      setRecipes(res.data.results);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  return (
    <main className="home">
      <Navbar />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.recipes}>
          {recipes.map((recipe) => (
            <Recipe props={recipe} key={recipe.id} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
