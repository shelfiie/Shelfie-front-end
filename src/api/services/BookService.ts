import { BookData } from "../../types/bookData";
import { ShelfieHttpClient } from "../client/ShelfieHttpClient";

export class BookService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async fetchBookByStatus({ status }: BookData) {
        const base = `/api/mybooks/${status}`;

        const response = await this.client.get({ url: base });
        return response;
    }

    async getBookStatus({ googleId }: BookData) {
        const base = `/api/mybooks/is-enabled/${googleId}`;

        const response = await this.client.get({ url: base });
        return response;
    }

    async postBookStatus({ googleId, status }: BookData) {
        const newStatus = (status ?? '').toUpperCase().replace(' ', '_');

        const base = `/api/mybooks/${googleId}/${newStatus}`;

        const response = await this.client.post({ url: base });
        return response;

    }

    async putBookStatus({ id, status }: BookData) {
        const newStatus = (status ?? '').toUpperCase().replace(' ', '_');

        const base = `/api/mybooks/${id}/${newStatus}`;

        const response = await this.client.put({ url: base });
        return response;
    }
}