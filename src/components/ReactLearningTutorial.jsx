import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Pause,
  Refresh,
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const ReactLearningTutorial = () => {
  // 1. useState Examples
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  // 2. useEffect Examples
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 3. useRef Examples
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const previousCountRef = useRef(0);

  // 4. useCallback Example
  const handleAddFavorite = useCallback((item) => {
    setFavorites(prev => [...prev, item]);
  }, []);

  // 5. useMemo Example
  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation...');
    return count * 2 + Math.random() * 100;
  }, [count]);

  // useEffect for timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // useEffect for window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect for tracking previous count
  useEffect(() => {
    previousCountRef.current = count;
  });

  const concepts = [
    {
      title: "useState Hook",
      description: "Manages component state",
      examples: [
        "Counter: Tracks a number value",
        "Form Input: Manages text input",
        "Toggle: Boolean state for visibility",
        "Array: Managing list of favorites"
      ]
    },
    {
      title: "useEffect Hook",
      description: "Handles side effects in components",
      examples: [
        "Timer: Runs code on component mount/unmount",
        "Window Resize: Listens to browser events",
        "Cleanup: Prevents memory leaks"
      ]
    },
    {
      title: "useRef Hook",
      description: "References DOM elements and persists values",
      examples: [
        "DOM Access: Direct access to input elements",
        "Previous Values: Track previous state values",
        "Mutable Values: Values that don't trigger re-renders"
      ]
    },
    {
      title: "useCallback Hook",
      description: "Memoizes functions to prevent unnecessary re-renders",
      examples: [
        "Event Handlers: Optimize function references",
        "Child Components: Prevent child re-renders"
      ]
    },
    {
      title: "useMemo Hook",
      description: "Memoizes expensive calculations",
      examples: [
        "Expensive Operations: Cache calculation results",
        "Performance: Only recalculate when dependencies change"
      ]
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        🚀 React Hooks Learning Tutorial
      </Typography>

      <Grid container spacing={3}>
        {/* useState Examples */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                1. useState Hook Examples
              </Typography>
              
              {/* Counter Example */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Counter Example</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Current count: {count} | Previous: {previousCountRef.current}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={() => setCount(prev => prev + 1)}
                    startIcon={<Add />}
                  >
                    Increment
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setCount(prev => prev - 1)}
                    startIcon={<Remove />}
                  >
                    Decrement
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setCount(0)}
                    startIcon={<Refresh />}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>

              {/* Form Input Example */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Form Input Example</Typography>
                <TextField
                  fullWidth
                  label="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 1 }}
                />
                {name && (
                  <Alert severity="info">
                    Hello, {name}! 👋
                  </Alert>
                )}
              </Box>

              {/* Toggle Example */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Toggle Example</Typography>
                <Button
                  variant="contained"
                  onClick={() => setIsVisible(!isVisible)}
                  startIcon={isVisible ? <VisibilityOff /> : <Visibility />}
                  sx={{ mb: 1 }}
                >
                  {isVisible ? 'Hide' : 'Show'} Content
                </Button>
                {isVisible && (
                  <Alert severity="success">
                    This content is visible! ✨
                  </Alert>
                )}
              </Box>

              {/* Password Input Example */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Password Input Example</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Box>
              </Box>

              {/* Favorites Array Example */}
              <Box>
                <Typography variant="h6">Favorites Array Example</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddFavorite(`Item ${favorites.length + 1}`)}
                    startIcon={<Favorite />}
                  >
                    Add Favorite
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setFavorites([])}
                  >
                    Clear All
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {favorites.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      onDelete={() => setFavorites(prev => prev.filter((_, i) => i !== index))}
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* useEffect Examples */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="secondary">
                2. useEffect Hook Examples
              </Typography>

              {/* Timer Example */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Timer Example</Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsRunning(!isRunning)}
                    startIcon={isRunning ? <Pause /> : <PlayArrow />}
                  >
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setTimer(0)}
                    startIcon={<Refresh />}
                  >
                    Reset
                  </Button>
                </Box>
                <Alert severity="info">
                  Timer uses useEffect to manage intervals and cleanup
                </Alert>
              </Box>

              {/* Window Size Example */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Window Size Tracker</Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <Typography variant="body2">
                    Width: {windowSize.width}px
                  </Typography>
                  <Typography variant="body2">
                    Height: {windowSize.height}px
                  </Typography>
                </Paper>
                <Typography variant="caption" color="text.secondary">
                  Try resizing your browser window to see the effect!
                </Typography>
              </Box>

              {/* useRef Examples */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">useRef Examples</Typography>
                <TextField
                  inputRef={inputRef}
                  label="Focus me with button below"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => inputRef.current?.focus()}
                  sx={{ mb: 2 }}
                >
                  Focus Input
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Ref count: {countRef.current} (doesn't trigger re-render)
                </Typography>
              </Box>

              {/* useMemo Example */}
              <Box>
                <Typography variant="h6">useMemo Example</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Expensive calculation result: {expensiveCalculation.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Check console to see when calculation runs
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Concepts Overview */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                3. React Hooks Concepts Overview
              </Typography>
              {concepts.map((concept, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">{concept.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {concept.description}
                    </Typography>
                    <List dense>
                      {concept.examples.map((example, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={example} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Key Takeaways */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🎯 Key Takeaways
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="useState" 
                    secondary="Use for component state that triggers re-renders when changed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="useEffect" 
                    secondary="Use for side effects like API calls, subscriptions, or DOM manipulation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="useRef" 
                    secondary="Use for DOM access or values that don't need to trigger re-renders"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="useCallback" 
                    secondary="Use to memoize functions and prevent unnecessary re-renders of child components"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="useMemo" 
                    secondary="Use to memoize expensive calculations and improve performance"
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

export default ReactLearningTutorial;
