import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

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
