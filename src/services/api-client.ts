import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
	count: number;
	results: T[];
	next?: string | null;
}

const axiosInstance = axios.create({
	baseURL: "https://api.rawg.io/api/",
	params: {
		key: "89686c4732f2441ab09562d80a5cb483",
	},
});

export default class APIClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = (config: AxiosRequestConfig) => {
		return axiosInstance
			.get<FetchResponse<T>>(this.endpoint, config)
			.then((res) => res.data);
	};
}
