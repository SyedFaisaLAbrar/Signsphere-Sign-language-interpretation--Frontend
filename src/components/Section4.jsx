import React from 'react';
import './Section4.css';
import stepIcon1 from '../assets/product-image.png'; // Replace with the correct paths
import stepIcon2 from '../assets/product-image.png';
import stepIcon3 from '../assets/product-image.png';
import stepIcon4 from '../assets/product-image.png';

const Section4 = () => {
  return (
    <div className="process-section">
      <h2 className="process-heading">The Process</h2>
      <div className="process-content">
        {/* Step 1 - Full width */}
        <div className="process-step process-step-main">
          <div className="step-icon">
            <img src={stepIcon1} alt="Dataset Icon" />
          </div>
          <div className="step-text">
            <h3>Largest dataset of sign language</h3>
            <p>
              Signapse has collected the largest sign language dataset to deliver the most accurate
              translations as quickly as possible.
            </p>
          </div>
        </div>

        {/* Remaining Steps */}
        <div className="process-steps-grid">
          {/* Step 2 */}
          <div className="process-step">
            <img src={stepIcon2} alt="View extracts" />
            <h4>View extracts</h4>
          </div>

          {/* Step 3 */}
          <div className="process-step">
            <img src={stepIcon3} alt="Professional training" />
            <h4>Professional training</h4>
          </div>

          {/* Step 4 */}
          <div className="process-step">
            <img src={stepIcon4} alt="Integration" />
            <h4>Integration</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
