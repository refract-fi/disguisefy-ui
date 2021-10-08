import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import ReactTooltip from "react-tooltip";

const TooltipComponent:FC<{type: string, content1: string, content2?: string, variant?: string}> = ({type, content1, content2, variant}) => {

    return (
        <Tooltip variant={variant}>
            <a data-tip data-for="info">
                <InfoIcon
                    variant={variant}
                    src={type == 'blue' ? "/information-circle-blue.svg" : "/information-circle.svg"} />
            </a>
            <ReactTooltip id="info" place="top" type="dark" effect="solid" multiline={true}>
                <span>{content1}<br/>{content2}</span>
            </ReactTooltip>
        </Tooltip>
    );
}

export default TooltipComponent;

const Tooltip = styled.div<{variant?: string}>`
    top: -8px;
    position: relative;
    z-index: 15;
    ${props => props.variant == "dashboard" &&
        css`
            top: 0px;
        `
    };
`;

const InfoIcon = styled.img<{variant?: string}>`
    height: 15px;
    width: 15px;
    ${props => props.variant == "dashboard" && (
        css`
            height: 13px;
            width: 13px;
        `
    )};
`