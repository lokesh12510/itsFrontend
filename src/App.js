import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ThemeWrapper from "./themes";

function App() {
	return (
		<>
			{/* Router Dom wrapper */}
			<BrowserRouter>
				{/* Mui Theme wrapper */}
				<ThemeWrapper>
					{/* App Navigation routes */}
					<AppRoutes />
				</ThemeWrapper>
			</BrowserRouter>
		</>
	);
}

export default App;
