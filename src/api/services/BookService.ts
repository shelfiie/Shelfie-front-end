import {BookData, BookStatus, ReportStatus} from "../../types/bookData";
import {HttpResponse, StatusCode} from "../client/IHttpClient";
import {ShelfieHttpClient} from "../client/ShelfieHttpClient";

export class BookService {
    private client: ShelfieHttpClient;

    constructor() {
        this.client = new ShelfieHttpClient();
    }

    async isBookEnabled({googleId}: BookData): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/is-enabled/${googleId}`;

        const response = await this.client.get({url: base});
        return response;
    }

    async postBookStatus({googleId, bookStatus}: BookData): Promise<HttpResponse<any>> {
        const newStatus = (bookStatus ?? '').toUpperCase().replace(' ', '_');

        const base = `/api/mybooks/${googleId}/${newStatus}`;

        const response = await this.client.post({url: base});
        return response;
    }

    async putBookStatus({googleId, bookStatus}: BookData): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/${googleId}/update/${bookStatus}`;
        const response = await this.client.put({url: base});
        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Status atualizado com sucesso',
            }
        }
        return response;
    }

    async updateBookStatus({googleId, bookStatus}: BookData): Promise<HttpResponse<any>> {
        const formattedBookStatus = (bookStatus ?? '').toUpperCase().replace(' ', '_');
        const base = `/api/mybooks/${googleId}/update/${formattedBookStatus}`;

        if (bookStatus && bookStatus.includes('SELECIONAR')) {
            return {
                statusCode: StatusCode.BadRequest,
            };
        }
        ;

        const isEnabledResponse = await this.isBookEnabled({googleId})
        // se retornar 200, o livro esta associado ao usuário, mesmo que desabilitado
        if (isEnabledResponse.statusCode === StatusCode.Ok) {
            const response = await this.client.put({url: base});
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
            const response = await this.postBookStatus({googleId, bookStatus});
            if (response.statusCode === StatusCode.Created) {
                return {
                    ...response,
                    resolve: `Livro adicionado à sua estante como ${bookStatus}!`,
                }
            } else {
                return {
                    ...response,
                    reject: 'Erro ao adicionar o livro na estante.',
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

        if (response.statusCode === StatusCode.Forbidden) {
            this.putBookStatus({googleId: data.googleId, bookStatus: BookStatus.LENDO})
            setTimeout(async () => {
                const progression = await this.client.post({
                    url: base,
                    body: data
                });
                if (progression.statusCode === StatusCode.Ok) {
                    return {
                        ...progression,
                        resolve: 'Status do livro alterado e progressão salva com sucesso!',
                    };

                }
            }, 1000)

        } else if (response.statusCode === StatusCode.Created) return {
            ...response,
            resolve: 'Progressão salva com sucesso!'
        }
        return response;
    }

    async deleteProgression(prgoressionId: string) : Promise<HttpResponse<any>> {
        const base = `/api/reading/${prgoressionId}`;
        const response = await this.client.delete({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Progressão deletada com sucesso!',
            }
        } else return  {
            ...response,
            reject: 'Erro ao deletar a progressão.'
        }
    }

    async postReview({bookId, reviews}: BookData): Promise<HttpResponse<any>> {
        const base = `/api/review/${bookId}`;

        const response = await this.client.post({url: base, body: reviews});

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

    async updateReview({id, reviews}: BookData): Promise<HttpResponse<any>> {
        const base = `/api/review/${id}`;

        const response = await this.client.put({url: base, body: reviews});

        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Review atualizado com sucesso!',
            };
        } else return {
            ...response,
            reject: 'Erro ao atualizar review.',
        }
    }

    async deleteReview(reviewId: string): Promise<HttpResponse<any>> {
        const base = `/api/review/${reviewId}`;

        const response = await this.client.delete({url: base});

        if (response.statusCode === StatusCode.Accepted) {
            return {
                ...response,
                resolve: 'Review deletado com sucesso!',
            };
        } else return {
            ...response,
            reject: 'Erro ao deletar review.',
        }
    }

    async fetchReviewsByBookId(googleId: BookData['googleId']): Promise<HttpResponse<any>> {
        const base = `/api/review/book/${googleId}`;
        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) return response;
        return {
            ...response,
            reject: 'Erro ao buscar reviews.',
        }
    }

    async unlikeReview(reviewId: string): Promise<HttpResponse<any>> {
        const base = `/api/like/${reviewId}`;
        const response = await this.client.delete({url: base});

        if (response.statusCode === StatusCode.Created) return {
            ...response,
            resolve: 'Review descurtido com sucesso!',
        }; else return {
            ...response,
            reject: 'Erro ao descurtir review.'
        }
    }

    async likeReview(reviewId: string): Promise<HttpResponse<any>> {
        const base = `/api/like/${reviewId}`;

        const isLiked = await this.isReviewLiked(reviewId);

        if (isLiked.body.liked === true) {
            const deslike = await this.unlikeReview(reviewId);
            if (deslike.statusCode === StatusCode.Ok) return {
                ...deslike,
                resolve: 'Review descurtido com sucesso!',
            }; else return {
                ...deslike,
                reject: 'Erro ao descurtir review.'
            }
        } else {
            const response = await this.client.post({url: base});
            if (response.statusCode === StatusCode.Created) return {
                ...response,
                resolve: 'Review curtido com sucesso!',
            }; else return {
                ...response,
                reject: 'Erro ao curtir review.'
            }
        }
    }

    async isReviewLiked(reviewId: string): Promise<HttpResponse<any>> {
        const base = `/api/like/is-liked/${reviewId}`;
        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) return {
            ...response,
            resolve: 'Sucesso ao buscar curtida na review.',
        };
        return {
            ...response,
            reject: 'Erro ao buscar curtida na review.'
        };
    }

    async reportReview(reviewId: BookData['report']): Promise<HttpResponse<any>> {
        const base = `/api/reports/${reviewId}`;
        const response = await this.client.post({url: base});

        if (response.statusCode === StatusCode.Created) return {
            ...response,
            resolve: 'Review denunciado com sucesso!',
        }; else return {
            ...response,
            reject: 'Erro ao denunciar review.'
        }
    }

    async resolveReport(reportId: string, status: ReportStatus): Promise<HttpResponse<any>> {
        const base = `/api/reports/admin/${reportId}/${status}`;
        const response = await this.client.put({url: base});

        if (status === ReportStatus.RESOLVIDO) {
            if (response.statusCode === StatusCode.Ok) return {
                ...response,
                resolve: 'Denúncia resolvida com sucesso!',
            }; else return {
                ...response,
                reject: 'Erro ao resolver denúncia.'
            }
        } else if (status === ReportStatus.RECUSADO) {
            if (response.statusCode === StatusCode.Ok) return {
                ...response,
                resolve: 'Denúncia rejeitada com sucesso!',
            }; else return {
                ...response,
                reject: 'Erro ao rejeitar denúncia.'
            }
        } else {
            return {
                ...response,
                reject: 'Erro ao resolver denúncia.'
            }
        }
    }

    async fetchAllReports(): Promise<HttpResponse<any>> {
        const base = '/api/reports/admin/all';
        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) return response;
        return {
            ...response,
            reject: 'Erro ao buscar denúncias.',
        }
    }

    async fetchLikesQuantityByReviewId(reviewId: string): Promise<HttpResponse<any>> {
        const base = `/api/like/${reviewId}`;
        const response = await this.client.get({url: base});
        if (response.statusCode === StatusCode.Ok) return response;
        return {
            ...response,
            reject: 'Erro ao buscar usuários que curtiram a review.',
        }
    }

    async fetchBooksByUser(): Promise<HttpResponse<any>> {
        const base = '/api/mybooks/mine';

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Sucesso ao buscar livros!',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros.',
            };
        }
    }

    async fetchMyBooksByGoogleId(googleId: BookData['googleId']): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/google/${googleId}`;

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) return response;
        else {
            return {
                ...response,
                reject: 'Erro ao buscar livro.',
            }
        }
    }

    async fetchLastPage(bookId: BookData['bookId']): Promise<HttpResponse<any>> {
        const base = `/api/pages/book/${bookId}`

        const response = await this.client.get({url: base})

        if (response.statusCode === StatusCode.Ok) return response;
        else {
            return {
                ...response,
                reject: 'Erro ao pegar última página.'
            }
        }
    }

    async fetchBookById(bookId: BookData['bookId']): Promise<HttpResponse<any>> {
        const base = `/api/books/${bookId}`;

        const response = await this.client.get({url: base});
        if (response.statusCode === StatusCode.Ok) {
            return response;

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livro.'
            }
        }
    }

    async fetchBooksByGoogleId(googleId: BookData['googleId']): Promise<HttpResponse<any>> {
        const base = `/api/books/google/${googleId}`;

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return response;

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livro.'
            };
        }
    }

    async fetchCombinedBooksByUser(): Promise<HttpResponse<any>> {
        const response = await this.fetchBooksByUser();

        if (response.statusCode !== StatusCode.Ok) {
            return {
                ...response,
                reject: 'Erro ao buscar livros do usuário.',
            };
        }

        const userBooks = response.body;

        const combinedBooks = await Promise.all(userBooks.map(async (userBook: any) => {
            const bookDetailsResponse = await this.fetchBookById(userBook.bookId);
            if (bookDetailsResponse.statusCode === StatusCode.Ok) {
                return {...userBook, ...bookDetailsResponse.body};
            } else {
                return userBook;
            }
        }));

        return {
            ...response,
            body: combinedBooks,
            resolve: 'Sucesso ao buscar livros combinados do usuário.',
        };
    }


    async fetchBooksByStatus(status: string): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/status/${status}`;

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                body: response.body,
                resolve: 'Sucesso ao buscar livros!',
            }

        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros.',
            };
        }
    }

    // PROGRESSIONS
    async fetchProgressions(): Promise<HttpResponse<any>> {
        const base = '/api/reading';

        const response = await this.client.get({url: base});
        if (response.statusCode === StatusCode.Ok) return response;
        else {
            return {
                ...response,
                reject: 'Erro ao buscar progressões',
            };
        }
    }

    async fetchProgressionsPages(bookId: BookData['bookId']): Promise<HttpResponse<any>> {
        const base = `/api/pages/rp/${bookId}`;

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return response;
        } else {
            return {
                ...response,
                reject: 'Erro ao buscar progressões do livro.',
            };
        }
    }

    async isFavorited(bookId: BookData['bookId']): Promise<HttpResponse<any>> {
        const base = `/api/books/favorite/is-favorited/${bookId}`;

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return response;
        }
        return response;

    }

    async favoriteBook(bookId: BookData['bookId']): Promise<HttpResponse<any>> {
        const base = `/api/books/favorite/${bookId}`;

        const isFavorited = await this.isFavorited(bookId);

        const response = await this.client.put({url: base});

        if (isFavorited.body === false) return {
            ...response,
            resolve: 'Livro favoritado com sucesso!'
        };
        else if (isFavorited.statusCode === StatusCode.Ok) return {
            ...response,
            resolve: 'Livro desfavoritado com sucesso!'
        };

        return {
            ...response,
            reject: 'Erro ao favoritar livro',
        }

    }

    async fetchFavoriteBooks(): Promise<HttpResponse<any>> {
        const base = '/api/books/favorite/mine';

        const response = await this.client.get({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Sucesso ao buscar livros favoritos!',
            };
        } else {
            return {
                ...response,
                reject: 'Erro ao buscar livros favoritos.',
            };
        }
    }

    async disableBook(myBooksId: BookData['id']): Promise<HttpResponse<any>> {
        const base = `/api/mybooks/${myBooksId}/disable`;

        const response = await this.client.put({url: base});

        if (response.statusCode === StatusCode.Ok) {
            return {
                statusCode: StatusCode.Ok,
                resolve: 'Livro desativado com sucesso!',
            }
        } else {
            return {
                ...response,
                reject: 'Erro ao desativar livro.',
            }
        }
    }
}