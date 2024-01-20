import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

function GameGrid() {
	const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();
	const skeletons = [1, 2, 3, 4, 5, 6];

	const fetchGamesCount =
		data?.pages.reduce((total, page) => page.results.length + total, 0) || 0;

	if (error) return <Text>{error.message}</Text>;

	return (
		<InfiniteScroll
			dataLength={fetchGamesCount}
			hasMore={hasNextPage}
			next={() => fetchNextPage()}
			loader={<Spinner />}
		>
			<SimpleGrid
				columns={{
					sm: 1,
					md: 2,
					lg: 3,
					xl: 4,
				}}
				padding="10px"
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
		</InfiniteScroll>
	);
}

export default GameGrid;
