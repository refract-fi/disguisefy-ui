import { Tooltip } from "@material-ui/core";
import { tooltipClasses } from "@mui/material";
import { Button, Text } from "components";
import React from "react";
import styled, { css } from "styled-components";
import { Flex } from "styles/components";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
  },
}));

const PrivacySelectComponent = ({ level, form, setForm }) => {
  const onLevelClick = (index) => {
    if (level != index) {
      setForm({ ...form, preset: index });
    } else {
      setForm({ ...form, preset: null });
    }
  };
  return (
    <PrivacySelect>
      <StyledTooltip
        title={
          <React.Fragment>
            <Text lineHeight="1.4" size="0.95rem" align="center">
              Discloses all your holdings weighted to the total of your portfolio.
            </Text>
          </React.Fragment>
        }
        placement="top"
      >
        <LevelButton
          active={level == 10}
          level={10}
          onClick={() => onLevelClick(10)}
        >
          <HeroIcon src="/static/irondude.svg" />
        </LevelButton>
      </StyledTooltip>
      <StyledTooltip
        title={
          <React.Fragment>
            <Text lineHeight="1.4" size="0.95rem" align="center">
              Discloses all your holdings with the percentages of their
              category. Your assets are shown, but not weighted to the total of
              your portfolio.
            </Text>
          </React.Fragment>
        }
        placement="top">
        <LevelButton
          active={level == 20}
          level={20}
          onClick={() => onLevelClick(20)}>
          <HeroIcon src="/static/spiderguy.svg" />
        </LevelButton>
      </StyledTooltip>
    </PrivacySelect>
  );
};

export default PrivacySelectComponent;

const PrivacySelect = styled(Flex)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const LevelButton = styled(Button)<{ border?: string; level: number; active }>`
  display: flex;
  border-radius: 0px;
  color: black;
  border: 3px solid #00000000;
  padding: 6px 0;
  margin: 0px 0.4rem;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  ${(props) =>
    props.level == 10 &&
    css`
      background-color: ${({ theme }) => theme.level1};
      &:hover {
        background-color: ${({ theme }) => theme.level1Hover};
      }
    `};
  ${(props) =>
    props.level == 20 &&
    css`
      background-color: ${({ theme }) => theme.level2};
      &:hover {
        background-color: ${({ theme }) => theme.level2Hover};
      }
    `};
  ${(props) =>
    props.level == 30 &&
    css`
      background-color: ${({ theme }) => theme.disabled};
      /* background-color: ${({ theme }) => theme.level3};
        &:hover{
            background-color: ${({ theme }) => theme.level3Hover};
        } */
    `};
  ${(props) =>
    props.level == 40 &&
    css`
      background-color: ${({ theme }) => theme.disabled};
      /* background-color: ${({ theme }) => theme.level4};
        &:hover{
            background-color: ${({ theme }) => theme.level4Hover};
        } */
    `};
  ${(props) =>
    props.active &&
    props.level == 10 &&
    css`
      border: ${(props) => `3px solid #bf3b42`};
      background-color: ${({ theme }) => theme.level1Hover};
    `}
  ${(props) =>
    props.active &&
    props.level == 20 &&
    css`
      border: ${(props) => `3px solid #bf3b42`};
      background-color: ${({ theme }) => theme.level2Hover};
    `}
`;

const HeroIcon = styled.img`
  height: 25px;
`;
