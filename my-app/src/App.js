import React, { useState, useEffect } from "react";
import "./App.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [news, setNews] = useState([]); // State to store news articles

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "pub_32710ea5d188aaf66fbd0c59feae0c0a79bfe";
      const baseUrl = "https://newsdata.io/api/1/news";
      const params = new URLSearchParams({
        apiKey: apiKey,
        language: "en",
        category: "top", // Example category, adjust as needed
        country: "us",
      });

      try {
        const response = await fetch(`${baseUrl}?${params}`);
        const data = await response.json();
        if (data && data.results) {
          setNews(data.results);
        } else {
          console.error("No news data found:", data);
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Authentication logic here
    console.log({ username, password, rememberMe });
  };

  return (
    <div className="pageContainer">
      <div className="container">
        <div className="loginImageSection">
          {/* Conditional rendering to display news articles or loading text */}
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="newsArticle">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                {/* You can add more details like images, authors, etc., if needed */}
              </div>
            ))
          ) : (
            <p>Loading news...</p>
          )}
        </div>
        <div className="loginFormSection">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1 className="loginTitle">Sign In</h1>
            <div className="inputContainer">
              <input
                type="text"
                className="loginInput"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                className="loginInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="loginOptions">
              <label className="rememberMe">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="forgotPassword">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="signInButton">
              SIGN IN
            </button>
            <p className="registerPrompt">
              Not registered yet? <a href="/register">Create an Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
