import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Pagination, TableHead } from "@mui/material";
import { StyledTableContainer } from "../../../../themes/GlobalStyles";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminUrls } from "../../urls";
import { useGetClientListMutation } from "./clientApi";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import FormModal from "../Project/FormModal";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
	return { name, calories, fat };
}

const rows = [createData(123123, 305, 3.7), createData(675123, 452, 25.0)].sort(
	(a, b) => (a.calories < b.calories ? -1 : 1)
);

export default function ClientList() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const navigate = useNavigate();

	const [rowData, setRowData] = React.useState([]);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const projectListHeader = [
		{
			title: "Client Name",
			minWidth: 120,
		},
		{
			title: "Account Name",
			minWidth: 120,
			flex: 1,
		},

		{
			title: "Work Request",
			minWidth: 120,
		},
	];

	// `ref` to toggle add or edit modal in `formModal` component
	const formModalRef = useRef();
	const handleFormModalRef = (item) => {
		// `openModal` is defined in `FormModal` component, 
		// it will be triggered using `formModalRef`
		formModalRef.current.openModal(item);
	};

	const deleteModalRef = useRef();

	const handleDeleteModalRef = (item) => {
		deleteModalRef.current.openModal(item);
	};

	const params = useParams();
	const id = params.id || "";

	// project Api
	const [getClientList, { isLoading, isError, isSuccess, data: clientData }] =
		useGetClientListMutation();

	useEffect(() => {
		getClientList({ page: 1, perPage: 10, filterText: "" });
	}, []);

	if (isSuccess) {
		console.log(clientData.list);
	}

	return (
		<>
			<StyledTableContainer component={Paper}>
				<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							{projectListHeader.map((item) => {
								return (
									<TableCell
										key={item.title}
										style={{ minWidth: item.minWidth, flex: item?.flex }}
									>
										{item.title}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={4} align="center">
									Loading
								</TableCell>
							</TableRow>
						)}

						{!isLoading &&
							isSuccess &&
							clientData.list.map((row) => (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell>
										{" "}
										<IconButton onClick={() => handleFormModalRef(row)}>
											<PersonAddAltIcon />
										</IconButton>
									</TableCell>
									<TableCell style={{ width: 160 }}>
										<IconButton onClick={() => handleDeleteModalRef(row)}>
											<RemoveRedEyeIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}

						{!isLoading && isSuccess && clientData.list.length === 0 && (
							<TableRow>
								<TableCell colSpan={4} align="center">
									No Data Found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</StyledTableContainer>

			{/* <FormModal ref={formModalRef} /> */}
		</>
	);
}
