import React from 'react';
import GlobalFooter from '../../components/common/GlobalFooter';
import PublicHeader from '../../components/common/PublicHeader';

const LegalPage = ({ type }) => {
  const content = type === 'privacy' 
    ? {
        title: 'Privacy Policy',
        text: 'At Navya, we respect your privacy. All data collected through our system is stored locally where possible, and only synced to our secure cloud when required. We do not sell your agricultural or personal data to third parties. Your data is used exclusively to provide intelligent post-harvest analysis.'
      }
    : {
        title: 'Terms of Service',
        text: 'By using Navya, you agree to these Terms of Service. Our platform is designed to provide AI-driven insights for farmers and aggregators. You are responsible for ensuring the physical data (like images) you upload is accurate. Navya is provided "as-is" without any warranties of absolute agricultural success.'
      };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#faf8f2' }}>
      <PublicHeader />
      <main style={{ flex: 1, padding: '60px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#043c2b', marginBottom: '20px' }}>{content.title}</h1>
        <p style={{ color: '#5b625f', fontSize: '18px', lineHeight: '1.6' }}>{content.text}</p>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default LegalPage;
