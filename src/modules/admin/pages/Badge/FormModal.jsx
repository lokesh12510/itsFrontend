import React,{useState,useImperativeHandle,forwardRef} from "react";
import { useDispatch } from "react-redux";

// Mui
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// Custom styles
import { StyledBtn, StyledDialog } from "../../../../themes/GlobalStyles";

// Api
import { useStoreProjectMutation } from "./projectApi";
import { api } from "../../../../app/api";
import { CircularProgress } from "@mui/material";

const FormModal = (props, ref) => {

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
			}
			setModalState(true);
		},
	}));


	// When edit button is clicked, the selected object will be set to `selectedItem`
	// When adding new item, the form data will be set using input field name prop 
	const [selectedItem, setSelectedItem] = useState(null);

	const dispatch = useDispatch()

	// To add or edit `project` Api
	const [storeProject, { data, isSuccess, isError,isLoading }] =
	useStoreProjectMutation();

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
			formData.append(key, selectedItem[key]);
		});
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
						<TextField
							name="client_name"
							label="Client Name"
							onChange={(e) => handleChange(e)}
							value={selectedItem?.client_name}
						/>
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
