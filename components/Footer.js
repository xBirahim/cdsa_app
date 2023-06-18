import { Text} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


const Footer = () => {
  const num = "+330606525367";
  return (
    <footer>
      <div className="contact-info">
        <h3>Coordonnées :</h3>
        <p>Adresse : 123 rue de l'Exemple, Ville, Pays</p>
        <p>Téléphone : +1 234 567 890</p>
        <p>Email : info@example.com</p>
      </div>
      <div className="social-media">
        <h3 css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%", mb: '10px', ml:'20%', mt:'-10px' }} >Réseaux sociaux :</h3>
        <ul>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
        </ul>
      </div>
      <style jsx>{`
        footer {
          background-color: #f2f2f2;
          padding: 20px;
          text-align: center;
        }

        .contact-info, .social-media {
          margin-bottom: 20px;
        }

        .social-media ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
        }

        .social-media li {
          margin: 0 10px;
        }

        .social-media a {
          color: #333;
          font-size: 20px;
          transition: color 0.3s;
        }

        .social-media a:hover {
          color: #888;
        }
      `}</style>
     
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Paye ton KAWA. Tous droits réservés.</p>
      </div>
   
    </footer>
    
  );
    
};

export default Footer;