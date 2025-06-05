import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    setFavorites(saved ? JSON.parse(saved) : [])
  }, [])

  if (favorites.length === 0) {
    return <p>Vous n'avez pas encore de favoris.</p>
  }

  return (
    <div>
      <h2>Mes favoris</h2>
      <div className="cocktail-list">
        {favorites.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-card">
            <Link to={`/cocktail/${cocktail.idDrink}`}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-img" />
              <p>{cocktail.strDrink}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites