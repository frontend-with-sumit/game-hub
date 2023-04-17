import React from "react";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`,
				lg: `"nav nav" "aside main"`,
			}}
		>
			<GridItem area="nav">
				<NavBar />
			</GridItem>
			<Show above="lg">
				<GridItem area="aside" bg="gold">
					Aside
				</GridItem>
			</Show>
			<GridItem area="main" bg="dodgerBlue">
				Main
			</GridItem>
		</Grid>
	);
}

export default App;
