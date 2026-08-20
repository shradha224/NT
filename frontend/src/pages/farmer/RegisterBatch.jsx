import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MapPin, ChevronRight, PlusCircle } from 'lucide-react';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import GlobalFooter from '../../components/common/GlobalFooter';
import '../../assets/css/register-batch.css';

const RegisterBatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quantity: '',
    crop: '',
    date: '',
    origin: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Uses native HTML5 validation before reaching here!
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

        <form onSubmit={handleSubmit}>
          <section className="form-card">
            <div className="form-group">
              <label htmlFor="quantity">Quantity (kg)</label>
              <input
                type="number"
                id="quantity"
                required
                min="1"
                placeholder="e.g. 100"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="crop-variety">Crop Variety</label>
              <div className="select-wrapper">
                <select 
                  id="crop-variety" 
                  required
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
                <span className="select-arrow"><ChevronDown size={20} /></span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="harvest-date">Harvest Date</label>
              <input
                type="date"
                id="harvest-date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="origin">Origin Farm Location</label>
              <div className="input-wrapper">
                <span className="location-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}><MapPin size={20} /></span>
                <input
                  type="text"
                  id="origin"
                  required
                  placeholder="e.g. Pune Farm, Plot A"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  style={{ paddingLeft: '40px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </section>

          <div className="action-row" style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button type="button" className="cancel-button" onClick={() => navigate('/farmer/dashboard')} style={{ flex: 1, padding: '16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '16px', fontWeight: '500', color: '#4b5563', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" className="generate-button" style={{ flex: 2, marginTop: 0 }}>
              <span className="plus-icon"><PlusCircle size={20} /></span>
              <span>Generate Batch Profile</span>
            </button>
          </div>
        </form>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default RegisterBatch;
