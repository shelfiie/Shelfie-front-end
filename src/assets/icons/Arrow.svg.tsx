import styled from 'styled-components';

const RotatableSvg = styled.svg<{ isOpen: boolean }>`
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'none'};
    transition: transform 0.3s ease-in-out;
`;

export const Arrow = ({ isOpen, ...props }: { isOpen: boolean, fill : string }) => {
    return (
        <RotatableSvg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" isOpen={isOpen}>
            <path d="M6.82423 1.20152C7.20658 0.850907 7.79356 0.850907 8.17592 1.20152L14.4692 6.97229C15.1414 7.58862 14.7053 8.70934 13.7934 8.70934L1.20675 8.70934C0.294822 8.70934 -0.141228 7.58862 0.530903 6.97229L6.82423 1.20152Z" fill={props.fill} />
        </RotatableSvg>
    );
}