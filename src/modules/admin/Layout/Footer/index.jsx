import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { StyledContainer } from "../../../../themes/GlobalStyles";
import palette from "../../../../themes/palette";

const Footer = () => {
	return (
		<StyledContainer>
			<Divider />

			<Typography align="center" my={3}>
				IPortal 2.0 | Powered by{" "}
				<Typography component={"span"} color={palette.info.main}>
					Intergy Consulting
				</Typography>{" "}
				&copy; 2022
			</Typography>
		</StyledContainer>
	);
};

export default Footer;
