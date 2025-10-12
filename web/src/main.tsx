import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";

import App from "./App.tsx";

const GTM_ID = import.meta.env.VITE_GTM_ID;

ReactGA.initialize(GTM_ID);

createRoot(document.getElementById("root")!).render(<App />);
