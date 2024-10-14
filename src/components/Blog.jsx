import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/blogApi";

const Blog = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContent();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />

      {content.mainImageUrl && (
        <img
          src={`http://localhost:49859${content.mainImageUrl}`}
          alt="Main Blog Image"
        />
      )}

      {content.additionalImages.length > 0 ? (
        <div>
          <h2>Additional Images</h2>
          {content.additionalImages.map((imageUrl, index) => (
            <img
              key={index}
              src={`http://localhost:49859${imageUrl}`}
              alt={`Additional Image ${index + 1}`}
            />
          ))}
        </div>
      ) : (
        <p>No additional images available</p>
      )}
    </div>
  );
};

export default Blog;
