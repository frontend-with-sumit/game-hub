import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../store";

function SortSelector() {
	const sortOrders = [
		{ value: "", label: "Relevance" },
		{ value: "-added", label: "Date added" },
		{ value: "name", label: "Name" },
		{ value: "-released", label: "Released date" },
		{ value: "-metacritic", label: "Popularity" },
		{ value: "-rating", label: "Average rating" },
	];

	const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
	const setSortOrder = useGameQueryStore((s) => s.setSortOrder);
	const currentSortOrder = sortOrders.find(
		(order) => order.value === sortOrder
	);

	return (
		<Menu isLazy>
			<MenuButton as={Button} rightIcon={<BsChevronDown />}>
				{`Order By: ${currentSortOrder?.label || "Relevance"}`}
			</MenuButton>
			<MenuList>
				{sortOrders.map((order) => (
					<MenuItem
						key={order.value}
						value={order.value}
						onClick={() => setSortOrder(order.value)}
					>
						{order.label}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}

export default SortSelector;
