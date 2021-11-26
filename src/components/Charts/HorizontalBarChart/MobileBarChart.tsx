import { FC } from "react";
import { useTheme } from "styled-components";
import MobileLineWrapper from './MobileLineWrapper';

interface MobileBarChartProps {
    data: any
}

const MobileBarChartComponent: FC<MobileBarChartProps> = ({ data }) => {
    const theme = useTheme();
    return (
        <>
            {data?.wallet > 0.1 &&
                <MobileLineWrapper
                    title="Wallet"
                    color={theme.i1}
                    percentage={data.wallet}
                />
            }
            {
                data?.deposit > 0.1 &&
                <MobileLineWrapper
                    title="Deposits"
                    color={theme.i2}
                    percentage={data.deposit}
                />
            }
            {
                data?.pool > 0.1 &&
                <MobileLineWrapper
                    title="Liquidity Pools"
                    color={theme.i3}
                    percentage={data.pool}
                />
            }

            {
                data?.staking > 0.1 &&
                <MobileLineWrapper
                    title="Staking"
                    color={theme.i4}
                    percentage={data.staking}
                />
            }
            {
                data?.claimable > 0.1 &&
                <MobileLineWrapper
                    title="Claimable"
                    color={theme.i5}
                    percentage={data.claimable}
                />
            }
            {
                data?.nft > 0.1 &&
                <MobileLineWrapper
                    title="NFTs"
                    color={theme.i6}
                    percentage={data.nft}
                />
            }
            {
                data?.investment > 0.1 &&
                <MobileLineWrapper
                    title="Investments"
                    color={theme.i7}
                    percentage={data.investment}
                />
            }
            {
                data?.debt > 0.1 &&
                <MobileLineWrapper 
                    title="Debt" 
                    color={theme.red} 
                    percentage={data?.debt} 
                    variant="debt" />
            }

        </>
    );
}

export default MobileBarChartComponent;

