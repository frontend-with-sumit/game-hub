import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient, { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";

export interface Game {
	id: number;
	name: string;
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number;
	rating_top: number;
}

const apiClient = new APIClient<Game>("/games");

const useGames = (gameQuery: GameQuery) =>
	useInfiniteQuery<FetchResponse<Game>, Error>({
		queryKey: ["games", gameQuery],
		queryFn: ({ pageParam }) =>
			apiClient.getAll({
				params: {
					page: pageParam,
					genres: gameQuery.genre?.id,
					parent_platforms: gameQuery.platform?.id,
					ordering: gameQuery.sortOrder,
					search: gameQuery.searchText,
				},
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage?.next
				? allPages.reduce((acc, val) => val.results.length + acc, 0)
				: undefined;
		},
		staleTime: 24 * 60 * 60 * 1000,
	});

export default useGames;
