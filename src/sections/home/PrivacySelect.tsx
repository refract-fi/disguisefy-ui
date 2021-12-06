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
                <HeroIcon src="/static/irondude.svg" />
            </LevelButton>
            <LevelButton active={level == 20} level={20}
                onClick={() => onLevelClick(20)}
            >
                <HeroIcon src="/static/spiderguy.svg" />
            </LevelButton>
            <LevelButton disable={true} active={level == 30} level={30}
                // onClick={() => onLevelClick(30)}
            >
                <HeroIcon src="/static/batlover.svg" />
            </LevelButton>
            <LevelButton disable={true} active={level == 40} level={40}
                // onClick={() => onLevelClick(40)}
            >
                <HeroIcon src="/static/clown.svg" />
            </LevelButton>
        </PrivacySelect>
    );
}

export default PrivacySelectComponent;

const PrivacySelect = styled(Flex)`
    width: 100%;
    margin-bottom: 1.5rem;
`;

const LevelButton = styled(Button) <{ border?: string, level: number, active }>`
    display: flex;
    border-radius: 0px;
    color: black;
    border: 2px solid #00000000;
    padding: 6px 0;
    margin: 0px 0.4rem;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    ${props => props.level == 10 &&
        css`
        background-color: ${({ theme }) => theme.level1};
        &:hover{
            background-color: ${({ theme }) => theme.level1Hover};
        }
    `};
    ${props => props.level == 20 &&
        css`
        background-color: ${({ theme }) => theme.level2};
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
    `};
    ${props => (props.active && props.level == 10) &&
        css`
            border: ${props => `2px solid ${props.theme.level1Active}`};
            background-color: ${({ theme }) => theme.level1Hover};
        `    
    }
    ${props => (props.active && props.level == 20) &&
        css`
            border: ${props => `2px solid ${props.theme.level2Active}`};
            background-color: ${({ theme }) => theme.level2Hover};
        `    
    }
`

const HeroIcon = styled.img`
    height: 25px;
`