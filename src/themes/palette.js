import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
	0: "#FFFFFF",
	100: "#F9FAFB",
	200: "#F4F6F8",
	300: "#DFE3E8",
	400: "#C4CDD5",
	500: "#919EAB",
	600: "#637381",
	700: "#454F5B",
	800: "#212B36",
	900: "#161C24",
	500_8: alpha("#919EAB", 0.08),
	500_12: alpha("#919EAB", 0.12),
	500_16: alpha("#919EAB", 0.16),
	500_24: alpha("#919EAB", 0.24),
	500_32: alpha("#919EAB", 0.32),
	500_48: alpha("#919EAB", 0.48),
	500_56: alpha("#919EAB", 0.56),
	500_80: alpha("#919EAB", 0.8),
};

const PRIMARY = {
	light: "#829dbe",
	main: "#2a3a4e",
	dark: "#202d3e",
};

const SECONDARY = {
	light: "#829dbe",
	main: "#2a3a4e",
	dark: "#202d3e",
};

const INFO = {
	main: "#f36e32",
};

const SUCCESS = {
	main: "#54D62C",
};

const WARNING = {
	main: "#FFC107",
};

const ERROR = {
	main: "#FF4842",
};

const LIGHT = {
	main: "#fff",
};

const DARK = {
	main: "#000",
};

const palette = {
	common: { black: "#000000", white: "#ffffff" },
	primary: { ...PRIMARY },
	secondary: { ...SECONDARY },
	info: { ...INFO },
	success: { ...SUCCESS },
	warning: { ...WARNING },
	error: { ...ERROR },
	light: { ...LIGHT },
	daek: { ...DARK },
	grey: GREY,
	divider: GREY[500_24],
	text: { primary: GREY[700], secondary: GREY[600], disabled: GREY[500] },
	background: { paper: "#fff", default: GREY[100], neutral: GREY[200] },
	action: {
		active: GREY[600],
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
};

export default palette;
