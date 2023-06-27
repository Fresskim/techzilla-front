import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withLayouts from '../../HOC/withLayouts';
import { ENDPOINTS, apiCall } from '../../lib/Api';
import styles from './dashboard.module.scss';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist } from '../../store/slices/wishlistSlice'
import { updateProducts } from '../../store/slices/productsSlice';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import SliderComponent from '../../components/slider/slider';
import Brands from '../../components/Brands/Brands';
import { toast } from 'react-toastify';



function Dashboard() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const auth = useSelector((state) => state.auth.value);
    const [errorMessages, setErrorMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiCall(ENDPOINTS.products);
                setProducts(response);
                dispatch(updateProducts(response));
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, [dispatch]);

    const handleSearchQuery = (event) => {

        setSearchQuery(event.target.value);
        const filteredProducts = allProducts.filter((product) =>
            product.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setProducts(filteredProducts);

        if (event.target.value.trim() === '') {
            setProducts(allProducts);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = () => {


        const errors = [];

        const filteredProducts = allProducts.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);

        if (searchQuery.trim() === '') {
            setProducts(allProducts);
        }


        if (filteredProducts.length === 0) {
            errors.push('No product matched your search query');
        }

        if (errors.length) {
            setErrorMessages(errors);
        } else {
            setErrorMessages([]);
        }
    };

    const handleAddToCart = (e, product) => {

        if (auth && auth.token) {
            e.preventDefault();
            dispatch(addToCart(product));
        } else {
            toast.error('Please login first!');
        }

    };

    const handleAddToWishlist = (product) => {
        if (auth && auth.token) {
            dispatch(addToWishlist(product));
        } else {
            toast.error('Please login first!');

        }
    };

    return (
        <>
            <SliderComponent />

            <div className={styles.searchForm}>
                <form action="/search" method="GET">
                    <div className="search-input">
                        <input
                            type="text"
                            name="query"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </form>
            </div>

            {products.length === 0 && errorMessages.length !== 0 && <ErrorAlert messages={errorMessages} />}


            <ul className={styles.dashboard}>
                {products.map((product) => (
                    <li key={product._id} className={styles.productItem}>
                        <div className={styles.productImage}>
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className={styles.productDetails}>
                            <h4 className={styles.productTitle}>{product.title}</h4>
                            <p className={styles.productDescription}>{product.description}</p>
                            <p className={styles.productPrice}>Price:{product.price.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</p>

                            <button
                                className={styles['add-to-cart-btn']}
                                data-product-id={product._id}
                                onClick={(e) => handleAddToCart(e, product)}
                            >
                                Add to cart
                            </button>
                            <button className={styles.wishlistIcon} onClick={() => handleAddToWishlist(product)} >
                                <i class="fa-regular fa-heart"></i>                           </button>
                        </div>
                    </li>
                ))}
            </ul>
            < Brands />
        </>
    );
}

export default withLayouts(Dashboard);
