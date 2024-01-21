import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/api-client";
import useGameQueryStore from "../store";

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
	const gameQuery = useGameQueryStore((s) => s.gameQuery);

	return useInfiniteQuery<FetchResponse<Game>, Error>({
		queryKey: ["games", gameQuery],
		queryFn: ({ pageParam }) =>
			apiClient.getAll({
				params: {
					page: pageParam,
					genres: gameQuery.genreId,
					parent_platforms: gameQuery.platformId,
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
		staleTime: ms("24h"),
	});
};

export default useGames;
