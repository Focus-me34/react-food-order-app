import './App.css';
import Navbar from './components/navbar/Navbar';
import MenuItem from './components/menu/MenuItem';
import Home from './components/home/Home';
import CartProvider from './context/CartProvider';

function App() {
  return (
    <CartProvider>
      <Navbar></Navbar>
      <Home>
        <MenuItem></MenuItem>
      </Home>
    </CartProvider>)
}

export default App;
