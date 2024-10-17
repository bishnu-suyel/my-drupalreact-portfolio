import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { fetchContent } from "../services/api";
import "../css/home.css";

const decodeHtmlEntities = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent;
};

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent("node/home")
      .then((data) => {
        setContent(data.data[0]); // Access the first item in the data array
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  // Extract plain text from the content and decode HTML entities
  const text = content?.attributes?.body?.value || "No content available";
  const decodedText = decodeHtmlEntities(text); // Decode HTML entities
  const letters = decodedText.split(""); // Split plain text into individual letters

  return (
    <Container
      fluid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          color: "#d3d3d3", // Light grey color
          padding: "20px",
          marginLeft: "20rem",
          borderRadius: "8px", // Rounded corners
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly opaque background
          fontFamily: "'Dancing Script", // Curvy font
          display: "flex", // Align letters horizontally
        }}
      >
        {letters.map((letter, index) => (
          <span
            key={index}
            className="dancing-letter"
            style={{
              animationDelay: `${index * 0.1}s`,
              marginRight: "0.5rem", // Add space between letters
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </Container>
  );
};

export default Home;
