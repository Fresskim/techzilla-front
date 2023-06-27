import React, { useEffect, useState } from "react";
import withLayouts from '../../HOC/withLayouts';
import { useParams } from "react-router-dom";
import { ENDPOINTS, apiCall } from "../../lib/Api";
import { useDispatch, useSelector } from 'react-redux';
import styles from './categoryPage.module.scss'
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { addToCart } from '../../store/slices/cartSlice';
import { hyphenRegex, wordRegex } from "../../lib/constants";




function CategoryPage() {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.value);
    const [products, setProducts] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);




    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await apiCall(ENDPOINTS.products);
                setProducts(response)
            } catch (err) {
                console.error(err);
            }
        }


        fetchProducts();

    }, [categoryName]);

    const filteredProducts = products.filter(
        (product) => product.category.toLowerCase().replace(/[, ]/g, '') === categoryName.replace(/[, ]/g, '')
    );





    const handleAddToCart = (e, product) => {


        const errors = [];

        if (auth && auth.token) {
            e.preventDefault();
            dispatch(addToCart(product));
        } else {
            errors.push('Please login first!');
        }

        setErrorMessages(errors);
        console.log(errors)
    };


    const formattedCategoryName = categoryName.replace(hyphenRegex, ' ')
        .replace(wordRegex, match => match.toUpperCase());

    return (
        <div className={styles.categoryPageWrapper}>

            <h1>{formattedCategoryName}</h1>

            {products.length === 0 && errorMessages.length !== 0 && <ErrorAlert messages={errorMessages} />}


            <ul className={styles.categoryPage}>


                {filteredProducts.map((product) => (
                    <li key={product._id} className={styles.productItem}>
                        <div className={styles.productImage}>
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className={styles.productDetails}>
                            <h4 className={styles.productTitle}>{product.title}</h4>
                            <p className={styles.productDescription}>{product.description}</p>
                            <p className={styles.productPrice}>Price: {product.price.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</p>


                            <button
                                className={styles.addToCartBtn}
                                data-product-id={product._id}
                                onClick={(e) => handleAddToCart(e, product)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default withLayouts(CategoryPage);
