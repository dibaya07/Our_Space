import React, { useState } from "react";
import "./RegisterPage.css"; // same theme file as login
import useToast from "../../../hooks/useToast";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [femalePreview, setFemalePreview] = useState(null);
  const [malePreview, setMalePreview] = useState(null);
  const { register, loading, loadUser } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const femaleName = e.target.femaleName.value.trim();
    const maleName = e.target.maleName.value.trim();
    const coupleName = e.target.coupleName.value.trim();
    const password = e.target.password.value.trim();
    const femaleAvatar = e.target.femaleAvatar.files[0];
    const maleAvatar = e.target.maleAvatar.files[0];

    if (!femaleName || !maleName || !coupleName || !password) return;

    // Build payload — for real backend you'd use FormData to include files
    // Build payload compatible with the auth/register endpoint.
    // The server expects { name, email, password } for user creation.
    const payload = {
      name: coupleName || `${femaleName} & ${maleName}`,
      password,
      // keep additional metadata for possible later use
      femaleName,
      maleName,
    };

    const res = await register(payload);
    if (res?.success && res.data) {
      // Simulate login: save token and user, trigger auth context update
      const { token, user } = res.data;
      if (token && user) {
        localStorage.setItem("auth_token", token);
        if (typeof window !== "undefined" && window.dispatchEvent) {
          window.dispatchEvent(new Event("auth-token-updated"));
        }
        await loadUser();
        success("Account created! Welcome to your dashboard 💖");
        navigate("/dashboard");
      } else {
        toastError("Registration succeeded but login failed. Please try logging in.");
        navigate("/login");
      }
    } else {
      toastError("Registration failed — try again later.");
    }
  };

  return (
    <div className="romantic-login-wrapper">
      <div className="romantic-overlay" />

      <div className="romantic-content stacked-register">
        {/* Writeup on top */}
        <div className="romantic-intro intro-centered">
          <h1 className="romantic-title">
            Start your <br />
            <span>shared love story.</span>
          </h1>
         
        </div>

        {/* Big form below */}
        <form className="romantic-card big-register-card" onSubmit={handleSubmit}>
          <h2 className="card-title">Create couple account 💖</h2>
          <p className="card-subtitle">
            We’ll keep your memories and promises safe under this moon.
          </p>

          {/* Names row (2 columns on desktop) */}
          <div className="field-row">
            <div className="field">
              <label>Female name</label>
              <input
                type="text"
                name="femaleName"
                placeholder="Her name"
                required
              />
            </div>

            <div className="field">
              <label>Male name</label>
              <input
                type="text"
                name="maleName"
                placeholder="His name"
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Couple name</label>
            <input
              type="text"
              name="coupleName"
              placeholder="e.g. Moon & Stars, Soulmates..."
              required
            />
          </div>

          {/* No email required — registration uses couple name as identifier */}

          {/* Avatars */}
          <div className="avatar-row">
            <div className="avatar-block">
              <div className="avatar-circle">
                {femalePreview ? (
                  <img src={femalePreview} alt="Her preview" />
                ) : (
                  <span className="avatar-emoji">💁‍♀️</span>
                )}
              </div>
              <p className="avatar-name-label">Her photo</p>
              <label className="avatar-upload">
                Upload
                <input
                  type="file"
                  name="femaleAvatar"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFemalePreview)}
                />
              </label>
            </div>

            <div className="avatar-block">
              <div className="avatar-circle">
                {malePreview ? (
                  <img src={malePreview} alt="His preview" />
                ) : (
                  <span className="avatar-emoji">🧑‍💼</span>
                )}
              </div>
              <p className="avatar-name-label">His photo</p>
              <label className="avatar-upload">
                Upload
                <input
                  type="file"
                  name="maleAvatar"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setMalePreview)}
                />
              </label>
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Choose a secret password"
              required
            />
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="card-footer">
            Already have an account?{" "}
            <span
              className="link-accent"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/login")}
            >
              Login to your world 🌙
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
