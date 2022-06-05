import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const AdminLayout = ({ children }) => {
	return (
		// if user has auth token
		<main>
			<Header />
			{children}
			<Footer />
		</main>
	);
};

export default AdminLayout;
