import React, { createContext, useContext, useState, useReducer } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Alert,
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  Person, 
  ShoppingCart,
  Add,
  Remove,
  Delete
} from '@mui/icons-material';

// 1. Simple Context Example
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    toggleTheme: () => setIsDark(!isDark),
    colors: isDark ? {
      background: '#121212',
      text: '#ffffff',
      primary: '#90caf9',
      secondary: '#f48fb1'
    } : {
      background: '#ffffff',
      text: '#000000',
      primary: '#1976d2',
      secondary: '#dc004e'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 2. Complex Context with useReducer
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Sample products
const products = [
  { id: 1, name: 'React T-Shirt', price: 25, category: 'Clothing' },
  { id: 2, name: 'JavaScript Book', price: 35, category: 'Books' },
  { id: 3, name: 'Coffee Mug', price: 15, category: 'Accessories' },
  { id: 4, name: 'Stickers Pack', price: 8, category: 'Accessories' }
];

// Component that uses Theme Context
const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <Card sx={{ bgcolor: colors.background, color: colors.text }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Theme Context Example
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isDark}
              onChange={toggleTheme}
              icon={<Brightness7 />}
              checkedIcon={<Brightness4 />}
            />
          }
          label={`${isDark ? 'Dark' : 'Light'} Mode`}
        />
        <Alert severity="info" sx={{ mt: 2 }}>
          Current theme: <strong>{isDark ? 'Dark' : 'Light'}</strong>
        </Alert>
      </CardContent>
    </Card>
  );
};

// Component that uses Cart Context
const ProductList = () => {
  const { addItem } = useCart();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Available Products
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} key={product.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => addItem(product)}
                  startIcon={<Add />}
                  sx={{ mt: 1 }}
                >
                  Add to Cart
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const ShoppingCartDisplay = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Shopping Cart ({totalItems} items)
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Clear Cart
          </Button>
        </Box>

        {items.length === 0 ? (
          <Alert severity="info">
            Your cart is empty. Add some products!
          </Alert>
        ) : (
          <>
            <List>
              {items.map((item) => (
                <ListItem key={item.id} divider>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} each`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </Button>
                    <Chip label={item.quantity} />
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Add />
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeItem(item.id)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Alert severity="success">
              Total: <strong>${totalPrice.toFixed(2)}</strong>
            </Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Main Context Example Component
const ContextExample = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            🔄 React Context API Examples
          </Typography>

          <Grid container spacing={3}>
            {/* Theme Context Example */}
            <Grid item xs={12} md={6}>
              <ThemeToggle />
            </Grid>

            {/* Cart Context Example */}
            <Grid item xs={12} md={6}>
              <ShoppingCartDisplay />
            </Grid>

            {/* Product List */}
            <Grid item xs={12}>
              <ProductList />
            </Grid>

            {/* Context Benefits */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    🎯 Benefits of React Context
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Global State Management" 
                        secondary="Share state across multiple components without prop drilling"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Cleaner Component Tree" 
                        secondary="Avoid passing props through many levels of components"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Centralized State Logic" 
                        secondary="Manage complex state logic in one place with useReducer"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Performance Optimization" 
                        secondary="Components only re-render when their specific context value changes"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Provider Pattern" 
                        secondary="Wrap your app with context providers to make data available everywhere"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* When to Use Context */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    📋 When to Use Context vs Other Solutions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" color="primary">Use Context For:</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Theme switching" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="User authentication" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Language preferences" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Shopping cart state" />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" color="secondary">Consider Alternatives For:</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Frequent state updates" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Complex state logic" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Performance-critical apps" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Large-scale applications" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </CartProvider>
    </ThemeProvider>
  );
};

export default ContextExample;
