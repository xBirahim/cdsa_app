import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentContainer}>
        <p style={textStyle}>© 2023 Mon Entreprise. Tous droits réservés. | Numéro de téléphone : 123-456-789 | Email : contact@monentreprise.com</p>
        <div style={socialIcons}>
          <a href="https://e7.pngegg.com/pngimages/974/321/png-clipart-logo-facebook-computer-icons-instagram-facebook-desktop-wallpaper-brand.png" target="_blank" rel="noopener noreferrer">
            <img src="facebook.png" alt="Facebook" style={iconStyle} />
          </a>
          <a href="https://www.instagram.com/monentreprise" target="_blank" rel="noopener noreferrer">
            <img src="instagram.png" alt="Instagram" style={iconStyle} />
          </a>
          <a href="https://www.twitter.com/monentreprise" target="_blank" rel="noopener noreferrer">
            <img src="twitter.png" alt="Twitter" style={iconStyle} />
          </a>
        </div>
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
