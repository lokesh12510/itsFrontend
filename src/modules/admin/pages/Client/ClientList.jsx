import * as React from "react";
import Paper from "@mui/material/Paper";
import { StyledTableContainer } from "../../../../themes/GlobalStyles";
import { GridActionsCellItem } from "@mui/x-data-grid";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
import {  useGetClientListQuery } from "./clientApi";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import { useState } from "react";
import { adminUrls } from "../../urls";
import { useSelector } from "react-redux";

// icons
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ManageModal from "./ManageModal";

export default function ClientList({filterText}) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const mangeModalRef = useRef()
	const handleMangeModalRef = (item) => {
		mangeModalRef.current.openModal(item);
	};

	const initialTableValues = {
		loading: false,
		rows: [],
		rowCount: 10,
		page: 0,
		pageSize: 10,
		search: {},
		filterText: "",
	};

	const [tableValues, setTableValues] = useState(initialTableValues);

	const navigate = useNavigate();

	const columns = [
		{
			field: "name",
			headerName: "Client Name",
			width: 150,
			flex: 1,
		},
		{
			field: "Account Name",
			headerName: "Account Name",
			width: 200,
			headerAlign:'center',
			align:'center',
			renderCell: (params) => [
				<GridActionsCellItem
					icon={<PersonAddAltIcon />}
					label="account"
					onClick={() => handleMangeModalRef(params.row)}
				/>,
			],
		},
		{
			field: "Work Request",
			headerName: "Work Request",
			width: 200,
			headerAlign:'center',
			align:'center',
			renderCell: (params) => [
				<GridActionsCellItem
					icon={<RemoveRedEyeIcon />}
					label="points"
					onClick={() => navigate(`${adminUrls.workRequest}/${params.id}`)}
				/>,
			],
		},
	];


	// project Api
	const { isLoading, isError, isSuccess, data: clientData ,isFetching } =
	useGetClientListQuery({client_name:filterText,page:page+1,perPage: tableValues.pageSize });

	clientData && console.log(clientData?.list)

	return (
		<>
			<StyledTableContainer component={Paper}>
				{
					isLoading && <p> Loading...</p>
				}
				{
					clientData && <DataTable
					getRowId={(row) => row.id}
					loading={isLoading|| isFetching }
					columns={columns}
					rows={clientData?.list}
					rowCount={clientData?.total}
					page={page}
					pageSize={tableValues.pageSize}
					onPageChange={(p) => {
						setPage(()=>p);
					}}
					onPageSizeChange={(pageSize) => {
						setTableValues((prev) => ({ ...prev, pageSize: pageSize }));
					}}
				/>
				}
					
			
			</StyledTableContainer>

			<ManageModal ref={mangeModalRef} />
		</>
	);
}
