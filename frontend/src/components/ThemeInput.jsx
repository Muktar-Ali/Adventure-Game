import { useState } from "react";

function ThemeInput({ onSubmit }) {
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theme.trim()) {
      setError("Please enter a theme.");
      return;
    }

    onSubmit(theme);
  };

  return (
    <div className="theme-input-container">
      <h2>Generate Your Adventure</h2>
      <p>Enter a theme to get started</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g. space exploration, medieval fantasy, etc."
            className={error ? "error" : ""}
          />

          {error && <p className="error-text">{error}</p>}
        </div>
        <button type="submit" className="generate-btn">
          Generate Story
        </button>
      </form>
    </div>
  );
}
export default ThemeInput;
