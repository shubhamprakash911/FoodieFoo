import { useState } from "react";
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://foodiefoo.onrender.com/user/register`,
        {
          username,
          email,
          password,
        }
      );

      if (res.data.status) {
        alert(res.data.msg);
        navigate("/login", { replace: true });
      } else {
        toast.error(res.data.msg);
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter username"
              required
            />
          </div>
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
            <button className={styles.btn}>Signup</button>
          </div>
        </form>
        <p>
          Already have account please <NavLink to="/login">Login</NavLink>
        </p>
      </div>
      <ToastContainer />
    </main>
  );
}

export default SignUp;
