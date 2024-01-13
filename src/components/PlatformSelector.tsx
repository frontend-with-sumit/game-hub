import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import usePlatforms, { Platform } from "../hooks/usePlatforms";
import usePlatform from "../hooks/usePlatform";

interface Props {
	selectedPlatformId?: number;
	onSelectPlatform: (platform: Platform) => void;
}

function PlatformSelector({ selectedPlatformId, onSelectPlatform }: Props) {
	const { data, error } = usePlatforms();
	const selectedPlatform = usePlatform(selectedPlatformId);

	if (error) return null;

	return (
		<Menu isLazy>
			<MenuButton as={Button} rightIcon={<BsChevronDown />}>
				{selectedPlatform?.name || "Platforms"}
			</MenuButton>
			<MenuList>
				{data?.results?.map((platform) => (
					<MenuItem
						key={platform.id}
						onClick={() => onSelectPlatform(platform)}
					>
						{platform.name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}

export default PlatformSelector;
