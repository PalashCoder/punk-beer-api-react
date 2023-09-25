import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.punkapi.com/v2/beers')
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Punk Beers</h1>
      <input
        type="text"
        placeholder="Search for a beer"
        className="form-control mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredBeers.map((beer) => (
          <div className="col-md-4 mb-4" key={beer.id}>
            <div className="card">
              <img
                src={beer.image_url}
                alt={beer.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{beer.name}</h5>
                <p className="card-text">{beer.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
