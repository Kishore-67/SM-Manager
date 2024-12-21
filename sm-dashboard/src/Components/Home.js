import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import Header from "./Landing Page Components/Header";
import Hero from "./Landing Page Components/Hero";
import Features from "./Landing Page Components/Features";
import Pricing from "./Landing Page Components/Pricing";
import Footer from "./Landing Page Components/Footer";
import 'font-awesome/css/font-awesome.min.css';


const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
    
  );
};

export default Home;
