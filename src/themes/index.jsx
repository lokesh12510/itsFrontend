import React, { useMemo } from "react";
import {
	ThemeProvider,
	createTheme,
	StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import palette from "./palette";
import typography from "./typography";

const ThemeWrapper = ({ children }) => {
	const themeOptions = useMemo(
		() => ({
			palette,
			typography,
		}),
		[]
	);

	const theme = createTheme(themeOptions);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default ThemeWrapper;
