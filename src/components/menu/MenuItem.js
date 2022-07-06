import { useState, useRef, useEffect, useContext } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./MenuItem.module.css"

const MenuItem = () => {
  const [meals, setMeals] = useState(DUMMY_MEALS);

  return (
    <Card className={classes["menu-items"]}>
      {meals.map(meal => {
        return (
          <div className={classes.meal} key={meal.id}>
            <div>
              <h3>{meal.name}</h3>
              <p className={classes.description}>{meal.description}</p>
              <p className={classes.price}>{meal.price}$</p>
            </div>
            <Input meals={meals} meal={meal}></Input>
          </div>)
      })}
    </Card>
  );
}

export default MenuItem;

const DUMMY_MEALS = [
  {
    id: '1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: '2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: '3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: '4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];
