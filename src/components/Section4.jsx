import React from 'react';
import './Section4.css';
import stepIcon1 from '../assets/Slait_Animation-ezgif.com-effects.gif'; // Replace with the correct paths
import stepIcon2 from '../assets/gesture-recognition.png';
import stepIcon3 from '../assets/data-model.png';
import stepIcon4 from '../assets/webcam.png';

const Section4 = () => {
  return (
    <div className="process-section">
      <h1 className='process-heading'>Working of Signsphere</h1>
      <div className="process-content">
        {/* Step 1 - Full width */}
        <div className=" process-step-main">
          <div className="step-icon">
            <img style={{ width: "500px",height: "500px" }} src={stepIcon1} alt="Dataset Icon" className="step-gif" />
          </div>
          <div className="step-text">
            <h3>Process of sign language interpretation</h3>
            <p>
              Signsphere <span class="highlighted">takes realtime sign video,</span> forwards it to mediapipe after extracting
              landmarks forwards it to AI model which <span class="highlighted">translates as quickly</span> as possible and <span class="highlighted">responds</span>.
            </p>
            <a href="/interpreter" className="partner-btn">Try Now</a>
          </div>
        </div>

        {/* Remaining Steps */}
        <div className="process-steps-grid">
          {/* Step 2 */}
          <div className="process-step">
            <img className="first_img" src={stepIcon2} alt="View extracts" />
            <h4>Realtime sign extraction</h4>
          </div>

          {/* Step 3 */}
          <div className="process-step">
            <img className="second_img" src={stepIcon3} alt="Professional training" />
            <h4>Professional AI model</h4>
          </div>

          {/* Step 4 */}
          <div className="process-step">
            <img className="second_img" src={stepIcon4} alt="Integration" />
            <h4>Visual Interactivity</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
