import React, { FC, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ReactTooltip from "react-tooltip";

const TooltipComponent:FC<{type?: string, content1: string, content2?: string, variant?: string, id:string}> = ({type, content1, content2, variant, id}) => {
    const node = useRef();
    return (
        <Tooltip variant={variant}>
            <a data-tip data-for={id}>
                <InfoIcon
                    variant={variant}
                    src={type == 'blue' ? "/static/information-circle-blue.svg" : "/static/information-circle.svg"} />
            </a>
            <ReactTooltip className="react-tooltip-style" id={id} place="top" type="dark" effect="solid" multiline={true}>
                <span>{content1}<br/>{content2}</span>
            </ReactTooltip>
        </Tooltip>
    );
}

export default TooltipComponent;

const Tooltip = styled.div<{variant?: string}>`
    top: -8px;
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