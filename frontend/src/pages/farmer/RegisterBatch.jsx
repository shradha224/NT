import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import GlobalFooter from '../../components/common/GlobalFooter';
import '../../assets/css/register-batch.css';

const RegisterBatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quantity: '',
    crop: '',
    date: '',
    origin: 'Pune Farm' // Default or selected origin
  });

  const handleGenerate = () => {
    // Navigate to dummy generated batch page for now with form data
    const batchId = `BATCH-${Math.floor(Math.random() * 10000)}`;
    navigate(`/farmer/batch-created/${batchId}`, { state: formData });
  };

  return (
    <div className="register-batch-root page-wrapper">
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
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />
          </div>

          {/* Crop Variety */}
          <div className="form-group">
            <label htmlFor="crop-variety">Crop Variety</label>
            <div className="select-wrapper">
              <select 
                id="crop-variety" 
                name="crop-variety" 
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
              >
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
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
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
              <span className="origin-placeholder">{formData.origin}</span>
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

        {/* Actions */}
        <div className="action-row" style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button type="button" className="cancel-button" onClick={() => navigate('/farmer/dashboard')} style={{ flex: 1, padding: '16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '16px', fontWeight: '500', color: '#4b5563', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="button" className="generate-button" onClick={handleGenerate} style={{ flex: 2, marginTop: 0 }}>
            <span className="plus-icon">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
            </span>
            <span>Generate Batch Profile</span>
          </button>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default RegisterBatch;
