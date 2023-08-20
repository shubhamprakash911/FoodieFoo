import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";
import axios from "axios";
import Recipe from "../components/Recipe";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import notFound from "../notFound.jpg";
import Footer from "./Footer";

function Favourite({ loading, setLoading, setSearch, isLogin, setIsLogin }) {
  const [favouriteRecipe, setFavouriteRecipe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/", { replace: true });
      alert("please Login first to access Favourite page");
      return;
    }

    async function getFavouriteRecipe() {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/recipe`, {
        headers: { Authorization: `Bearer ${isLogin.token}` },
      });
      console.log(res.data.recipes);
      if (res.data.status) setFavouriteRecipe(res.data.recipes);
      else alert(res.data.msg);
      setLoading(false);
    }
    getFavouriteRecipe();
  }, [isLogin, navigate, setLoading]);

  return (
    <main className="home">
      <Navbar
        setSearch={setSearch}
        isLogin={isLogin}
        showSearch={false}
        setIsLogin={setIsLogin}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.recipes}>
            {favouriteRecipe.map((recipe) => (
              <Recipe
                props={recipe}
                isLogin={isLogin}
                key={recipe.id}
                isFavourite={false}
                setFavouriteRecipe={setFavouriteRecipe}
              />
            ))}
          </div>

          {favouriteRecipe.length === 0 && (
            <img className={styles.notFound} src={notFound} alt="Not Found" />
          )}
        </>
      )}
      <Footer />
    </main>
  );
}

export default Favourite;
