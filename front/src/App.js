import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageClient from "./pages/PageClient";
import PageAjout from "./pages/PageAjout";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/clients/:id" element={<PageClient />} />
				<Route path="/clients/ajout" element={<PageAjout />} />

				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
