import styled from "@emotion/styled";
import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import FormInputField from "../../../../components/FormInputField";
import AppImages from "../../../../constants/images";
import palette from "../../../../themes/palette";

const AdminForgotPassword = () => {
	return (
		<Root>
			<StyledContainer>
				<Grid container>
					<Grid item xs={12} md={8}></Grid>
					<Grid item xs={12} md={4}>
						<StyledForm>
							<FormLogo src={AppImages.Logo} alt="logo" />
							<div>
								<Typography
									variant="h4"
									align="center"
									color={palette.common.white}
									gutterBottom
								>
									Forgot Password
								</Typography>
								<Typography
									variant="subtitle2"
									fontSize={16}
									align="center"
									color={palette.common.white}
									gutterBottom
								>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, obcaecati?
								</Typography>
							</div>

							<FormInputField label="E-mail ID" name="email" placeholder="Enter Email Id" />
							<StyledBtn variant="contained" color="info" size="large" fullWidth>
								Send password reset link
							</StyledBtn>
						</StyledForm>
					</Grid>
				</Grid>
			</StyledContainer>
		</Root>
	);
};

export default AdminForgotPassword;

const Root = styled("main")(({ theme }) => ({
	backgroundColor: `${palette.secondary.dark}`,
	// backgroundColor: palette.secondary.main,
	width: "100%",
	height: "100vh",
	display: "grid",
	placeItems: "center",
	position: "relative",
	overflow: "hidden",
	"&::after": {
		content: '""',
		width: "79%",
		borderRadius: "187px",
		height: "121%",
		padding: 20,
		backgroundColor: palette.secondary.main,
		position: "absolute",
		right: 0,
		top: 0,
		transform: " rotate(21deg) translate(397px, -310px)",
		zIndex: 1,
	},
}));

const StyledContainer = styled(Container)(({ theme }) => ({
	width: "100%",
	zIndex: 3,
}));

const StyledForm = styled("form")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "20px",
}));

const FormLogo = styled("img")(({ theme }) => ({
	width: 300,
	height: "100%",
	objectFit: "contain",
	margin: "auto",
}));

const StyledBtn = styled(Button)(({ theme }) => ({
	color: palette.common.white,
	paddingInline: theme.spacing(4),
	paddingBlock: theme.spacing(1),
}));
