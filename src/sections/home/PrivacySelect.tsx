import { Button } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'styles/components';
import { Color } from 'styles/styled';

const PrivacySelectComponent = ({ level, form, setForm }) => {

    const onLevelClick = (index) => {
        if (level != index) {
            setForm({ ...form, preset: index })
        } else {
            setForm({ ...form, preset: null })
        }
    }
    return (
        <PrivacySelect>
            <LevelButton active={level == 10} level={10} onClick={() => onLevelClick(10)}>
                <HeroIcon src="irondude.svg" />
            </LevelButton>
            <LevelButton active={level == 20} level={20}
                onClick={() => onLevelClick(20)}
            >
                <HeroIcon src="spiderguy.svg" />
            </LevelButton>
            <LevelButton disable={true} active={level == 30} level={30}
                // onClick={() => onLevelClick(30)}
            >
                <HeroIcon src="batlover.svg" />
            </LevelButton>
            <LevelButton disable={true} active={level == 40} level={40}
                // onClick={() => onLevelClick(40)}
            >
                <HeroIcon src="clown.svg" />
            </LevelButton>
        </PrivacySelect>
    );
}

export default PrivacySelectComponent;

const PrivacySelect = styled(Flex)`
    width: 100%;
`;

const LevelButton = styled(Button) <{ border?: string, level: number, active }>`
    display: flex;
    flex: 1;
    border-radius: 0px;
    color: black;
    border: 3px solid #00000000;
    padding: 6px 0;
    margin: 0px;
    align-items: center;
    justify-content: center;
    ${props => props.level == 10 &&
        css`
        background-color: ${({ theme }) => theme.level1};
        border-radius: 8px 0px 0px 8px;
        &:hover{
            background-color: ${({ theme }) => theme.level1Hover};
        }
    `};
    ${props => props.level == 20 &&
        css`
        background-color: ${({ theme }) => theme.level2};
        // background-color: ${({ theme }) => theme.disabled};
        &:hover{
            background-color: ${({ theme }) => theme.level2Hover};
        }
    `};
    ${props => props.level == 30 &&
        css`
        background-color: ${({ theme }) => theme.disabled};
        /* background-color: ${({ theme }) => theme.level3};
        &:hover{
            background-color: ${({ theme }) => theme.level3Hover};
        } */
    `};
    ${props => props.level == 40 &&
        css`
        background-color: ${({ theme }) => theme.disabled};
        /* background-color: ${({ theme }) => theme.level4};
        &:hover{
            background-color: ${({ theme }) => theme.level4Hover};
        } */
        border-radius: 0px 8px 8px 0px;
    `};
    ${props => (props.active && props.level == 10) &&
        css`
            border: ${props => `3px solid ${props.theme.level1Active}`};
            background-color: ${({ theme }) => theme.level1Hover};
        `    
    }
    ${props => (props.active && props.level == 20) &&
        css`
            border: ${props => `3px solid ${props.theme.level2Active}`};
            background-color: ${({ theme }) => theme.level2Hover};
        `    
    }
`

const HeroIcon = styled.img`
    width: 33px;
`