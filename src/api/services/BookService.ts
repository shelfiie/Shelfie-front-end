import { BookData } from "../../types/bookData";
import { HttpResponse, StatusCode } from "../client/IHttpClient";
import { ShelfieHttpClient } from "../client/ShelfieHttpClient";

export class BookService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async isBookEnabled({ googleId }: BookData): Promise<HttpResponse<any>> {
        console.log(googleId);
        const base = `/api/mybooks/is-enabled/${googleId}`;

        const response = await this.client.get({ url: base });
        return response;
    }

    async postBookStatus({ googleId, bookStatus }: BookData): Promise<HttpResponse<any>> {
        const newStatus = (bookStatus ?? '').toUpperCase().replace(' ', '_');

        const base = `/api/mybooks/${googleId}/${newStatus}`;

        const response = await this.client.post({ url: base });
        return response;
    }

    async putBookStatus({ googleId, bookStatus }: BookData): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/${googleId}/update/${bookStatus}`;

        const response = await this.client.put({ url: base });
        return response;
    }

    async updateBookStatus({ googleId, bookStatus }: BookData): Promise<HttpResponse<any>> {
        const formattedBookStatus = (bookStatus ?? '').toUpperCase().replace(' ', '_');
        const base = `/api/mybooks/${googleId}/update/${formattedBookStatus}`;

        if (bookStatus && bookStatus.includes('SELECIONAR')) {
            return {
                statusCode: StatusCode.BadRequest,
            };
        };

        const isEnabledResponse = await this.isBookEnabled({ googleId })
        // se retornar 200, o livro esta associado ao usuário, mesmo que desabilitado
        if (isEnabledResponse.statusCode === StatusCode.Ok) {
            const response = await this.client.put({ url: base });
            if (response.statusCode === StatusCode.Ok) {
                return {
                    ...response,
                    resolve: 'Status atualizado com sucesso',
                }
            } else {
                return {
                    ...response,
                    reject: 'Erro ao atualizar status',
                }
            }
        } // se não, o livro não esta associado ao usuário e pode ser feito post
        else {
            const response = await this.postBookStatus({ googleId, bookStatus });
            console.log('response post: ', response);
            if (response.statusCode === StatusCode.Created) {
                return {
                    ...response,
                    resolve: `Livro adicionado à sua estante como ${bookStatus}`,
                }
            } else {
                return {
                    ...response,
                    reject: 'Erro ao adicionar o livro na estante',
                }
            }
        }
    }

    async postProgression(data: BookData): Promise<HttpResponse<any>> {
        const base = `/api/reading`;

        const response = await this.client.post({
            url: base,
            body: data
        });

        if (response.statusCode === StatusCode.Created) {
            return {
                ...response,
                resolve: 'Progressão salva com sucesso!',
            };
        } else return {
            ...response,
            reject: 'Erro ao salvar progressão'
        }
    }

    async postReview({ bookId, reviews }: BookData): Promise<HttpResponse<any>> {
        const base = `/api/review/${bookId}`;

        const response = await this.client.post({ url: base, body: reviews });

        if (response.statusCode === StatusCode.Created) {
            return {
                ...response,
                resolve: 'Review salvo com sucesso!',
            };
        } else return {
            ...response,
            reject: 'Erro ao salvar review.',
        }
    }

    async fetchBooksByUser(): Promise<HttpResponse<any>> {
        const base = '/api/mybooks';

        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Sucesso ao buscar livros',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros',
            };
        }
    }

    async fetchMyBooksByGoogleId(googleId: BookData['googleId']): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/google/${googleId}`;

        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) return response;
        else {
            return {
                ...response,
                reject: 'Erro ao buscar livro',
            }
        }
    }

    async fetchLastPage(bookId: BookData['bookId']): Promise<HttpResponse<any>> {
        const base = `/api/pages/${bookId}`

        const response = await this.client.get({ url: base })

        if(response.statusCode === StatusCode.Ok) return response;
        else {
            return {
                ...response,
                reject: 'Erro ao pegar última página.'
            }
        }
    }

    async fetchBookById(id: string): Promise<HttpResponse<any>> {
        const base = `/api/books/${id}`;

        const response = await this.client.get({ url: base });
        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                body: response.body,
                resolve: 'Sucesso ao buscar livro',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livro'
            }
        }
    }

    async fetchBooksByGoogleId(googleId: string): Promise<HttpResponse<any>> {
        const base = `/api/books/google/${googleId}`;

        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return response;

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livro'
            };
        }
    }

    async fetchCombinedBooksByUser(): Promise<HttpResponse<any>> {
        const response = await this.fetchBooksByUser();

        if (response.statusCode !== StatusCode.Ok) {
            return {
                ...response,
                reject: 'Erro ao buscar livros do usuário',
            };
        }

        const userBooks = response.body;

        const combinedBooks = await Promise.all(userBooks.map(async (userBook: any) => {
            const bookDetailsResponse = await this.fetchBookById(userBook.bookId);
            if (bookDetailsResponse.statusCode === StatusCode.Ok) {
                return { ...userBook, ...bookDetailsResponse.body };
            } else {
                return userBook;
            }
        }));

        return {
            ...response,
            body: combinedBooks,
            resolve: 'Sucesso ao buscar livros combinados do usuário',
        };
    }


    async fetchBooksByStatus(status: string): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/status/${status}`;

        const response = await this.client.get({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                body: response.body,
                resolve: 'Sucesso ao buscar livros',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros',
            };
        }
    }

    // PROGRESSIONS
    async fetchProgressions(): Promise<HttpResponse<any>> {
        const base = '/api/reading';

        const response = await this.client.get({ url: base });
        if (response.statusCode === StatusCode.Ok) return response;
        else {
            return {
                ...response,
                reject: 'Erro ao buscar progressões',
            };
        }
    }

    async disableBook(myBooksId: string): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/${myBooksId}/disable`;

        const response = await this.client.put({ url: base });

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                resolve: 'Livro desativado com sucesso',
            }
        } else {
            return {
                ...response,
                reject: 'Erro ao desativar livro',
            }
        }
    }
}