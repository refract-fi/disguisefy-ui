import { Label, Text } from "components";
import { FC, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Flex } from "styles/components";
import LineWrapper from "./LineWrapper";

interface BarChartProps {
    data: any
}

const BarChart: FC<BarChartProps> = ({ data }) => {

    const [dataObj, setDataObj] = useState({});
    const theme = useTheme();
    const round = (value) => {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    const checkDataLength = () => {
        let obj = {}
        for (let x in data) {
            if (data[x] > 0.1) {
                obj[x] = data[x]
            }
        }
        setDataObj(obj)
    }

    useEffect(() => {
        if (data) {
            checkDataLength()
        }
    }, [data])

    return (
        <LineChart>
            {
                data?.wallet > 0.1 &&
                <LineWrapper
                    flex={data.wallet}
                    first={true}
                    last={Object.values(dataObj).length == 1}
                    color={theme.i1}
                    type="top"
                    name="Wallet"
                    percent={round(data.wallet)}
                />
            }
            {
                data?.deposit > 0.1 &&
                <LineWrapper
                    flex={data.deposit}
                    first={Object.values(dataObj).includes('wallet')}
                    last={!(Object.keys(dataObj).some(item => ['pool', 'staking', 'claimable', 'nft', 'investment'].includes(item)))}
                    color={theme.i2}
                    type="top"
                    name={"Deposits"}
                    percent={round(data.deposit)}
                />
            }
            {
                data?.pool > 0.1 &&
                <LineWrapper
                    flex={data.pool}
                    first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit'].includes(item)))}
                    last={!(Object.keys(dataObj).some(item => ['staking', 'claimable', 'nft', 'investment'].includes(item)))}
                    color={theme.i3}
                    type="top"
                    name={"Liquidity Pools"}
                    percent={round(data.pool)}

                />
            }
            {
                data?.staking > 0.1 &&
                <LineWrapper
                    flex={data.staking}
                    first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit', 'pool'].includes(item)))}
                    last={!(Object.keys(dataObj).some(item => ['claimable', 'nft', 'investment'].includes(item)))}
                    color={theme.i4}
                    type="top"
                    name={"Staking"}
                    percent={round(data.staking)}
                />
            }
            {
                data?.claimable > 0.1 &&
                <LineWrapper
                    flex={data.claimable}
                    first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit', 'pool', 'staking'].includes(item)))}
                    last={!(Object.keys(dataObj).some(item => ['nft', 'investment'].includes(item)))}
                    color={theme.i5}
                    type="top"
                    name={"Claimable"}
                    percent={round(data.claimable)}

                />
            }
            {
                data?.nft > 0.1 &&
                <LineWrapper
                    flex={data.nft}
                    first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit', 'pool', 'staking', 'claimable'].includes(item)))}
                    last={!(Object.values(dataObj).includes('investment'))}
                    color={theme.i6}
                    type="top"
                    name={"NFTs"}
                    percent={round(data.nft)}
                />
            }
            {
                data?.investment > 0.1 &&
                <LineWrapper
                    flex={data.investment}
                    first={Object.values(dataObj).length == 1}
                    last={true}
                    color={theme.i7}
                    type="top"
                    name={"Investments"}
                    percent={round(data.investment)}
                />
            }
            {
                data?.debt > 0.1 && (
                    <BorrowedLineWrapper
                        width={Math.abs(data?.debt)}>
                        <Label
                            type="bot"
                            name={"Debt"}
                            percent={Math.abs(round(data?.debt))}
                        />
                        <BracketLine />
                        <BracketBox />
                        <BorrowedLine />
                    </BorrowedLineWrapper>
                )
            }
        </LineChart>
    );
}

export default BarChart;


const LineChart = styled(Flex)`
    width: 100%;
    padding: 25px 20px;
    position: relative;
    ${({ theme }) => theme.mediaWidth.sm`
        padding: 25px 10px;
        display: none;
    `};
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