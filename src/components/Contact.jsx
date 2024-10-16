import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contact = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://your-drupal-site.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle success or error here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
        marginRight: "0px",
        marginBottom: "20px",
        flex: "1",
      }}
    >
      <h1>Contact Me</h1>
      <Row>
        <Col md={8}>
          {content && content.attributes && content.attributes.body ? (
            <div
              dangerouslySetInnerHTML={{
                __html: content.attributes.body.value,
              }}
            />
          ) : (
            <div>No content available</div>
          )}
        </Col>
        <Col md={4}>
          <h2>Send a message</h2>
          <p>
           Don’t hesitate to reach out. I look forward to
            hearing your thoughts and ideas!
          </p>
          <Form
            action="MAILTO:bishnu.suyel@edu.bc.fi"
            method="post"
            enctype="text/plain"
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ marginLeft: "0px" }} // Set left margin to 0 pixels
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ marginLeft: "0px" }} // Set left margin to 0 pixels
              />
            </Form.Group>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{ marginLeft: "0px" }} // Set left margin to 0 pixels
              />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ marginLeft: "0px" }} // Set left margin to 0 pixels
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
