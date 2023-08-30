import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentContainer}>
        <p style={textStyle}>© 2023 PayeTonKAWA. Tous droits réservés. | Numéro de téléphone : 09 99 99 20 20 | Email : ptk@contact.com</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#f4f4f4',
  padding: '20px 0',
  textAlign: 'center',
};

const contentContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const textStyle = {
  color: '#888',
  marginBottom: '5px',
};

const socialIcons = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const iconStyle = {
  width: '30px',
  height: '30px',
  margin: '0 10px',
};

export default Footer;
