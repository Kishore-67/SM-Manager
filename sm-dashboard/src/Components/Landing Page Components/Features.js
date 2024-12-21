import React from 'react';
import image1 from '../../Asserts/image0.png'; 
import image2 from '../../Asserts/image1.png';
import image3 from '../../Asserts/image2.png';
import image4 from '../../Asserts/image3.png';
import logo from '../../Asserts/Left.png';

const Features = () => {
  return (
    <section className="feature-section">
      
      <div className="feature-item">
        <div className="image1">
          <img src={image1} alt="Feature 1" />
        </div>
        <div className="text">
          <h2>Light, Fast & Powerful</h2>
          <p>
            Our platform is more than a tool; it’s a comprehensive solution designed to support and amplify your digital marketing efforts. Social media is no longer just a space for posting updates—it’s a dynamic ecosystem where brands connect, engage, and grow. That’s why we’ve created a platform that empowers you at every step of your journey.
          </p>

          <div className="cards-container">
            
            <div className="card">
              <img src={logo} alt="Logo 1" className="card-logo" />
              <h3>Plan Smarter</h3>
              <p>Create a cohesive content strategy with a centralized content calendar.</p>
            </div>

            <div className="card">
              <img src={logo} alt="Logo 2" className="card-logo" />
              <h3>Execute Seamlessly</h3>
              <p>Schedule and publish posts across all major platforms from one place.</p>
            </div>
           
            <div className="card">
              <img src={logo} alt="Logo 3" className="card-logo" />
              <h3>Analyze Effectively</h3>
              <p>Gain actionable insights into your audience’s behavior, campaign performance, and content effectiveness.</p>
            </div>
            <div className="card">
              <img src={logo} alt="Logo 4" className="card-logo" />
              <h3>Optimize for Success</h3>
              <p>Use real-time data and AI-driven recommendations to fine-tune your approach for maximum engagement and growth.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-item">
        <div className="image">
          <img src={image2} alt="Feature 2" />
        </div>
        <div className="text">
          <h2>Why to use our application</h2>
          <ul>
            <li>🚀 <strong>Boost Your Marketing Efficiency</strong> - Save time by managing all your social media accounts from a single platform. Plan, schedule, and publish posts seamlessly.</li>
            <li>📊 <strong>Real-Time Analytics</strong> - Gain deep insights into your performance with interactive dashboards. Track engagement, follower growth, and campaign ROI with ease.</li>
            <li>🤝 <strong>Team Collaboration</strong> - Assign roles, streamline workflows, and collaborate with your team effortlessly. Ensure consistent brand communication across all platforms.</li>
            <li>🔍 <strong>Advanced Insights</strong> - Uncover trends and audience behavior to optimize your content strategy. Leverage AI-powered suggestions for the best times to post.</li>
          </ul>
        </div>
      </div>

      <div className="feature-item">
        <div className="image">
          <img src={image3} alt="Feature 3" />
        </div>
        <div className="text">
          <h2>Light, Fast & Powerful</h2>
          <ul>
            <li>📱 <strong>Multi-Platform Integration</strong> - Connect all your social accounts – Facebook, Instagram, LinkedIn, Twitter, and more.</li>
            <li>📅 <strong>Content Calendar</strong> - Plan your content with a visual calendar, ensuring consistency and engagement.</li>
            <li>📊 <strong>Performance Metrics</strong> - Detailed reports on impressions, reach, and engagement.</li>
            <li>👥 <strong>Audience Insights</strong> - Understand your audience demographics, preferences, and online behavior.</li>
            <li>📈 <strong>Competitor Analysis</strong> - Stay ahead by tracking what your competitors are doing right.</li>
            <li>⚙️ <strong>Customizable Widgets</strong> - Personalize your dashboard to focus on metrics that matter to you.</li>
          </ul>
        </div>
      </div>


      <div className="feature-item">
        <div className="image">
          <img src={image4} alt="Feature 4" />
        </div>
        <div className="text">
          <h2>How It Works</h2>
          <ul>
            <li>📝 <strong>Sign Up</strong> - Create an account and connect your social media profiles.</li>
            <li>⚙️ <strong>Customize Your Dashboard</strong> - Choose widgets, set goals, and personalize your experience.</li>
            <li>🚀 <strong>Start Managing</strong> - Schedule posts, track performance, and engage with your audience effortlessly.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Features;
