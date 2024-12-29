import React, { useState } from "react";
import "../../Styles/brandauth.css";
import loginImage from "../../Asserts/login_back.png";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Brandauth = () => {

 const navigate = useNavigate();



  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    businessLicense: "",
    presentID: "",
    socialLinks: { instagram: "", facebook: "", x: "" },
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialLinksChange = (platform, value) => {
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [platform]: value },
    }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 4 && formData.termsAccepted) {
      alert("Form Submitted Successfully!");
      console.log(formData);
      navigate('/Brand');

    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  const isFormValid =
    formData.termsAccepted &&
    (formData.socialLinks.instagram || formData.socialLinks.facebook || formData.socialLinks.x);

  return (
    <div className="auth-container">
      <div className="auth-left">
      {step === 0 && (
          <>
            <h1>Signin</h1>
            <form>
            <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Example@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="abc1234"
                value={formData.empassowrd}
                onChange={handleInputChange}
              />
               <button type="button" className="auth-button" onClick={handleNext}>
                Submit
                </button>
                  <text>Don't have an account?</text>
                <button>Create an Account</button>
            </form>
          </>
        )}
        {step === 1 && (
          <>
            <h1>Create an Account 🚀</h1>
            <form>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Example@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <button type="button" className="auth-button" onClick={handleNext}>
                Send OTP
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Verify OTP</h1>
            <form>
              <label>Enter OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter the OTP sent to your phone"
                value={formData.otp}
                onChange={handleInputChange}
              />
              <div className="auth-buttons">
                <button type="button" className="auth-button" onClick={handleBack}>
                  Back
                </button>
                <button type="button" className="auth-button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h1>Business Details</h1>
            <form>
              <label>Business License (Tax ID, etc.)</label>
              <input
                type="text"
                name="businessLicense"
                placeholder="Enter your business license ID"
                value={formData.businessLicense}
                onChange={handleInputChange}
              />
              <label>Present ID (Aadhar, PAN, etc.)</label>
              <input
                type="text"
                name="presentID"
                placeholder="Enter your present ID"
                value={formData.presentID}
                onChange={handleInputChange}
              />
              <label>Social Media Links</label>
              <div className="social-media-inputs">
                <label>
                  <FaInstagram /> Instagram:
                  <input
                    type="text"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      handleSocialLinksChange("instagram", e.target.value)
                    }
                    placeholder="Enter your Instagram username"
                  />
                </label>
                <label>
                  <FaFacebook /> Facebook:
                  <input
                    type="text"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      handleSocialLinksChange("facebook", e.target.value)
                    }
                    placeholder="Enter your Facebook username"
                  />
                </label>
                <label>
                  <FaTwitter /> X:
                  <input
                    type="text"
                    value={formData.socialLinks.x}
                    onChange={(e) => handleSocialLinksChange("x", e.target.value)}
                    placeholder="Enter your X (formerly Twitter) username"
                  />
                </label>
              </div>
              <div className="auth-buttons">
                <button type="button" className="auth-button" onClick={handleBack}>
                  Back
                </button>
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleNext}
                  disabled={isFormValid}
                >
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {step === 4 && (
          <>
            <h1>Terms & Conditions</h1>
            <div className="terms">
              <p>
                By proceeding, you agree to the following terms and conditions:
              </p>
              <ul>
                <li>You must provide accurate and truthful information during registration.</li>
                <li>Misrepresentation or fraudulent activities will lead to strict legal actions as per government norms.</li>
                <li>You agree to adhere to the terms of service, privacy policy, and anti-fraud guidelines.</li>
                <li>Users must not engage in harmful practices, including exploitation, excessive demands, or breach of agreed conditions.</li>
                <li>Adherence to government regulations, including data security and privacy standards, is mandatory.</li>
              </ul>
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      termsAccepted: e.target.checked,
                    }))
                  }
                />
                I agree to the terms and conditions
              </label>
            </div>
            <div className="auth-buttons">
              <button type="button" className="auth-button" onClick={handleBack}>
                Back
              </button>
              <button type="submit" className="auth-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
       
      </div>
      <div className="auth-right">
        <img src={loginImage} alt="Background" className="auth-background" />
      </div>
    </div>
  );
};

export default Brandauth;
