import axios from 'axios';

async function getRequest(url: string, limit: number, offset: number) {
	const params = {limit, offset};
	const data = await	axios.get(url, { params }).then(response => response.data);
	
	return data;
}

export default getRequest;