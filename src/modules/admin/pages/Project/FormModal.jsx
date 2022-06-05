import React,{useState,useImperativeHandle,forwardRef} from "react";
import { useDispatch, useSelector } from "react-redux";

// Mui
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Custom styles
import { StyledBtn, StyledDialog, StyledInput } from "../../../../themes/GlobalStyles";

// Api
import { useSearchClientQuery, useStoreProjectMutation } from "./projectApi";
import { api } from "../../../../app/api";
import { CircularProgress } from "@mui/material";

const FormModal = (props, ref) => {
	
	// Autocomplete state for client search
	const [search, setSearch] = useState('')
	// Select item from client list 
	const [value, setValue] = useState(null);

	const {filterText,page,perPage} = useSelector(state=>state.project.filter)

	// id will be null when adding new entry 
	// and it will get id when edit button is clicked through ref
	const [id, setId] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

	// Form modal toggle state
	const [modalState, setModalState] = useState(false);

	// This hook is use to trigger this modal from parent comp with `ref` prop
	useImperativeHandle(ref, () => ({
		// We need to use `openModal` func name in parent
		openModal: (item) => {
			// checking `id` is included or not in `item` prop
			if(item.id){ 
				setId(item.id);
				setIsEditing(true);
				setSearch(item?.client_name)
				setValue(item?.client)
			}
			setModalState(true);
		},
	}));


	// When edit button is clicked, the selected object will be set to `selectedItem`
	// When adding new item, the form data will be set using input field name prop 
	const initialState = {
		project_name:'',
		client_name:''
	}
	const [selectedItem, setSelectedItem] = useState(initialState);

	const dispatch = useDispatch()

	// To add or edit `project` Api
	const [storeProject, { data, isSuccess, isError,isLoading }] =
	useStoreProjectMutation();


	const { data: clients, isLoading:isClientLoading, isError:isClientError } = useSearchClientQuery({ search:filterText })

	console.log(search, value)

	// service call to get item from selected `id` and set to `selectedItem` state
	React.useEffect(()=>  {
		if(isEditing){
			async function showProject(){
				try{
					const res = await dispatch(
						api.endpoints.showProjectById.initiate(id)
					  )
					  setSelectedItem(res?.data)
				}catch(err){
					console.log(err)
				}
			}
			// `useEffect` will only return clear function,So we need to use this format of calling function
			showProject()
		}
	},[id])

	
	// Form change events handler function
	const handleChange = (e) => {
		setSelectedItem((item) => ({ ...item, [e.target.name]: e.target.value }));
	};

	// Form submit handler with `FormData` object for `storeProject` api
	const handleSubmit =async() => {
		const formData = new FormData();

		Object.keys(selectedItem).forEach((key) => {
			if(key!=='client_name'){
				console.log(key)
				formData.append(key, selectedItem[key]);
			}
		});
		formData.append('client_name',value.id)
		// if `id` is included, we need to append `updateAt` with current `dateTime`
		if(isEditing){
			formData.append("updatedAt", new Date());
		}

		try{
			await storeProject(formData);
			setModalState(false);
		}catch(err){
			console.log(err)
		}


	};

	// Checking modalState
	if (!modalState) return null;

		

	

	return (
		<StyledDialog
			open={modalState}
			onClose={() => setModalState(false)}
			minWidth="md"
			fullWidth
		>
			{isEditing && <DialogTitle>Edit Project</DialogTitle>}
			{!isEditing && <DialogTitle>Add Project</DialogTitle>}
			
			<Divider />

			<DialogContent style={{ paddingBlock: 30 }}>
					<Stack spacing={3}>
						<TextField
							name="project_name"
							label="Project Name"
							onChange={(e) => handleChange(e)}
							value={selectedItem?.project_name}
						/>
						{
							clients && <Autocomplete
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
							options={clients}
							renderInput={(params) => <TextField {...params} label="Client Name" />}
						/>
						}
						
					</Stack>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setModalState(false)} variant="outlined">
					Cancel
				</Button>
				<StyledBtn onClick={handleSubmit} variant="contained" color="info" startIcon={isLoading && <CircularProgress size={24} />}>
					Submit
				</StyledBtn>
			</DialogActions>
		</StyledDialog>
	);
};

// Wrapping with `forwardRef` is important, when receiving `ref` as a prop
export default forwardRef(FormModal);
