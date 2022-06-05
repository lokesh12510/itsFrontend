import {
	Box,
	Breadcrumbs,
	Button,
	Link as LinkText,
	Stack,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
	StyledAutocomplete,
	StyledBox,
	StyledBtn,
	StyledContainer,
	StyledDivider,
	StyledInput,
	StyledPageTitle,
	StyledSearchContainer,
} from "../../../../themes/GlobalStyles";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProjectList from "../Project/ProjectList";
import { Link } from "react-router-dom";
import ClientList from "./ClientList";
import { useSearchClientQuery } from "../Project/projectApi";
import { useDispatch } from "react-redux";

const Client = () => {

	const [filterText, setFilterText] = useState('')


	const dispatch = useDispatch()
		// Autocomplete state for client search
		const [search, setSearch] = useState('')
		// Select item from client list 
		const [value, setValue] = useState(null);
			// project Api
	const handleSearch = ()=>{
		setFilterText(search)
	}
	// project Api
	const handleClear = ()=>{
		setValue(null);
		setSearch('')
		setFilterText('')
	}

	const { data: clients, isLoading, isError } = useSearchClientQuery({search})
	return (
		<StyledContainer>
			<StyledBox>
				{/* Title */}
				<Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
					<StyledPageTitle variant="h6">Client List</StyledPageTitle>
				</Stack>
				<StyledDivider />
				{/* Search Bar */}
				<StyledSearchContainer alignItems={"center"} direction="row" spacing={2} mb={2}>
					{/* Search Bar */}
					{
						clients && <StyledSearchContainer alignItems={"center"} direction="row" spacing={2} mb={2}>
							<StyledAutocomplete
								value={value}
								onChange={(event, newValue) => {
									setValue(newValue);
								}}
								disableClearable
								getOptionLabel={(option) => option.name}
								inputValue={search}
								onInputChange={(event, newInputValue) => {
									console.log(newInputValue)
									setSearch(newInputValue)
								}}
								id="clients"
								fullWidth
								options={clients}
								sx={{ maxWidth: { xs: "100%", md: "500px" } }}
								renderInput={(params) => <StyledInput {...params} label="Search Client" />}
							/>
							<StyledBtn color="info" variant="contained" onClick={handleSearch}>
								Search
							</StyledBtn>
							<StyledBtn color="secondary" variant="outlined" onClick={handleClear}>
								Clear
							</StyledBtn>
						</StyledSearchContainer>
					}
				</StyledSearchContainer>
				<ClientList filterText={filterText} />
			</StyledBox>
		</StyledContainer>
	);
};

export default Client;
