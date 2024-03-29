import React from 'react'
import styled from 'styled-components'
import { Theme } from '../../styles/theme'

const PaginometroDiv = styled.div`
    position: absolute;
    right: 1rem;
    top: -1rem;

    display: inline-flex;

    background-color: ${Theme.colors.green};
    color: ${Theme.colors.light};

    padding: ${Theme.margins.marginhalfrem};
    border-radius: ${Theme.margins.marginhalfrem};
    border: ${Theme.borders.border2px} solid ${Theme.colors.deep};

    font-size: ${Theme.font.sizes.small};
    font-weight: ${Theme.font.weight.semiBold};

    gap: 2rem;
`

// to do

export const Paginometro = () => {
    return (
        <PaginometroDiv>
            <p>Paginometro</p>
            <p>105786264</p>
        </PaginometroDiv>
    )
}