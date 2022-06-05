import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
	return (
		<Root>
			<Typography color={"primary"} variant="h5" fontWeight={"bold"} mb={2}>
				Something went wrong!
			</Typography>
			<Button
				component={Link}
				to={"/"}
				color="primary"
				variant="outlined"
				size="large"
			>
				Go To Home
			</Button>
		</Root>
	);
};

export default Error;

const Root = styled(Container)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	height: "100vh",
	"& .MuiTypography-root": {
		textTransform: "uppercase",
	},
}));
