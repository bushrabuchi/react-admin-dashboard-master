## React Admin Dashboard

Modern React admin dashboard built with React 18, Material UI, React Router, Redux Toolkit, Nivo charts, and FullCalendar.

### Overview
- **Framework**: React 18 with `react-scripts` (CRA)
- **UI**: MUI v5 (`@mui/material`, `@mui/icons-material`)
- **State**: `@reduxjs/toolkit`, `react-redux`
- **Routing**: `react-router-dom@6`
- **Charts**: Nivo (`@nivo/*`) and `react-chartjs-2`
- **Calendar**: FullCalendar React

### Features
- **Dashboard** with stats, charts, and summaries
- **Data grids** for teams, contacts, invoices
- **Interactive charts**: Bar, Line, Pie, Geography
- **Calendar** with events (drag, drop, resize)
- **Forms** with Formik + Yup validation
- **FAQ** and tutorial pages for learning React concepts

### Project Structure
```
src/
  App.js
  components/
    BarChart.jsx
    LineChart.jsx
    PieChart.jsx
    GeographyChart.jsx
    ProgressCircle.jsx
    StatBox.jsx
    Header.jsx
    ReactLearningDashboard.jsx
    ReactLearningTutorial.jsx
    ContextExample.jsx
    CustomHooksExample.jsx
  data/
    mockData.js
    mockGeoFeatures.js
  scenes/
    dashboard/
    bar/
    line/
    pie/
    geography/
    calendar/
    contacts/
    invoices/
    team/
    form/
    faq/
    summary/
    frontPage/
    global/ (Sidebar, Topbar)
  theme.js
  index.js
  index.css
```

### Prerequisites
- Node.js 18+ (works on Node 22 as well)
- npm 8+ (npm 10 is fine)

If you encounter peer dependency conflicts during install, use the provided command below.

### Getting Started
1) Install dependencies
```bash
npm install --legacy-peer-deps
```

2) Start the development server (default: `http://localhost:5000`)
```bash
npm start
```

3) Build for production
```bash
npm run build
```

4) Run tests
```bash
npm test
```

### Available Scripts
- **start**: starts CRA dev server on port 5000
- **build**: builds production assets to `build/`
- **test**: runs tests in watch mode
- **eject**: ejects CRA configuration (irreversible)

### Environment
- The dev server port is set to `5000` via the `start` script.
- You can change the port by editing `package.json` script or by setting `PORT` before running.

Windows examples:
```powershell
set PORT=5173 && npm start
```

Cross-platform alternative (optional):
```bash
npx cross-env PORT=5173 npm start
```

### Data & Assets
- Static images are under `public/assets/`
- Mock data lives in `src/data/`

### Troubleshooting
- **Peer dependency conflicts (Nivo + React 18)**
  - Symptom: npm ERESOLVE errors mentioning `@nivo/core` or React version ranges
  - Fix: install with legacy peer deps
    ```bash
    npm install --legacy-peer-deps
    ```

- **Windows ENOENT spawn cmd.exe when running npm scripts**
  - Symptom: `npm ERR! enoent spawn C:\\WINDOWS\\system32\\cmd.exe ENOENT`
  - Fix options:
    - Run from Command Prompt instead of PowerShell
    - Or run react-scripts directly:
      ```powershell
      $env:PORT=5000; node ./node_modules/react-scripts/bin/react-scripts.js start
      ```
    - Or switch the start script to use `cross-env` (add devDependency `cross-env` and set script: `cross-env PORT=5000 react-scripts start`).

- **Port already in use**
  - Change port: set a different `PORT` as shown above, or free the port.

- **Browser doesn’t open automatically**
  - Open `http://localhost:5000` manually.

### Notes
- ESLint warnings about unused imports/vars are informational during development. Clean up as needed.

### License
This project is provided for learning and demo purposes. Add your preferred license if publishing.


