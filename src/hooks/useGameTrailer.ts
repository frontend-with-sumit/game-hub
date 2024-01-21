import { useQuery } from "@tanstack/react-query";
import GameTrailer from "../entities/GameTrailer";
import APIClient from "../services/api-client";

const useGameTrailer = (gameId: number) => {
	const apiClient = new APIClient<GameTrailer>(`/games/${gameId}/movies`);

	return useQuery({
		queryKey: ["trailers", gameId],
		queryFn: apiClient.getAll,
	});
};

export default useGameTrailer;
