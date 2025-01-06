import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/_main.scss";
import App from "./App.tsx";
import store from "../store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>
);
