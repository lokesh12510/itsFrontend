import {
	Box,
	Breadcrumbs,
	Button,
	Link as LinkText,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import {
	StyledBox,
	StyledBtn,
	StyledContainer,
	StyledDivider,
	StyledInput,
	StyledPageTitle,
	StyledSearchContainer,
} from "../../../../themes/GlobalStyles";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import BadgeList from "./BadgeList";

const Badge = () => {
	return (
		<StyledContainer>
			<Box mb={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<LinkText component={Link} to="/" underline="hover" color="inherit">
						Home
					</LinkText>

					<Typography color="text.primary">Badge Points</Typography>
				</Breadcrumbs>
			</Box>
			<StyledBox>
				{/* Title */}
				<Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
					<StyledPageTitle variant="h6">Points</StyledPageTitle>
					<Button variant="outlined" color="info" startIcon={<AddCircleIcon />}>
						Add
					</Button>
				</Stack>
				<StyledDivider />
				{/* Search Bar */}
				<StyledSearchContainer alignItems={"center"} direction="row" spacing={2} mb={2}>
					<StyledInput
						placeholder="Search Client"
						sx={{ maxWidth: { xs: "100%", md: "500px" } }}
					/>
					<StyledBtn color="info" variant="contained">
						Search
					</StyledBtn>
				</StyledSearchContainer>
				<BadgeList />
			</StyledBox>
		</StyledContainer>
	);
};

export default Badge;
