import { useContext } from "react";
import CartContext from "../store/CartContext";
import {currencyFormatter} from "../util/formatting"
import Button from "./UI/Button";

import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const userProgressCtx= useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const cartTotal=cartCtx.items.reduce((totalPrice, items)=> totalPrice+ items.price * items.quantity,0)

  function handleCloseCart(){
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress==='cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name}-{item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textonly onClick={handleCloseCart}>Close</Button>
        <Button onClick={handleCloseCart} >Go to Checkout</Button>
      </p>
    </Modal>
  );
}
