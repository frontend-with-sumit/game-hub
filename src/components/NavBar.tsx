import { HStack, Image } from "@chakra-ui/react";

import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

import logo from "../assets/logo.webp";

interface Props {
	onSearch: (serach: string) => void;
}

function NavBar({ onSearch }: Props) {
	return (
		<HStack justifyContent="space-between" padding="10px">
			<Image src={logo} boxSize="60px" />
			<SearchInput onSearch={(searchText) => onSearch(searchText)} />
			<ColorModeSwitch />
		</HStack>
	);
}

export default NavBar;
