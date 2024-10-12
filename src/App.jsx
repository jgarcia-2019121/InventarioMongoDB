import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null); 

  // Función para obtener los productos del backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Función para agregar o actualizar un producto
  const saveProduct = async () => {
    try {
      const newProduct = { name, quantity, price };
      if (editingProduct) {
        // Si estamos editando un producto, usamos PUT
        await axios.put(`http://localhost:8080/api/products/${editingProduct._id}`, newProduct);
        setEditingProduct(null); // Resetea el modo de edición
      } else {
        // Si es un producto nuevo, usamos POST
        await axios.post('http://localhost:8080/api/products', newProduct);
      }
      fetchProducts();  // Refresca la lista de productos
      resetForm();  // Resetea el formulario
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (id) => {
    console.log("ID del producto a eliminar:", id);
    if (!id) {
      console.error("No se puede eliminar: ID no válido.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();  // Refresca la lista después de eliminar
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  }; 

  const updateProduct = async () => {
    if (editingProduct && editingProduct._id) {
      try {
        await axios.put(`http://localhost:8080/api/products/${editingProduct._id}`, {
          name: editingProduct.name,
          quantity: editingProduct.quantity,
          price: editingProduct.price,
        });
        fetchProducts();
        setEditingProduct(null);
      } catch (error) {
        console.error('Error actualizando producto:', error);
      }
    }
  };

  const startEdit = (product) => {
    setName(product.name);
    setQuantity(product.quantity);
    setPrice(product.price);
    setEditingProduct(product);
  };

  // Resetear formulario después de guardar o cancelar
  const resetForm = () => {
    setName('');
    setQuantity(0);
    setPrice(0);
    setEditingProduct(null);
  };

  // Obtener productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Product Inventory
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Typography>
          <TextField
            fullWidth
            label="Product Name"
            value={editingProduct ? editingProduct.name : name}
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, name: e.target.value });
              } else {
                setName(e.target.value);
              }
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={editingProduct ? editingProduct.quantity : quantity}
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, quantity: e.target.value });
              } else {
                setQuantity(e.target.value);
              }
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Price"
            value={editingProduct ? editingProduct.price : price}
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, price: e.target.value });
              } else {
                setPrice(e.target.value);
              }
            }}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={editingProduct ? updateProduct : saveProduct}
            fullWidth
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Product List
          </Typography>
          {products.map((product) => (
            <Card key={product._id} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary">Quantity: {product.quantity}</Typography>
                <Typography color="textSecondary">Price: ${product.price}</Typography>
              </CardContent>
              <div>
              <IconButton aria-label="edit" onClick={() => startEdit(product)}>
                <EditIcon />
              </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteProduct(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;