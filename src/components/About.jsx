import React, { useEffect, useState } from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import { fetchContent } from "../services/api";

const About = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent("node/about")
      .then((data) => {
        console.log("Fetched data:", data);

        // Check if we have the expected data structure
        if (data.data && data.data.length > 0) {
          const bodyValue = data.data[0].attributes.body.value;

          // Use a regular expression to find the image src
          const match = bodyValue.match(
            /src="(\/sites\/default\/files\/[^"]+)"/
          );
          const imageUrl = match ? `http://localhost:50444${match[1]}` : null;

          setContent({
            ...data.data[0],
            attributes: {
              ...data.data[0].attributes,
              body: {
                ...data.data[0].attributes.body,
                value: bodyValue,
              },
              imageUrl: imageUrl, // Store the image URL separately
            },
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
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
      style={{
        marginTop: "70px",
        marginLeft: "50px",
        marginRight: "50px",
        marginBottom: "20px",
        flex: "1",
      }}
    >
      <h1>About Me</h1>
      {content && content.attributes && content.attributes.body ? (
        <Row>
          <Col xs={12} md={4}>
            {/* Display image if URL is available */}
            {content.attributes.imageUrl && (
              <Image
                src={content.attributes.imageUrl}
                alt="About Me"
                width={400}
                height={400}
                rounded
                className="me-3 float-start" // Float image left with margin
                style={{ border: "5px solid #d3d3d3",marginTop:"60px" }} // Add border here
              />
            )}
          </Col>
          <Col xs={12} md={8}>
            {/* Display the text wrapped around the image */}
            <div
              dangerouslySetInnerHTML={{
                __html: content.attributes.body.value.replace(/<img[^>]*>/, ""), // Remove the <img> tag to avoid duplication
              }}
            />
          </Col>
        </Row>
      ) : (
        <div>No content available</div>
      )}
    </Container>
  );
};

export default About;
