import * as React from "react";
import Paper from "@mui/material/Paper";
import { StyledTableContainer } from "../../../../themes/GlobalStyles";
import { GridActionsCellItem } from "@mui/x-data-grid";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
import DeleteModal from "./DeleteModal";
import {  useProjectListQuery } from "./projectApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import { useState } from "react";
import { adminUrls } from "../../urls";
import FormModal from "./FormModal";
import { useSelector } from "react-redux";

export default function ProjectList({search}) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const {filterText} =useSelector(state=>state.project.filter)

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

	const projectListHeader = [
		{
			field: "project_code",
			headerName: "Code",
			width: 150,
			flex: 1,
		},
		{
			field: "project_name",
			headerName: "Project",
			width: 150,
			flex: 2,
		},
		{
			field: "client_name",
			headerName: "Client",
			valueGetter: (params) => params?.row?.client?.name,
			width: 110,
			flex: 2,
		},
		{
			field: "Action",
			headerName: "Action",
			width: 110,
			flex: 1,
			renderCell: (params) => [
				<GridActionsCellItem
					icon={<EmojiEventsIcon />}
					label="badge"
					onClick={() => navigate(`${adminUrls.badge}/${params.id}`)}
				/>,
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Edit"
					onClick={() => handleFormModalRef(params.row)}
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={() => handleDeleteModalRef(params.row)}
				/>,
			],
		},
	];

	const deleteModalRef = useRef();

	const handleDeleteModalRef = (item) => {
		deleteModalRef.current.openModal(item);
	};
	const formModalRef = useRef();

	const handleFormModalRef = (item) => {
		formModalRef.current.openModal(item);
	};

	// project Api
	const { isLoading, isError, isSuccess, data: projectData ,isFetching } =
	useProjectListQuery({client_name:filterText,page:page+1,perPage: tableValues.pageSize });

	projectData && console.log(projectData?.list)

	return (
		<>
			<StyledTableContainer component={Paper}>
				{
					isLoading && <p> Loading...</p>
				}
				{
					projectData && <DataTable
					getRowId={(row) => row.id}
					loading={isLoading|| isFetching }
					columns={projectListHeader}
					rows={projectData?.list}
					rowCount={projectData?.total}
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

			<DeleteModal ref={deleteModalRef} />
			<FormModal ref={formModalRef} />
		</>
	);
}
