import React, { useState, useEffect } from 'react';
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
  Chip
} from '@mui/material';
import { Add, Remove, Refresh, Favorite } from '@mui/icons-material';

// Custom Hook 1: useCounter
const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

// Custom Hook 2: useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Custom Hook 3: useOnlineStatus
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Custom Hook 4: useDebounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom Hook 5: useToggle
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
};

const CustomHooksExample = () => {
  // Using our custom hooks
  const counter1 = useCounter(0, 1);
  const counter2 = useCounter(10, 5);
  const [savedName, setSavedName] = useLocalStorage('userName', '');
  const [inputName, setInputName] = useState(savedName);
  const isOnline = useOnlineStatus();
  const debouncedInput = useDebounce(inputName, 500);
  const { value: isLiked, toggle: toggleLike } = useToggle(false);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        🎣 Custom Hooks Examples
      </Typography>

      <Grid container spacing={3}>
        {/* useCounter Examples */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                1. useCounter Hook
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Counter 1 (step: 1)</Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {counter1.count}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    onClick={counter1.increment}
                    startIcon={<Add />}
                  >
                    Increment
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={counter1.decrement}
                    startIcon={<Remove />}
                  >
                    Decrement
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={counter1.reset}
                    startIcon={<Refresh />}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6">Counter 2 (step: 5)</Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {counter2.count}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    onClick={counter2.increment}
                    startIcon={<Add />}
                  >
                    +5
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={counter2.decrement}
                    startIcon={<Remove />}
                  >
                    -5
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={counter2.reset}
                    startIcon={<Refresh />}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* useLocalStorage Example */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="secondary">
                2. useLocalStorage Hook
              </Typography>
              
              <Typography variant="h6">Persistent Name Storage</Typography>
              <TextField
                fullWidth
                label="Enter your name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={() => setSavedName(inputName)}
                sx={{ mb: 2 }}
              >
                Save to Local Storage
              </Button>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Saved name: <strong>{savedName || 'None'}</strong>
              </Alert>
              
              <Typography variant="body2" color="text.secondary">
                This name persists even after page refresh!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* useOnlineStatus Example */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="success">
                3. useOnlineStatus Hook
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  label={isOnline ? 'Online' : 'Offline'}
                  color={isOnline ? 'success' : 'error'}
                  variant="outlined"
                />
                <Typography variant="body1">
                  {isOnline ? '🟢 Connected to internet' : '🔴 No internet connection'}
                </Typography>
              </Box>
              
              <Alert severity={isOnline ? 'success' : 'error'}>
                {isOnline 
                  ? 'You are currently online and can access all features.'
                  : 'You are offline. Some features may not work properly.'
                }
              </Alert>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Try disconnecting your internet to see this in action!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* useDebounce Example */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="warning">
                4. useDebounce Hook
              </Typography>
              
              <Typography variant="h6">Debounced Input</Typography>
              <TextField
                fullWidth
                label="Type something..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Typography variant="body2">
                  <strong>Current input:</strong> {inputName}
                </Typography>
                <Typography variant="body2">
                  <strong>Debounced value (500ms):</strong> {debouncedInput}
                </Typography>
              </Paper>
              
              <Typography variant="caption" color="text.secondary">
                The debounced value updates 500ms after you stop typing
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* useToggle Example */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="info">
                5. useToggle Hook
              </Typography>
              
              <Typography variant="h6">Like Button</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant={isLiked ? 'contained' : 'outlined'}
                  color="error"
                  onClick={toggleLike}
                  startIcon={<Favorite />}
                >
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Chip
                  label={isLiked ? 'True' : 'False'}
                  color={isLiked ? 'success' : 'default'}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => toggleLike.setTrue()}
                >
                  Set True
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => toggleLike.setFalse()}
                >
                  Set False
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Custom Hooks Benefits */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🎯 Benefits of Custom Hooks
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Reusability" 
                    secondary="Extract common logic and reuse it across multiple components"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Cleaner Components" 
                    secondary="Keep your components focused on UI, move logic to custom hooks"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Testing" 
                    secondary="Easier to test logic in isolation from UI components"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Composition" 
                    secondary="Combine multiple hooks to create complex functionality"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Naming Convention" 
                    secondary="Always start custom hooks with 'use' (e.g., useCounter, useLocalStorage)"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomHooksExample;
