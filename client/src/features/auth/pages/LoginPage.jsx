import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useToast from "../../../hooks/useToast";

export default function RomanticLogin() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { success, error: toastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.coupleName.value.trim();
    const password = e.target.password.value.trim();
    if (!name || !password) return;

    // Send { name, password } to backend
    const res = await login({ name, password });
    if (res?.success) {
      success("Welcome back 💕");
      navigate("/dashboard");
    } else {
      toastError("Login failed — check credentials or try again later.");
    }
  };

  return (
    <div className="login-centered-wrapper">
      <form className="romantic-card" onSubmit={handleSubmit}>
        <h2 className="card-title">Welcome back, lovers 💫</h2>
        <p className="card-subtitle">Sign in to your shared universe</p>

        <div className="field">
          <label>Couple name</label>
          <input
            type="text"
            name="coupleName"
            placeholder="e.g. Moon & Stars"
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="card-row">
          <label className="remember">
            <input type="checkbox" /> Remember us
          </label>
          <button
            type="button"
            className="link-button"
            onClick={() => console.log("forgot password")}
          >
            Forgot password?
          </button>
        </div>

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="card-footer">
          First time here?{" "}
          <span
            className="link-accent"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/register")}
          >
            Create couple account 💖
          </span>
        </p>
      </form>
    </div>
  );
}