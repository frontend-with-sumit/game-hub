import genres from "../data/genres.json";

export interface Platform {
	id: number;
	name: string;
	slug: string;
}

export interface Genre {
	id: number;
	name: string;
	image_background: string;
}

const useGenres = () => ({ data: genres, error: null, isLoading: false });

export default useGenres;
