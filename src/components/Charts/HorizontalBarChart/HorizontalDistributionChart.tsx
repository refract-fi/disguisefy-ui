import { Label, Text } from "components";
import { FC, useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { Flex } from "styles/components";
import { round } from "utils/round";
import HorizontalDistributionLineWrapper from "./HorizontalDistributionLine";

interface HorizontalDistributionChartProps {
    data: any
    variant?: string
    ordered?: boolean
    title?: string
}

const HorizontalDistributionChart: FC<HorizontalDistributionChartProps> = ({ data, variant, ordered, title }) => {

    console.log(data)

    return (
        <>
            <LineChart variant={variant}>
                {
                    (data && !ordered) &&
                    Object.entries(data).map((entry, index) => {
                        let object: any = entry[1]
                        let hasDebt: boolean = Object.keys(data).includes('debt')
                        let length: number = Object.keys(data).length
                        if (object.percentage > 0.1 && entry[0] !== 'debt') {
                            return (
                                <HorizontalDistributionLineWrapper
                                    flex={object.percentage}
                                    first={index === 0}
                                    last={(hasDebt && index === length - 2) || (!hasDebt && index === length - 1)}
                                    color={object.color}
                                    percent={round(object.percentage)}
                                    key={index}
                                    name={object.title}
                                    type={'top'}
                                />
                            )
                        }
                    })
                }
                {
                    (data && ordered) &&
                    Object.entries(data).sort((a: any, b: any) => b[1].percentage - a[1].percentage).map((entry, index) => {
                        let object: any = entry[1]
                        let hasDebt: boolean = Object.keys(data).includes('debt')
                        let hasOther: boolean = Object.keys(data).includes('other')
                        let length: number = Object.keys(data).length
                        if (object.percentage > 0.1 && entry[0] !== 'debt') {
                            return (
                                <HorizontalDistributionLineWrapper
                                    flex={object.percentage}
                                    first={index === 0}
                                    last={((hasDebt || hasOther) && index === length - 2) || (!hasDebt && index === length - 1)}
                                    color={object.color}
                                    percent={round(object.percentage)}
                                    key={index}
                                    name={object.title}
                                    type={'top'}
                                />
                            )
                        }
                    })
                }
                {
                    (data?.debt && data?.debt?.percentage > 0.1) && (
                        <BorrowedLineWrapper
                            width={Math.abs(data?.debt.percentage)}>
                            <Label
                                type="bot"
                                name={"Debt"}
                                percent={Math.abs(round(data?.debt.percentage))}
                            />
                            <BracketLine />
                            <BracketBox />
                            <BorrowedLine />
                        </BorrowedLineWrapper>
                    )
                }

            </LineChart>
            {(title === 'Network Distribution' && data && data.other && data?.other?.percentage > 0.01) &&
                <Note>*{data.other.percentage.toFixed(2)}% of assets are on other networks</Note>
            }
        </>
    );
}

export default HorizontalDistributionChart;


const LineChart = styled(Flex) <{ variant?: string }>`
    width: 100%;
    padding: 25px 20px 5px;
    position: relative;
    ${({ theme }) => theme.mediaWidth.sm`
        padding: 25px 10px;
        display: none;
    `};
    ${props => props.variant === 'barchart' &&
        css`
            display: none;
        `
    };
`;

const StyledText = styled(Text)`
    margin: 0 20px 20px;
    ${({ theme }) => theme.mediaWidth.sm`
        margin: 0 10px 20px;
    `};
`

const BorrowedLineWrapper = styled.div<{ width: number }>`
    position: absolute;
    right: 20px;
    width: ${props => props.width && `${props.width}%`};
    top: 35px;
    transform: translate(0, -100%); 
    min-width: 27px;
    ${({ theme }) => theme.mediaWidth.md`
        top: 34px;
    `};
`

const BorrowedLine = styled.div<{}>`
    background-color: ${({ theme }) => theme.red};
    border-radius: 0px 20px 0px 0px;
    height: 10px;
    width: 100%;
`

const BracketLine = styled.div`
    border: 2px solid;
    opacity: 0.7;
    border-color: ${({ theme }) => theme.red};
    height: 12px;
    width: 50%;
    position: relative;
    border-width: 0px 2px 0px 0px;
`

const BracketBox = styled.div`
    border: 2px solid;
    opacity: 0.7;
    border-color: ${({ theme }) => theme.red};
    height: 9px;
    border-bottom-width: 0px;
    margin-bottom: 3px;
`

const Note = styled(Text)`
    text-align: right;
    padding: 0 20px;
    ${({ theme }) => theme.mediaWidth.sm`
        
        display: none;
    `};
    ${props => props.variant === 'barchart' &&
        css`
            display: none;
        `
    };
`