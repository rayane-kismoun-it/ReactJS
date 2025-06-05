import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CocktailDetail() {
  const { id } = useParams()
  const [cocktail, setCocktail] = useState(null)

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setCocktail(data.drinks ? data.drinks[0] : null))
  }, [id])

  console.log(cocktail)

  if (!cocktail) return <p>Cocktail non trouvé</p>

  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`]
    const measure = cocktail[`strMeasure${i}`]
    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure,
        thumb: `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
      })
    }
  }

  return (
    <div className="cocktail-detail">
      <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-detail-img" />
      <h3>Ingrédients :</h3>
      <ul className="ingredient-list">
        {ingredients.map((ing, idx) => (
          <li key={idx} className="ingredient-item">
            <img src={ing.thumb} alt={ing.name} className="ingredient-thumb" />
            <span>{ing.ingredient} {ing.name}</span>
          </li>
        ))}
      </ul>
      <h3>Instructions :</h3>
      <p>{cocktail.strInstructionsFR}</p>
    </div>
  )
}

export default CocktailDetail