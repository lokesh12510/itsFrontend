import styled from "@emotion/styled";
import {
	Button,
	Container,
	FormControlLabel,
	Grid,
	InputAdornment,
	Link as LinkText,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInputField from "../../../../components/FormInputField";
import IOSSwitch from "../../../../components/IosSwitch";
import AppImages from "../../../../constants/images";
import palette from "../../../../themes/palette";
import { adminUrls } from "../../urls";

import CheckIcon from "@mui/icons-material/Check";

import { useFormik } from "formik";
import { object, string } from "yup";
import { StyledBtn } from "../../../../themes/GlobalStyles";
import { useAuthAdminLoginMutation } from "./adminApi";
const AdminLogin = () => {
	let navigate = useNavigate();

	// Admin Login Mutation
	const [authAdminLogin, { isLoading, isError, error, isSuccess }] =
		useAuthAdminLoginMutation();

	// Form validation with `formik`
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		onSubmit: (values, { setSubmitting }) => {
			handleAdminLogin(values, setSubmitting);
		},
		validationSchema: object({
			email: string().email("Invalid Email!").required("Enter Email ID"),
			password: string().min(6, "Too Short!").required("Enter Password"),
		}),
	});

	const handleAdminLogin = (credential, setSubmitting) => {
		console.log(credential, setSubmitting, "?????????");
		authAdminLogin({ ...credential, attempts: 1 });
		setSubmitting(false);
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			navigate(adminUrls.project);
			formik.resetForm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<Root>
			<StyledContainer>
				<Grid container>
					<Grid item xs={12} md={8}></Grid>
					<Grid item xs={12} md={4}>
						<StyledForm>
							<FormLogo src={AppImages.Logo} alt="logo" height={"149px"} />
							<div>
								<Typography
									variant="h4"
									align="center"
									color={palette.common.white}
									gutterBottom
								>
									Login
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

							{isError && error?.data?.error && (
								<Typography
									align="center"
									style={{
										color: palette.error.main,
									}}
								>
									Email or Password does't exist!
								</Typography>
							)}

							<FormInputField
								label="E-mail ID"
								name="email"
								placeholder="Enter Email Id"
								onChange={formik.handleChange("email")}
								error={Boolean(formik.errors.email) && Boolean(formik.touched.email)}
								helperText={Boolean(formik.touched.email) && formik.errors.email}
								onBlur={formik.handleBlur("email")}
								value={formik.values.email}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<CheckIcon
												style={{
													color:
														Boolean(formik.errors.email) && Boolean(formik.touched.email)
															? palette.secondary.light
															: palette.success.main,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
							<FormInputField
								label="Password"
								name="password"
								placeholder="Enter Password"
								onChange={formik.handleChange("password")}
								onBlur={formik.handleBlur("password")}
								value={formik.values.password}
								error={Boolean(formik.errors.password) && Boolean(formik.touched.password)}
								helperText={Boolean(formik.touched.password) && formik.errors.password}
							/>
							<Stack
								direction="row"
								alignItems={"center"}
								justifyContent="space-between"
								mb={3}
							>
								<FormControlLabel
									control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
									label={<Typography color={palette.common.white}>Remember Me</Typography>}
								/>
								
								<StyledBtn
									variant="contained"
									color="info"
									size="large"
									onClick={formik.handleSubmit}
									disabled={!formik.isValid}
								>
									Login
								</StyledBtn>
							</Stack>

							<LinkText
								component={Link}
								to={adminUrls.forgotPassword}
								color={palette.secondary.light}
								align="center"
							>
								Forgot Password?
							</LinkText>
						</StyledForm>
					</Grid>
				</Grid>
			</StyledContainer>
		</Root>
	);
};

export default AdminLogin;

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
