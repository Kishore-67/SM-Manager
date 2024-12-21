import React from "react";
import heroback from "../../Asserts/heroback.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Introduce Your Product Quickly & Effectively</h1>
        <p>
          In today's fast-paced digital world, managing multiple social media
          platforms can be overwhelming. That’s why we’ve built an intuitive
          dashboard designed to simplify and enhance your social media
          marketing efforts. Whether you’re a solopreneur, a growing business,
          or a seasoned marketer, our tool equips you with everything you need
          to succeed in the competitive online landscape.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Join Us</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
