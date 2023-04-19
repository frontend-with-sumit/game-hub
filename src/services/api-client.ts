import axios from "axios";

export default axios.create({
	baseURL: "https://api.rawg.io/api/",
	params: {
		key: "89686c4732f2441ab09562d80a5cb483",
	},
});
