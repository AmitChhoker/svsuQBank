import React, { useState, useEffect, useRef } from 'react';
import './AIFloatingButton.css';
import { FaRobot, FaCommentDots } from 'react-icons/fa';

const AIFloatingButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    feedback: '',
  });

  const formRef = useRef(null);

  const handleAIButtonClick = () => {
    window.open('https://chatting-beta-two.vercel.app/', '_blank');
  };

  const handleFeedbackClick = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdPemf1TSg_2QU3bjamlwgeoL0EvRwAjvsvCVo6sXYEPxi2XQ/formResponse';

    const formBody = new URLSearchParams();
    formBody.append('entry.1203446205', formData.name);
    formBody.append('entry.1998932707', formData.course);
    formBody.append('entry.1772663144', formData.feedback);

    try {
      await fetch(formURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formBody.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      alert('Thanks for your feedback!');
    } catch (err) {
      alert('Submission failed. Try again.');
    }

    setFormData({ name: '', course: '', feedback: '' });
    setShowForm(false);
  };

  // Close form on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
        setFormData({ name: '', course: '', feedback: '' });
      }
    };

    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);

  return (
    <div className="ai-feedback-wrapper">
      {showForm && (
        <form ref={formRef} className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            name="course"
            placeholder="Your Course (optional)"
            onChange={handleChange}
            value={formData.course}
          />
          <textarea
            name="feedback"
            placeholder="Your Feedback"
            required
            onChange={handleChange}
            value={formData.feedback}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
      {/* <p>Feedback</p> */}
      <div className="feedback-button" onClick={handleFeedbackClick}>
        <FaCommentDots className="feedback-icon" />
        <p>Feedback</p>
      </div>
      <div className="ai-button-container" onClick={handleAIButtonClick}>
        <FaRobot className="ai-icon" />
        <span className="ai-text">Zerry</span>
      </div>
    </div>
  );
};

export default AIFloatingButton;
