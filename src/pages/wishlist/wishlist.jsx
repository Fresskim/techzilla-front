import { useDispatch, useSelector } from "react-redux";
import styles from './wishlist.module.scss'
import withLayouts from '../../HOC/withLayouts';
import { addToCart } from '../../store/slices/cartSlice';
import { removeFromWishlist } from "../../store/slices/wishlistSlice";
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function Wishlist() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.value);
    const wishlistItems = useSelector((state) => state.wishlist.products);

    const [errorMessages, setErrorMessages] = useState([]);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromWishlist(productId));
        toast.info('Product removed from wishlist!');
    }

    const handleAddToCart = (e, item) => {
        const errors = [];

        if (auth && auth.token) {
            e.preventDefault();
            dispatch(addToCart(item));
        } else {
            errors.push('Please login first!');
        }

        setErrorMessages(errors);
        console.log(errors)
    };

    return (
        <>
            {errorMessages.length !== 0 && <ErrorAlert messages={errorMessages} />}

            <h2 className={styles.wishlistTitle}>Wishlist</h2>

            <div className={styles.wishlist}>
                {wishlistItems.length === 0 ? (
                    <>
                        <p className={styles.wishlistEmpty}>Your wishlist is empty.</p>
                        <a href='/'>Click here to return to the main page to browse products!</a>
                    </>

                ) : (
                    <ul className={styles.wishlistItems}>
                        {wishlistItems.map((item) => (
                            <li key={item._id} className={styles.wishlistItem}>
                                <div className={styles.wishlistItemInfo}>
                                    <img src={item.image} alt={item.name} className={styles.wishlistItemImage} />
                                    <div className={styles.wishlistItemText}>
                                        <span className={styles.wishlistItemName}>{item.title}</span>
                                        <span className={styles.wishlistItemDescription}>{item.description}</span>
                                        <span className={styles.wishlistItemPrice}>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</span>
                                    </div>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.addToCartBtn}
                                        data-product-id={item._id}
                                        onClick={(e) => handleAddToCart(e, item)}
                                    >
                                        Add to cart
                                    </button>
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
            </div>
        </>
    );
}

export default withLayouts(Wishlist);
