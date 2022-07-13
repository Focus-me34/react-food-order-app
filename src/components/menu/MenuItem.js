import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import Card from "../UI/Card";
import Input from "../UI/Input";
import ReactIcon from "../UI/ReactIcon";
import classes from "./MenuItem.module.css"
import CartContext from "../../context/cart-context";

const MenuItem = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useFetch();

  const updateMeals = (data) => {
    data.shift();
    setMeals(data)
  }

  useEffect(() => {
    fetchMeals(
      { url: "https://react-food-order-app-c715b-default-rtdb.europe-west1.firebasedatabase.app/meal.json" }, updateMeals
    );
  }, [fetchMeals]);

  const errorTemplate = <div className={classes["fetch-error"]}>
    <p>An error orccured: {error}</p>
  </div>

  const loadingTemplate = <div className={classes["fetch-loading"]} >
    <p>Meals are loading. Please wait ...</p>
    <ReactIcon></ReactIcon>
  </div>

  return (
    <Card className={classes["menu-items"]}>
      {error && errorTemplate}
      {isLoading && loadingTemplate}
      {meals.map((meal) => {
        return (
          <div className={classes.meal} key={meal.id}>
            <div>
              <h3>{meal.name}</h3>
              <p className={classes.description}>{meal.description}</p>
              <p className={classes.price}>$ {meal.price.toFixed(2)}</p>
            </div>
            <Input meals={meals} meal={meal}></Input>
          </div>)
      })}
    </Card>
  );
}
export default MenuItem;

// const DUMMY_MEALS = [
//   {
//     id: '1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: '2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: '3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: '4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
//   {
//     id: '5',
//     name: 'Couscous',
//     description: 'Deliciously morrocan',
//     price: 19.50,
//   },
// ];
