import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";

function main() {
    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement as HTMLElement);
    root.render(<App />);
}

main();