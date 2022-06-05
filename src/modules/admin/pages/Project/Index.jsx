import React, { useState, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
// Mui
import { Button, Stack, Autocomplete, TextField } from "@mui/material";
// Custom Styles
import {
	StyledBox,
	StyledBtn,
	StyledContainer,
	StyledDivider,
	StyledInput,
	StyledAutocomplete,
	StyledPageTitle,
	StyledSearchContainer,
} from "../../../../themes/GlobalStyles";
// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Custom Components
import ProjectList from "./ProjectList";
import FormModal from "./FormModal";
// api
import { useSearchClientQuery } from "./projectApi";
import { api } from "../../../../app/api";
import { setFilter } from "./projectSlice";


const Project = () => {

	const dispatch = useDispatch()
	const {filterText,page,perPage} = useSelector(state=>state.project.filter)

	// Autocomplete state for client search
	const [search, setSearch] = useState('')
	// Select item from client list 
	const [value, setValue] = React.useState(null);

	// `ref` to toggle add or edit modal in `formModal` component
	const formModalRef = useRef();
	const handleFormModalRef = (item) => {
		// `openModal` is defined in `FormModal` component, 
		// it will be triggered using `formModalRef`
		formModalRef.current.openModal(item);
	};

	// project Api
	const handleSearch = ()=>{
		dispatch(setFilter({filterText:search}))
		// dispatch(api.util.invalidateTags(['Project']))
	}
	// project Api
	const handleClear = ()=>{
		setValue(null);
		setSearch('')
		dispatch(setFilter({filterText:''}))
		// dispatch(api.util.invalidateTags(['Project']))
	}

	const { data: clients, isLoading, isError } = useSearchClientQuery({ search:filterText })

	if (clients) console.log(clients)

	return (
		<>
			<StyledContainer>
				<StyledBox>
					{/* Title */}
					<Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
						<StyledPageTitle variant="h6">Project</StyledPageTitle>
						<Button
							variant="outlined"
							color="info"
							startIcon={<AddCircleIcon />}
							onClick={handleFormModalRef}
						>
							Add
						</Button>
					</Stack>
					<StyledDivider />
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

					{/* Project List Table */}
					<ProjectList search={search} />
				</StyledBox>
			</StyledContainer>
			{/* Form Modal*/}
			<FormModal ref={formModalRef} />
		</>
	);
};

export default Project;


const data = [
	{
		id: 1,
		label: 'abc1'
	},
	{
		id: 11,
		label: 'abc2'
	},
	{
		id: 12,
		label: 'abc3'
	},
	{
		id: 13,
		label: 'abc4'
	},
]