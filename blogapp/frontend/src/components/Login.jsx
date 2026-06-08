import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import Notification from "./Notification";

const Login = ({
  setUser,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  notification,
}) => {
  return (
    <div>
      <Notification notification={notification} />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
