import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulated API call, replace this with your actual API call
    const fetchData = async () => {
      const response = await fetch('https://64ef1da5219b3e2873c3f6f1.mockapi.io/com_revendeur');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Liste des commandes</h1>
      <table>
        <thead>
          <tr>
            <th>Nom du Client</th>
            <th>Contact du Client</th>
            <th>Référence de la Commande</th>
            <th>Date de la Commande</th>
            <th>Statut</th>
            <th>Date de Livraison</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.NomClient}</td>
              <td>{item.ContactClient}</td>
              <td>{item.ReferenceCommande}</td>
              <td>{item.DateCommande}</td>
              <td>{item.Statut}</td>
              <td>{item.DateLivraison}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;