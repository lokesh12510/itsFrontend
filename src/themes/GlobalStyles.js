import styled from "@emotion/styled";
import {
	Box,
	Button,
	Dialog,
	Divider,
	Stack,
	Autocomplete,
	TableContainer,
	TextField,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import palette from "./palette";

export const StyledContainer = styled(Container)(({ theme }) => ({
	width: "100%",
	paddingBlock: theme.spacing(3),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
	background: palette.common.white,
	padding: theme.spacing(3),
	minHeight: 700,
	borderRadius: 10,
}));

export const StyledBtn = styled(Button)(({ theme }) => ({
	// color: palette.common.white,
	paddingInline: theme.spacing(4),
	paddingBlock: theme.spacing(1.1),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
	marginBlock: theme.spacing(2),
}));

export const StyledPageTitle = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	marginBottom: theme.spacing(1),
	color: palette.text.primary,
}));

export const StyledSearchContainer = styled(Stack)(({ theme }) => ({
	// border: `1px solid ${palette.grey[400]}`,
	borderRadius: 10,
	padding: theme.spacing(1),
	width: "100%",
}));

export const StyledInput = styled(TextField)(({ theme, align = "left" }) => ({
	flex: 1,
	width: "100%",
	borderRadius: 5,
	backgroundColor: palette.common.white,
	borderColor: palette.border,

	"& .MuiOutlinedInput-input": {
		textTransform: "capitalize",
		// height: "100%",
		padding: theme.spacing(1.2),
		// fontSize: 14,
		textAlign: align,
		color: palette.grey[600],
	},
	"& .MuiOutlinedInput-notchedOutline": {
		border: `1px solid #6d6a6a3b`,
	},
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	"& .MuiTableCell-head": {
		backgroundColor: palette.secondary.main,
		color: palette.common.white,
		textTransform: "uppercase",
	},
	"& .MuiTableCell-body": {
		fontSize: 14,
		padding: theme.spacing(1),
	},
	"& .MuiTableRow-root": {
		"&:nth-of-type(even)": {
			backgroundColor: palette.background.neutral,
		},
		// hide last border
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	},
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogTitle-root": {
		fontSize:18,
		color: palette.primary.main,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	"& .MuiDivider-root": {
		marginInline: theme.spacing(3),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(3),
		paddingTop: 0,
		gap: theme.spacing(1.5),
		"& .MuiButton-root": {
			paddingInline: theme.spacing(2.5),
			paddingBlock: theme.spacing(1),
		},
	},
	"& .MuiTableContainer-root": {
		position: "relative",
		overflow: "auto",

		"& .MuiTableCell-root": {
			borderBottom: `1px solid ${palette.border}`,
			padding: theme.spacing(1),
			"& .MuiInputBase-input": {
				padding: theme.spacing(0.6),
			},
		},
	},
}));

export const StyledAutocomplete = styled(Autocomplete)(({theme})=>({
	'& .MuiInputLabel-root':{
		transform:'translate(14px, 10px) scale(1)'
	},
	'& .MuiInputLabel-root.Mui-focused':{
		transform:'translate(14px, -9px) scale(0.75)'
	},
	'& .MuiInputLabel-root.MuiFormLabel-filled':{
		transform:'translate(14px, -9px) scale(0.75)'
	},
	"& .MuiOutlinedInput-root":{
		paddingBlock:2
	}
}))