import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	ExpandMore as ExpandMoreIcon,
	ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import CustomPagination from "./CustomPagination";

const DataTable = (props) => {
	const theme = useTheme();

	return (
		<>
			<DataGrid
				components={{
					NoRowsOverlay: CustomNoRowsOverlay,
					ColumnSortedDescendingIcon: ExpandMoreIcon,
					ColumnSortedAscendingIcon: ExpandLessIcon,
					Pagination: CustomPagination,
				}}
				columns={
					props.columns &&
					props.columns.map((column) => ({
						...column,
						//headerAlign: 'left',
						//headerClassName: 'bg-danger',
						//flex: 1,
						//sortable: false,
						//minWidth: 100,
					}))
				}
				pagination
				paginationMode="server"
				rowsPerPageOptions={[10, 20, 30, 40, 50]}
				autoHeight={true}
				rowHeight={50}
				headerHeight={50}
				//density="compact"
				disableSelectionOnClick
				disableColumnMenu
				sx={{
					"&.MuiDataGrid-root": {
						border: "none",
					},
					".MuiDataGrid-columnSeparator": {
						display: "none",
					},
					".MuiDataGrid-columnHeaders": {
						backgroundColor: theme.palette.secondary.main,
						color: theme.palette.primary.contrastText,
					},
				}}
				{...props}
			/>
		</>
	);
};

export default DataTable;
