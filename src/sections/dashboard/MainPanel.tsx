import { LineChart } from 'components';
import Spinner from 'components/Spinner';
import React from 'react';
import styled, { css } from 'styled-components';
import { Flex, FlexCol, FlexRow, FlexRowSpaceAround, FlexRowSpaceBetween, Tablet } from 'styles/components';
import { CategoryBlock, RequestError } from '.';


const MainPanelComponent = ({ data, loading }) => {

    let preset = data?.disguise?.preset
    return (
        <MainPanel loading={loading} error={false}>
            {/* <RequestError type="408" /> */}
            {
                loading ? <Spinner /> : (
                    <>
                        <Tablet>
                            <LineChart
                                data={data.percentages}/>
                        </Tablet>
                        <StyledFlex>
                            <CategoryBlock
                                display={data?.percentages?.wallet == 0}
                                categoryData={data?.percentages?.wallet}
                                assetData={data?.assetsPercentages?.wallet}
                                preset={preset}
                                title="Wallet" />
                            <CategoryBlock
                                display={data?.percentages?.deposit == 0}
                                categoryData={data?.percentages?.deposit}
                                assetData={data?.assetsPercentages?.deposit}
                                preset={preset}
                                title="Deposits" />
                            <CategoryBlock
                                display={data?.percentages?.pool == 0}
                                categoryData={data?.percentages?.pool}
                                assetData={data?.assetsPercentages?.pool}
                                preset={preset}
                                title="Liquidity Pools" />
                            <CategoryBlock
                                display={data?.percentages?.staking == 0}
                                categoryData={data?.percentages?.staking}
                                assetData={data?.assetsPercentages?.staking}
                                preset={preset}
                                title="Staked" />
                            <CategoryBlock
                                display={data?.percentages?.claimable == 0}
                                categoryData={data?.percentages?.claimable}
                                assetData={data?.assetsPercentages?.claimable}
                                preset={preset}
                                title="Yield" />
                            <CategoryBlock
                                display={data?.percentages?.nft == 0}
                                categoryData={data?.percentages?.nft}
                                assetData={data?.assetsPercentages?.nft}
                                preset={preset}
                                title="NFTs" />
                            <CategoryBlock
                                display={data?.percentages?.investment == 0}
                                categoryData={data?.percentages?.investment}
                                assetData={data?.assetsPercentages?.investment}
                                preset={preset}
                                title="Investments" />
                            <CategoryBlock
                                display={data?.percentages?.debt == 0}
                                categoryData={Math.abs(data?.percentages?.debt)}
                                assetData={data?.assetsPercentages?.debt}
                                preset={preset}
                                title="Debt" />
                        </StyledFlex>
                    </>
                )
            }
        </MainPanel>
    );
}

export default MainPanelComponent;

const MainPanel = styled(FlexCol) <{ loading?: boolean, error?: boolean }>`
    width: 100%;
    max-width: 1100px;
    min-height: 800px;
    grid-column: 5/13;
    justify-self: flex-start;
    justify-content: ${props => (props.loading || props.error) && 'center'};
    align-items: center;
    border: 1px solid ${({ theme }) => theme.accent};
    padding: 10px 1.5%;
    background-color: ${({ theme }) => theme.bg16};
    border-radius: 0 14px 14px 14px;
    z-index: 2;
    ${(props) =>
        !props.loading &&
        css`
        align-items: normal;
	`}
    ${({ theme }) => theme.mediaWidth.xl`
        grid-column: 4/13;
    `};
    ${({ theme }) => theme.mediaWidth.lg`
        grid-column: 1/13;
        border-radius: 14px;
        min-height: 750px;
        justify-self: center;
    `};
        ${({ theme }) => theme.mediaWidth.sm`
        min-height: 550px;
    `};
`;

const StyledFlex = styled(Flex)`
    flex-wrap: wrap;
    justify-content: center;
`