import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ThemeInput from "./ThemeInput.jsx";
import StoryGame from "./StoryGame.jsx";
import LoadingStatus from "./LoadingStatus.jsx";

const API_BASE_URL = "/api";

function StoryGenerator() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);

  useEffect(() => {
    let pollingInterval;
    if (jobId && jobStatus == "processing") {
      pollingInterval = setInterval(() => {
        pollJobStatus(jobId);
      }, 5000); // Poll every 5 seconds
    }
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [jobId, jobStatus]);

  const generateStory = async (theme) => {
    setLoading(true);
    setError(null);
    setTheme(theme);
    try {
      const response = await axios.post(`${API_BASE_URL}/stories/create`, {
        theme,
      });
      const { job_id, status } = response.data;
      setJobId(job_id);
      setJobStatus(status);

      pollJobStatus(job_id);
    } catch (e) {
      setError(`Failed to start story generation: ${e.message}`);
      setLoading(false);
    }
  };

  const fetchStory = async (id) => {
    try {
      setLoading(false);
      setJobStatus("completed");
      navigate(`/story/${id}`);
    } catch (e) {
      setError(`Failed to load story: ${e.message}`);
      setLoading(false);
    }
  };
  const pollJobStatus = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
      const { status, story_id, error: jobError } = response.data;
      setJobStatus(status);

      if (status === "completed") {
        fetchStory(story_id);
      } else if (status === "failed" || jobError) {
        setError(jobError || "Failed to generate story.");
        setLoading(false);
      }
    } catch (e) {
      if (e.response?.status !== 404) {
        setError(`Error checking job status: ${e.message}`);
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setTheme("");
    setError(null);
    setJobId(null);
    setJobStatus(null);
    setLoading(false);
  };

  return (
    <div className="story-generator">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={reset} className="retry-btn">
            Try Again
          </button>
        </div>
      )}
      {!jobId && !error && !loading && <ThemeInput onSubmit={generateStory} />}
      {loading && <LoadingStatus theme={theme} />}
    </div>
  );
}
export default StoryGenerator;
