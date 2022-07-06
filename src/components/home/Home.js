import Card from "../UI/Card";
import classes from "./Home.module.css";


const Home = (props) => {
  return (
    <div className={classes["home-container"]}>
      <div className={classes["main-image"]}>
        <img src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg" alt="Table full of meals" />
      </div>

      <div className={classes["inner-container"]}>
        <Card className={classes.summary}>
          <h2>Delicious Food, Delivered To You</h2>
          <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
          <p>All our meals are cooked with high quality ingredients, just in time and of course by experienced chefs!</p>
        </Card>
        {props.children}
      </div>
    </div>
  );
}

export default Home;
