import React from "react";
import {
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";
import { Pagination, PaginationItem } from "@mui/material";

const CustomPagination = () => {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			count={pageCount}
			page={page + 1}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
			color="info"
			showFirstButton
			showLastButton
			renderItem={(item) => <PaginationItem {...item} />}
		/>
	);
};

export default CustomPagination;

const PreviousButton = () => {
	return <>Previous</>;
};

const NextButton = () => {
	return <>Next</>;
};
