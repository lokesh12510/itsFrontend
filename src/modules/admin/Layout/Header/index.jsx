import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AppImages from "../../../../constants/images";
import styled from "@emotion/styled";
import { Divider, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import palette from "../../../../themes/palette";
import { logOut, selectCurrentUser } from "../../pages/Auth/authSlice";
import { adminUrls } from "../../urls";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const pages = [
	{ title: "Project", path: adminUrls.project },
	{ title: "Client", path: adminUrls.client },
	{ title: "Work Request", path: adminUrls.workRequest },
	{ title: "Point Statement", path: adminUrls.pointsStatement },
];

const Header = () => {
	const location = useLocation();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// logged user
	const user = useSelector(selectCurrentUser);

	// handle logout
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logOut());
	};

	return (
		<AppBar position="static">
			<Container>
				<Toolbar disableGutters>
					<StyledLogo
						component={"img"}
						src={AppImages.Logo}
						alt="logo"
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.title}
									onClick={handleCloseNavMenu}
									component={Link}
									to={page.path}
								>
									<Typography textAlign="center">{page.title}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box
						sx={{
							display: { xs: "flex", md: "none" },
							flexGrow: 2,
							justifyContent: "center",
							mr: 1,
						}}
					>
						<StyledLogo component={"img"} src={AppImages.Logo} alt="logo" />
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex", justifyContent: "center", gap: 10 },
						}}
					>
						{pages.map((page) => (
							<Button
								variant={location.pathname === page.path ? "contained" : "text"}
								color="info"
								component={Link}
								to={page.path}
								key={page.title}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page.title}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Stack direction={"row"} alignItems="center" spacing={1}>
							<IconButton sx={{ p: 0 }}>
								<Avatar alt={user?.name} src={user?.image} />
							</IconButton>
							<Stack direction={"column"} sx={{ paddingRight: 2 }}>
								<Typography variant="caption">You are Logged In</Typography>
								<Typography variant="overline">{user?.name}</Typography>
							</Stack>
							<Divider orientation="vertical" flexItem style={{ marginInline: 5 }} />
							<Tooltip title="Logout">
								<IconButton onClick={handleLogout}>
									<LogoutIcon sx={{ color: palette.common.white }} />
								</IconButton>
							</Tooltip>
						</Stack>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;

const StyledLogo = styled(Box)(({ theme }) => ({
	width: 150,
	height: "100%",
	objectFit: "contain",
}));
