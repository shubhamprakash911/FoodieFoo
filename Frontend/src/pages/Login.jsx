import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setIsLogin }) {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://foodiefoo.onrender.com/user/login`,
        {
          email,
          password,
        }
      );

      if (res.data.status) {
        localStorage.setItem("userLogin", JSON.stringify(res.data));
        setIsLogin(res.data);
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  return (
    <main className={styles.login}>
      <div className={styles.cont}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <button className={styles.btn}>Login</button>
          </div>
        </form>
        <p>
          Don't have account please <NavLink to="/signup">SignUp</NavLink>
        </p>
      </div>
      <ToastContainer />
    </main>
  );
}
