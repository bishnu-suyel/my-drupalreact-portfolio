import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/blogApi";
import { Card, Row, Col, Container } from "react-bootstrap";
import "../css/blog.css"; // Custom CSS

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
    <Container
      style={{
        marginTop: "70px",
        marginLeft: "50px",
        marginRight: "50px",
        marginBottom: "20px",
        flex: "1",
      }}
    >
      {" "}
      {/* This Container inherits the layout margin */}
      <h1>My Blog</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      {/* Main Image (Double size) */}
      {content.mainImageUrl && (
        <Card className="mb-4 main-card">
          <Card.Img
            variant="top"
            src={`http://localhost:50231${content.mainImageUrl}`}
            alt="Main Blog Image"
            className="main-image"
          />
        </Card>
      )}
      {/* Additional Images */}
      {content.additionalImages.length > 0 ? (
        <div>
          <h2>More Images</h2>
          <Row className="justify-content-center mb-2">
            {content.additionalImages.map((imageUrl, index) => (
              <Col md={6} className="mb-4" key={index}>
                <Card className="additional-card">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:50231${imageUrl}`}
                    alt={`Additional Image ${index + 1}`}
                    className="additional-image"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <p>No additional images available</p>
      )}
    </Container>
  );
};

export default Blog;
