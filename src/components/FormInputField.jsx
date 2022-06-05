import styled from "@emotion/styled";
import { FormControl, InputLabel, TextField } from "@mui/material";
import React from "react";
import palette from "../themes/palette";

const FormInputField = (props) => {
	return (
		<StyledFormControl variant="standard">
			<InputLabel shrink htmlFor={props.name}>
				{props.label}
			</InputLabel>
			<CustomInput fullWidth id={props.name} {...props} label="" />
		</StyledFormControl>
	);
};

export default FormInputField;

const StyledFormControl = styled(FormControl)(({ theme }) => ({
	width: "100%",
	"& .MuiInputLabel-root": {
		fontSize: 18,
		textTransform: "capitalize",
		color: palette.common.white,
	},
}));
const CustomInput = styled(TextField)(({ theme }) => ({
	"& .MuiOutlinedInput-root": {
		minHeight: 42,
		height: "100%",
		backgroundColor: `${palette.common.white}54`,
		color: palette.common.white,
	},
	"label + &": {
		marginTop: theme.spacing(3.5),
	},
	"& .MuiOutlinedInput-notchedOutline": {
		border: `1px solid ${palette.common.white}`,
		"&:hover": {
			border: `1px solid ${palette.common.white}`,
			borderColor: palette.common.white,
		},
	},
}));
