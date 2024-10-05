import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.quantity} units - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
