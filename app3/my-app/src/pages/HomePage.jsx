import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    const [cocktails, setCocktails] = useState([])
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
            .then(res => res.json())
            .then(data => setCocktails(data.drinks || []))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (cocktail) => {
        if (favorites.find(fav => fav.idDrink === cocktail.idDrink)) {
            setFavorites(favorites.filter(fav => fav.idDrink !== cocktail.idDrink))
        } else {
            setFavorites([...favorites, cocktail])
        }
    }

    return (
        <div>
            <h2>Liste des cocktails</h2>
            <div className="cocktail-list">
                {cocktails.slice(0, 100).map(cocktail => {
                    const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink)
                    return (
                        <div key={cocktail.idDrink} className="cocktail-card">
                            <Link to={`/cocktail/${cocktail.idDrink}`}>
                                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-img" />
                                <p>{cocktail.strDrink}</p>
                            </Link>
                            <span
                                className={`heart-icon${isFavorite ? ' favorite' : ''}`}
                                onClick={() => toggleFavorite(cocktail)}
                                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                                style={{ cursor: 'pointer', fontSize: '1.8em', userSelect: 'none' }}
                            >
                                {isFavorite ? '❤️' : '🤍'}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage