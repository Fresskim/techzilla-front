import { NavLink, useNavigate } from "react-router-dom";
import styles from './header.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/slices/authSlice'




function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.value !== null);
    const cartItems = useSelector((state) => state.cart.products);
    const auth = useSelector((state) => state.auth.value);

    const isAdmin = auth?.user?.role === 'ADMIN'
    console.log(isAdmin)

    const navigate = useNavigate();

    const handleLogin = () => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <div className={styles.header}>
            <div className={styles.aboveNav}>
                <div className="logo">
                    <h3>TechZilla</h3>
                </div>

                <div className={styles.cartHeader}>

                    {isAdmin && (
                        <NavLink to="/admin" className={`${styles.admin} ${styles.adminIcon}`}>
                            <i className="fa-solid fa-user fa-lg"></i>
                        </NavLink>
                    )}

                    {<NavLink to="/wishlist" className={styles.wishlistIcon}>
                        <i class="fa-regular fa-heart fa-lg"></i>
                    </NavLink>}

                    <NavLink to="/cart">
                        {isAuthenticated && cartItems.length > 0 && (
                            <span className={styles.cartCount}>{cartItems.length}</span>
                        )}
                        <i className="fa-solid fa-cart-shopping fa-lg"></i>
                    </NavLink>

                    {isAuthenticated ? (
                        <button className={`${styles.logOut} ${styles.logoutIcon}`} onClick={handleLogout}>
                            <i class="fa-solid fa-right-from-bracket fa-lg"></i>
                        </button>
                    ) : null}

                </div>

            </div>

            <nav className="navigation">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to="/category/computers" >Computers</NavLink>
                <NavLink to="/category/phones-tablets" >Phones & Tablets</NavLink>
                <NavLink to="/category/tv-audio-photo" >TV, Audio & Photo</NavLink>
                <NavLink to="/category/gaming" >Gaming</NavLink>
                <NavLink to="/category/accessories" >Accessories</NavLink>
                <NavLink to="/category/networking" >Networking</NavLink>
                <NavLink to="/category/smart-home" >Smart Home</NavLink>
                <NavLink to="/category/deals" >Deals</NavLink>


                {!isAuthenticated ? (
                    <button className={styles.logIn} onClick={handleLogin}>Login</button>
                ) : null}
            </nav>


        </div>
    );
}

export default Header;
