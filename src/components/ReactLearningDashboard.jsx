import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Button,
  Grid
} from '@mui/material';
import {
  School,
  Code,
  Psychology,
  Storage,
  Settings,
  CheckCircle,
  PlayArrow,
  Book
} from '@mui/icons-material';
import ReactLearningTutorial from './ReactLearningTutorial';
import CustomHooksExample from './CustomHooksExample';
import ContextExample from './ContextExample';

const ReactLearningDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const learningModules = [
    {
      id: 0,
      title: "React Hooks Fundamentals",
      icon: <Code />,
      description: "Learn useState, useEffect, useRef, useCallback, and useMemo",
      component: <ReactLearningTutorial />,
      concepts: [
        "useState - Managing component state",
        "useEffect - Handling side effects",
        "useRef - DOM references and mutable values",
        "useCallback - Memoizing functions",
        "useMemo - Memoizing expensive calculations"
      ]
    },
    {
      id: 1,
      title: "Custom Hooks",
      icon: <Psychology />,
      description: "Create reusable logic with custom hooks",
      component: <CustomHooksExample />,
      concepts: [
        "useCounter - Reusable counter logic",
        "useLocalStorage - Persistent state",
        "useOnlineStatus - Network status tracking",
        "useDebounce - Delayed value updates",
        "useToggle - Boolean state management"
      ]
    },
    {
      id: 2,
      title: "Context API",
      icon: <Storage />,
      description: "Global state management with React Context",
      component: <ContextExample />,
      concepts: [
        "Theme Context - App-wide theme switching",
        "Cart Context - Shopping cart state management",
        "useReducer - Complex state logic",
        "Provider Pattern - Wrapping components",
        "Context vs Props - When to use each"
      ]
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: "Start with useState",
      description: "Learn how to manage component state",
      completed: true
    },
    {
      step: 2,
      title: "Master useEffect",
      description: "Handle side effects and lifecycle",
      completed: true
    },
    {
      step: 3,
      title: "Explore useRef",
      description: "Access DOM elements and store mutable values",
      completed: true
    },
    {
      step: 4,
      title: "Create Custom Hooks",
      description: "Extract reusable logic",
      completed: false
    },
    {
      step: 5,
      title: "Learn Context API",
      description: "Manage global state",
      completed: false
    },
    {
      step: 6,
      title: "Advanced Patterns",
      description: "Combine all concepts for complex applications",
      completed: false
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          🎓 React Learning Journey
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Master React concepts through interactive examples
        </Typography>
        <Alert severity="info" sx={{ maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="body1">
            This interactive tutorial covers essential React concepts. Each module includes 
            working examples that you can interact with to understand the concepts better.
          </Typography>
        </Alert>
      </Box>

      <Grid container spacing={3}>
        {/* Learning Path Sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Book />
                Learning Path
              </Typography>
              <List dense>
                {learningPath.map((item) => (
                  <ListItem key={item.step} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.completed ? (
                        <CheckCircle color="success" />
                      ) : (
                        <PlayArrow color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.step}. ${item.title}`}
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: item.completed ? 'bold' : 'normal'
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.8rem'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Quick Tips
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Interactive Examples"
                    secondary="Try clicking buttons and changing values to see how hooks work"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Console Logs"
                    secondary="Check browser console for additional debugging information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Code Comments"
                    secondary="Read the code comments to understand the implementation"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ width: '100%' }}>
            {/* Module Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {learningModules.map((module) => (
                  <Tab
                    key={module.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {module.icon}
                        {module.title}
                      </Box>
                    }
                    sx={{ minHeight: 64 }}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Module Content */}
            <Box sx={{ p: 3 }}>
              {learningModules[activeTab] && (
                <Box>
                  {/* Module Header */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" gutterBottom>
                      {learningModules[activeTab].title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {learningModules[activeTab].description}
                    </Typography>
                    
                    {/* Concepts Covered */}
                    <Typography variant="h6" gutterBottom>
                      Concepts Covered:
                    </Typography>
                    <List dense>
                      {learningModules[activeTab].concepts.map((concept, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={concept} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Interactive Component */}
                  {learningModules[activeTab].component}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          🚀 Ready to build amazing React applications! 
          Practice these concepts in your own projects to master them.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReactLearningDashboard;
