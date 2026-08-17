import React from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/register-batch.css';

const RegisterBatch = () => {
  const navigate = useNavigate();

  const handleGenerate = () => {
    // Navigate to dummy generated batch page for now
    navigate('/farmer/batch-created/TOM-024');
  };

  return (
    <div className="register-batch-root">
      <FarmerNavbar />
      <main className="page-container">
        <section className="page-heading">
          <h1>Register New Batch</h1>
          <p>Enter details to initiate tracking for a new harvest cycle.</p>
        </section>

        <section className="form-card">
          {/* Quantity */}
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              placeholder="e.g. 100kg"
            />
          </div>

          {/* Crop Variety */}
          <div className="form-group">
            <label htmlFor="crop-variety">Crop Variety</label>
            <div className="select-wrapper">
              <select id="crop-variety" name="crop-variety" defaultValue="">
                <option value="" disabled>Select variety...</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="onion">Onion</option>
                <option value="cabbage">Cabbage</option>
                <option value="cauliflower">Cauliflower</option>
              </select>
              <span className="select-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>

          {/* Harvest Date */}
          <div className="form-group">
            <label htmlFor="harvest-date">Harvest Date</label>
            <input
              type="date"
              id="harvest-date"
              name="harvest-date"
            />
          </div>

          {/* Origin Field */}
          <div className="form-group">
            <label htmlFor="origin">Origin Field</label>
            <button type="button" className="origin-field" id="origin">
              <span className="location-icon">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="2.5"></circle>
                </svg>
              </span>
              <span className="origin-placeholder">Select place</span>
              <span className="origin-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </button>
          </div>
        </section>

        {/* Generate Button */}
        <button type="button" className="generate-button" onClick={handleGenerate}>
          <span className="plus-icon">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 8v8"></path>
              <path d="M8 12h8"></path>
            </svg>
          </span>
          <span>Generate Batch Profile</span>
        </button>
      </main>
    </div>
  );
};

export default RegisterBatch;
