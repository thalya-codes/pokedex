import axios from 'axios';

async function getRequest(url: string, offset: number) {
	const params = {limit: 6, offset: offset};
	const data = await	axios.get(url, { params }).then(response => response.data);
	console.log(data);
	
	return data;
}

export default getRequest;