import React from "react";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";

interface Props {
	gameQuery: GameQuery;
}

function GameGrid({ gameQuery }: Props) {
	const {
		data,
		error,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useGames(gameQuery);
	const skeletons = [1, 2, 3, 4, 5, 6];

	if (error) return <Text>{error.message}</Text>;
	return (
		<Box padding="10px">
			<SimpleGrid
				columns={{
					sm: 1,
					md: 2,
					lg: 3,
					xl: 4,
				}}
				spacing={6}
			>
				{isLoading
					? skeletons.map((_, idx) => (
							<GameCardContainer key={idx}>
								<GameCardSkeleton />
							</GameCardContainer>
					  ))
					: data?.pages.map((page, idx) => (
							<React.Fragment key={idx + 1}>
								{page.results.map((game) => (
									<GameCardContainer key={game?.id}>
										<GameCard game={game} />
									</GameCardContainer>
								))}
							</React.Fragment>
					  ))}
			</SimpleGrid>
			{hasNextPage && (
				<Button my="5" colorScheme="gray" onClick={() => fetchNextPage()}>
					{isFetchingNextPage ? "Loading..." : "Load more"}
				</Button>
			)}
		</Box>
	);
}

export default GameGrid;
