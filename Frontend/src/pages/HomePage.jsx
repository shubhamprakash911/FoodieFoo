import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Recipe from "../components/Recipe";
import styles from "./Home.module.css";
import Loading from "../components/Loading";

function HomePage({
  isLogin,
  search,
  setSearch,
  loading,
  setLoading,
  setIsLogin,
}) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch/?apiKey=0cc27eb538ba4019aa9d3ee0b8bc8000&query=${search}`
      );
      setRecipes(res.data.results);
      setLoading(false);
    }
    fetchRecipes();
  }, [search, setLoading]);

  return (
    <main className="home">
      <Navbar
        search={search}
        setSearch={setSearch}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.recipes}>
          {recipes.map((recipe) => (
            <Recipe props={recipe} isLogin={isLogin} key={recipe.id} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
