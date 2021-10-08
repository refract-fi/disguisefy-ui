import { Label, Text } from 'components';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexCol } from 'styles/components';

//Improve the mess below
const LineChartComponent = ({ data }) => {

    const [dataObj, setDataObj] = useState({});

    const theme = useTheme();

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
        <Component>
            <Text size="1.5rem" margin="0 20px 20px 20px">Asset Distribution</Text>
            <LineChart>
                {
                    data?.wallet > 0.1 &&
                    <LineWrapper flex={data.wallet}>
                        <Line
                            first={true}
                            last={Object.values(dataObj).length == 1}
                            color={theme.i1}
                        />
                        <Label
                            type="top"
                            name={"Wallet"}
                            percent={data.wallet.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.deposit > 0.1 &&
                    <LineWrapper flex={data.deposit}>
                        <Line
                            first={Object.values(dataObj).includes('wallet')}
                            last={!(Object.keys(dataObj).some(item => ['pool', 'staking', 'claimable', 'nft', 'investment'].includes(item)))}
                            color={theme.i2}
                        />
                        <Label
                            type="top"
                            name={"Deposits"}
                            percent={data.deposit.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.pool > 0.1 &&
                    <LineWrapper flex={data.pool}>
                        <Line
                            first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit'].includes(item)))}
                            last={!(Object.keys(dataObj).some(item => ['staking', 'claimable', 'nft', 'investment'].includes(item)))}
                            color={theme.i3}
                        />
                        <Label
                            type="top"
                            name={"Liquidity Pools"}
                            percent={data.pool.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.staking > 0.1 &&
                    <LineWrapper flex={data.staking}>
                        <Line
                            first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit', 'pool'].includes(item)))}
                            last={!(Object.keys(dataObj).some(item => ['claimable', 'nft', 'investment'].includes(item)))}
                            color={theme.i4}
                        />
                        <Label
                            type="top"
                            name={"Staking"}
                            percent={data.staking.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.claimable > 0.1 &&
                    <LineWrapper flex={data.claimable}>
                        <Line
                            first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit', 'pool', 'staking'].includes(item)))}
                            last={!(Object.keys(dataObj).some(item => ['nft', 'investment'].includes(item)))}
                            color={theme.i5}
                        />
                        <Label
                            type="top"
                            name={"Claimable"}
                            percent={data.claimable.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.nft > 0.1 &&
                    <LineWrapper flex={data.nft}>
                        <Line
                            first={!(Object.keys(dataObj).some(item => ['wallet', 'deposit', 'pool', 'staking', 'claimable'].includes(item)))}
                            last={!(Object.values(dataObj).includes('investment'))}
                            color={theme.i6}
                        />
                        <Label
                            type="top"
                            name={"NFTs"}
                            percent={data.nft.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.investment > 0.1 &&
                    <LineWrapper flex={data.investment}>
                        <Line
                            first={Object.values(dataObj).length == 1}
                            last={true}
                            color={theme.i7}
                        />
                        <Label
                            type="top"
                            name={"Investments"}
                            percent={data.investment.toFixed(2)}
                        />
                    </LineWrapper>
                }
                {
                    data?.debt > 0.1 && (
                        <BorrowedLineWrapper
                            width={Math.abs(data.debt)}>
                            <Label
                                type="bot"
                                name={"Debt"}
                                percent={Math.abs(data.debt.toFixed(2))}
                            />
                            <BracketLine />
                            <BracketBox />
                            <BorrowedLine />
                        </BorrowedLineWrapper>
                    )
                }
            </LineChart>
        </Component>
    );
}

export default LineChartComponent;

const Component = styled(FlexCol)`
    margin: 40px 30px 20px;
    ${({ theme }) => theme.mediaWidth.md`
    margin: 25px 10px 0px;
    `};
`

const LineChart = styled(Flex)`
    width: 100%;
    padding: 25px 20px;
    position: relative;
`;

const LineWrapper = styled(FlexCol) <{ flex: number }>`
    flex: ${props => props.flex > 0.1 ? props.flex : 0.020};
    min-width: 60px;
`

const Line = styled.div<{ first: boolean, last: boolean }>`
    background-color: ${props => props.color};
    height: 24px;
    border-radius: ${props => props.first ? "20px" : "0px"} ${props => props.last ? "20px" : "0px"} ${props => props.last ? "20px" : "0px"} ${props => props.first ? "20px" : "0px"};
    &:hover{
        filter: brightness(1.1);
    }
`

const BorrowedLineWrapper = styled.div<{ width: number }>`
    position: absolute;
    right: 0;
    padding-right: 20px;
    width: ${props => props.width && `${props.width}%`};
    top: 35px;
    transform: translate(0, -100%); 
    min-width: 30px;
`

const BorrowedLine = styled.div<{}>`
    background-color: ${({ theme }) => theme.red};;
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