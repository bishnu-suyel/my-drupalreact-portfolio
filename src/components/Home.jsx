import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { fetchContent } from "../services/api";

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

  return (
    <Container
      fluid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        padding: 0, // Ensures no padding affects layout
        margin: 0, // Ensures no margin affects layout
      }}
    >
      {content && content.attributes && content.attributes.body ? (
        <div
          dangerouslySetInnerHTML={{ __html: content.attributes.body.value }}
          style={{
            fontSize: "4rem",
            marginLeft:"20rem", // Larger font size
            padding: "20px", // Padding around the content
            borderRadius: "8px", // Optional: rounded corners
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly opaque background for contrast
          }}
        />
      ) : (
        <div>No content available</div>
      )}
    </Container>
  );
};

export default Home;
