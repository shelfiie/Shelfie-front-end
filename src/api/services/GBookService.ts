import { GoogleHttpClient } from "../GoogleHttpClient";

async function fetchBookByTitle(title: string){
    const googleClient = new GoogleHttpClient();
    const response = await googleClient.get({
        url: '/books/v1/volumes/',
        search: { q: `intitle:${title}` }
    })
    if(response.statusCode.OK) {
        
    }
}