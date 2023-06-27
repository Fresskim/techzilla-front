import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/slices/cartSlice';
import withLayouts from '../../HOC/withLayouts';
import styles from './cartPage.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.products);
    const [quantities, setQuantities] = useState({});


    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
        toast.info('Product removed from cart!')
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };


    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * (quantities[item._id] || 1),
        0
    );

    return (
        <>
            <h2 className={styles.cartTitle}>Cart</h2>

            <div className={styles.cart}>
                {cartItems.length === 0 ? (
                    <>
                        <p className={styles.cartEmpty}>Your cart is empty.</p>
                        <a href='/'> Click here to return to the main page to browse products!</a>
                    </>

                ) : (
                    <ul className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <li key={item._id} className={styles.cartItem}>
                                <div className={styles.cartItemInfo}>
                                    <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                                    <div className={styles.cartItemText}>
                                        <span className={styles.cartItemName}>{item.title}</span>
                                        <span className={styles.cartItemDescription}>{item.description}</span>
                                        <span className={styles.cartItemPrice}>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</span>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <div className={styles.quantityContainer}>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) - 1)}
                                            disabled={(quantities[item._id] || 1) === 1}
                                        >
                                            -
                                        </button>
                                        <span className={styles.quantityValue}>{quantities[item._id] || 1}</span>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className={styles.removeBtn}
                                    >

                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {cartItems.length > 0 && (
                    <div className={styles.cartSummary}>
                        <span className={styles.totalPrice}>Total: {totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</span>
                        <button className={styles.buyNowBtn}>
                            <span className={styles.buttonText}>Proceed to payment</span>
                            <i className={`fa-solid fa-credit-card`}></i>
                        </button>

                    </div>
                )}
            </div>
        </>
    );
}



export default withLayouts(CartPage);
