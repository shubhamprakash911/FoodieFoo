import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Recipe from "../components/Recipe";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
import Footer from "./Footer";
import notFound from "../notFound.jpg";

function HomePage({
  isLogin,
  search,
  setSearch,
  loading,
  setLoading,
  setIsLogin,
}) {
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch/?apiKey=47bab7bb955f45ddb2384f8d9f579348&query=${search}`
        );
        setRecipes(res.data.results);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchRecipes();
  }, [search, setLoading]);

  return (
    <main className="main">
      <Navbar
        search={search}
        setSearch={setSearch}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.recipes}>
            {recipes.map((recipe) => (
              <Recipe props={recipe} isLogin={isLogin} key={recipe.id} />
            ))}
          </div>
          {recipes.length === 0 && (
            <div className={styles.notFound}>
              <img src={notFound} alt="Not Found" />
            </div>
          )}
        </>
      )}
      <Footer />
    </main>
  );
}

export default HomePage;
