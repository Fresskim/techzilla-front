import React, { useEffect, useState } from 'react';
import withLayouts from '../../HOC/withLayouts';
import { ENDPOINTS, apiCall } from '../../lib/Api';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './adminPanel.module.scss';
import axios from 'axios';

function AdminPanel() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        category: '',
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiCall(ENDPOINTS.products);
                setProducts(response);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await apiCall(ENDPOINTS.categories);
                setCategories(response);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const handleNewProductChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        setNewProduct({
            ...newProduct,
            image: event.target.files[0],
        });
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', newProduct.image);
            formData.append('title', newProduct.title);
            formData.append('description', newProduct.description);
            formData.append('price', newProduct.price);
            formData.append('category', newProduct.category);

            const response = await axios.post('http://localhost:3000/products', formData);

            const addedProduct = response.data;
            setProducts([...products, addedProduct]);

            setNewProduct({
                title: '',
                description: '',
                price: '',
                image: null,
                category: '',
            });

            setIsFormVisible(false);
        } catch (error) {
            toast.error('Error creating product');
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleUpdateProduct = async (productId, updatedFields) => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${productId}`, updatedFields);
            const updatedProduct = response.data;
            console.log('Updated product:', updatedProduct);

            const updatedProducts = products.map((product) => {
                if (product._id === updatedProduct._id) {
                    return updatedProduct;
                }
                return product;
            });
            setProducts(updatedProducts);
            toast.success('Product updated succesfully')

        } catch (error) {
            toast.error('Error updating product');
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/products/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
            toast.info('Product deleted');
        } catch (error) {
            toast.error('Error deleting product');
            console.error('Error deleting product:', error);
        }
    };

    const auth = useSelector((state) => state.auth.value);
    const userRole = auth.user?.role;

    if (userRole !== 'ADMIN') {
        return <Navigate to="/dashboard" />;
    }

    const handleFieldChange = (event, field) => {
        const updatedProducts = products.map((product) => {
            if (product._id === field._id) {
                return { ...product, [event.target.name]: event.target.value };
            }
            return product;
        });
        setProducts(updatedProducts);

    };

    const toggleEditing = (productId) => {
        const updatedProducts = products.map((product) => {
            if (product._id === productId) {
                return { ...product, editing: !product.editing };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    return (
        <div className={styles.adminPanel}>
            <button className={isFormVisible ? styles.redButton : styles.btnAddNew} onClick={toggleFormVisibility}>
                {isFormVisible ? 'Cancel' : 'Add New Product '}
            </button>
            {isFormVisible && (
                <form className={styles.productForm} onSubmit={handleAddProduct}>
                    <label>
                        Name:
                        <input type="text" name="title" value={newProduct.title} onChange={handleNewProductChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={newProduct.price} onChange={handleNewProductChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={newProduct.description} onChange={handleNewProductChange}></textarea>
                    </label>
                    <label>
                        Category:
                        <select name="category" value={newProduct.category} onChange={handleNewProductChange}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Image:
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <button type="submit">Add Product</button>
                </form>
            )}
            <table className={styles.productTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    {product.editing ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="title"
                                                value={product.title}
                                                onChange={(event) => handleFieldChange(event, product)}
                                            />
                                            <input
                                                type="text"
                                                name="thumbnail"
                                                value={product.image}
                                                onChange={(event) => handleFieldChange(event, product)}
                                            />
                                            {product.image && <img className={styles.thumbnail} src={product.image} alt={product.title} />}
                                        </div>
                                    ) : (
                                        <div>
                                            {product.image && <img className={styles.thumbnail} src={product.image} alt={product.title} />}
                                            {product.title}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {product.editing ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={(event) => handleFieldChange(event, product)}
                                        />
                                    ) : (
                                        product.price.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
                                    )}
                                </td>
                                <td>
                                    {product.editing ? (
                                        <textarea
                                            name="description"
                                            value={product.description}
                                            onChange={(event) => handleFieldChange(event, product)}
                                        ></textarea>
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td>{product.category}</td>
                                <td>
                                    {product.editing ? (
                                        <button className={styles.updateBtn} onClick={() => handleUpdateProduct(product._id, product)}>Update</button>
                                    ) : (
                                        <>
                                            <button className={styles.editBtn} onClick={() => toggleEditing(product._id)}>Edit</button>
                                            <button className={styles.deleteBtn} onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default withLayouts(AdminPanel);
