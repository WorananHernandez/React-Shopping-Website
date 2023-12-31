import { useContext } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ setIsShowCart }) => {
  const { cart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = arr => {
    return arr.reduce((cal, item) => {
      return cal + item.price * item.amount;
    }, 0);
  };
  const DollarUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleClearCart = () => {
    clearCart();
    navigate("/complete");
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.7)]"
      onClick={() => setIsShowCart(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-[250px] h-full absolute right-0 overflow-y-scroll "
      >
        <h1 className="bg-gray-300 py-2 text-center ">CART</h1>
        <div className="flex flex-col items-center px-2 py-4 ">
          {cart.map((item, i) => (
            <div
              key={item.id}
              className="text-center border-b-[3px] w-full mb-2 flex flex-col item-center "
            >
              <img
                className="w-[100px] h-[100px]"
                src={item.image}
                alt={item.title}
              />
              <p className="text-blue-800 font-bold w-6 h-6 rounded-full">
                {item.amount}
              </p>
              <h3 className="text-[0.8rem]">{item.title}</h3>

              <div className="flex items-center my-2">
                <p className="text-gray-600 ">{DollarUsd.format(item.price)}</p>
                <button onClick={() => addToCart(item)}>
                  <AiFillPlusCircle className="text-[20px] text-gray-400" />
                </button>
                <button onClick={() => removeFromCart(item)}>
                  <AiFillMinusCircle className="text-[20px] text-gray-400" />
                </button>
              </div>
            </div>
          ))}
          <p>Total:{DollarUsd.format(total(cart))}</p>
          <button
            className="bg-white border-2 border-gray-500 rounded-lg px-4 py-2 mr-2 color-blue-800 hover:bg-green-700 hover:text-white font-bold mt-3"
            onClick={handleClearCart}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// my cart doesnt work properly at 9.25pm
