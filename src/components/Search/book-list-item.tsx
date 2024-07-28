import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import { BookData } from "../../types/bookData";
import { BookContainer, BookText } from "./search-bar.styles";

const StyledListItem = styled('li')({
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
    '& :hover': {
        backgroundColor: '#f5f5f5'
    }
});

type BookListItemProps = {
    option: BookData;
    navigate: ReturnType<typeof useNavigate>;
};

export const BookListItem: React.FC<BookListItemProps> = ({ option, navigate, ...props }) => {
    const placeholderImage = 'https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png';

    let authorsText = '';

    if (Array.isArray(option.authors)) {
        authorsText = option.authors.join(', ');
    } else if (!option.authors) {
        authorsText = 'Autor não informado';
    } else {
        authorsText = option.authors;
    }

    const date = option.publishedDate ? new Date(option.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric' }) : 'Data de publicação não informada';

    const verifThumb = option.thumbnailUrl ? option.thumbnailUrl : option.smallThumbnailUrl ? option.smallThumbnailUrl : placeholderImage;

    return (
        <StyledListItem
            {...props}
            key={option.googleId}
            onClick={() => navigate(`/bookdetails/${option.googleId}`)}
        >
            <BookContainer>
                <img src={verifThumb} alt={`${option.title} thumbnail`} />
                <BookText>
                    <p>{option.title}</p>
                    <span>Autor(es): {authorsText}</span>
                    <span>Ano de publicação: {date}</span>
                </BookText>
            </BookContainer>
        </StyledListItem>
    );
};
