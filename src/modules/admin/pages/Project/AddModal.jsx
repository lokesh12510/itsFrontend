import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Stack, TextField, Typography, Collapse } from "@mui/material";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { StyledBtn, StyledDialog } from "../../../../themes/GlobalStyles";
import { useAddProjectMutation } from "./projectApi";

const AddModal = (props, ref) => {
	const [modalState, setModalState] = useState(false);

	const [selectedItem, setSelectedItem] = useState(null);

	// project Api

	const [addProject, { isSuccess, isError }] = useAddProjectMutation();

	useImperativeHandle(ref, () => ({
		openModal: (item) => {
			setSelectedItem(item);
			setModalState(true);
		},
	}));

	const handleChange = (e) => {
		setSelectedItem((item) => ({ ...item, [e.target.name]: e.target.value }));
	};

	if (!modalState) return null;


	const handleSubmit = async () => {

		const formData = new FormData();

		Object.keys(selectedItem).forEach((key) => {
			formData.append(key, selectedItem[key]);
		  });

		try {
			const res = await addProject(formData).unwrap();

			console.log(res, '>>>>', isSuccess)
			setModalState(false);

		} catch (err) {
			console.log(err, '>>>>', isSuccess)
		}
	};

	return (
		<StyledDialog
			open={modalState}
			onClose={() => setModalState(false)}
			minWidth="md"
			fullWidth
		>
			<DialogTitle>Add Project</DialogTitle>
			<Divider />
			<DialogContent style={{ paddingBlock: 30 }}>
				{
					<Collapse in={isError} component={Typography} color="error" align="center" mb={2}>Error occured! Please try again!</Collapse>
				}
				<Stack spacing={3}>
					<TextField
						name="project_name"
						label="Project Name"
						onChange={(e) => handleChange(e)}
						value={selectedItem.project_name}
					/>
					<TextField
						name="client_name"
						label="Client Name"
						onChange={(e) => handleChange(e)}
						value={selectedItem.client_name}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setModalState(false)} variant="outlined">
					Cancel
				</Button>
				<StyledBtn onClick={handleSubmit} variant="contained" color="info">
					Add
				</StyledBtn>
			</DialogActions>
		</StyledDialog>
	);
};

export default forwardRef(AddModal);
