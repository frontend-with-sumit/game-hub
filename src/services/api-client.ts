import axios from "axios";

export interface FetchResponse<T> {
	count: number;
	results: T[];
}

export default axios.create({
	baseURL: "https://api.rawg.io/api/",
	params: {
		key: "89686c4732f2441ab09562d80a5cb483",
	},
});
