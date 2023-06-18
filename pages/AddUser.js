import React, { useState } from 'react';

const AddUser = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Faire quelque chose avec les valeurs de nom et prénom, par exemple, les envoyer à un serveur
    console.log(`Nom: ${nom}, Prénom: ${prenom}`);
    // Réinitialiser les champs après la soumission
    setNom('');
    setPrenom('');
  };

  return (
    <div className="container">
      <h1 className="text-center">Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input
            type="text"
            id="nom"
            className="form-control"
            value={nom}
            onChange={handleNomChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom" className="form-label">
            Prénom:
          </label>
          <input
            type="text"
            id="prenom"
            className="form-control"
            value={prenom}
            onChange={handlePrenomChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddUser;
