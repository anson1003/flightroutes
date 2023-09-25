import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <div className="bg-black text-white">
      <Container>
        <Row className="pb-3 my-5 py-2">
          <Col md={6} className="p-5">
            <h2 className="mb-4">
              <strong>
                <span
                  style={{
                    background: "linear-gradient(to bottom, #ffff, #EEEDED)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Bringing People back home
                </span>
              </strong>
            </h2>
            <h2 className="mb-4">
              <strong>
                <span
                  style={{
                    background: "linear-gradient(to bottom, #EEEDED, #337CCF)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  safe through seamless
                </span>
              </strong>
            </h2>
            <h2 className="mb-4">
              <strong>
                <span
                  style={{
                    background: "linear-gradient(to bottom, #337CCF, #1450A3)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  tracking and communication.
                </span>
              </strong>
            </h2>
            <h2 className="mb-4">
              <strong>
                {" "}
                <span
                  style={{
                    background: "linear-gradient(to bottom, #1450A3, #191D88)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Anywhere. Anytime.
                </span>
              </strong>
            </h2>
            <p className="text-secondary">
              FlyMe is an innovative online platform designed to help you
              effortlessly track flights and stay informed about every aspect of
              your air travel experience. Whether you're a frequent flyer or
              planning a special trip, FlyMe offers a comprehensive suite of
              features to enhance your journey.
            </p>
          </Col>
          <Col md={6} className="p-1">
            <Card className="bg-transparent border-0">
              <Card.Img
                src="/images/imagefront.png"
                alt="Music"
                className="img-fluid"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
