import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import Layout from "../pages/Layout";

const Contact = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent("node/contact")
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setContent(data.data[0]); // Access the first item in the data array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content:", error); // Log any errors
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
    <Layout>
      <h1>Contact Me</h1>
      {content && content.attributes && content.attributes.body ? (
        <div
          dangerouslySetInnerHTML={{ __html: content.attributes.body.value }}
        />
      ) : (
        <div>No content available</div>
      )}
    </Layout>
  );
};

export default Contact;
