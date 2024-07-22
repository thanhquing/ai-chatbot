import '../dist/main.css';

import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.body); // createRoot(container!) if you use TypeScript

root.render(<App />);
