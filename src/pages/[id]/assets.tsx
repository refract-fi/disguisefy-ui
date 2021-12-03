import { Layout, LineChart } from "components";
import Spinner from "components/Spinner";
import useDisguise from "hooks/useDisguise";
import { useRouter } from "next/dist/client/router";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { CategoryBlock, RequestError } from "sections/dashboard";
import DashboardLayout from "sections/dashboard/DashboardLayout";
import styled from "styled-components";
import { Flex } from "styles/components";
import { assetDistributionValues } from "utils/chartObjects";

interface AssetsProps {
    getLayout?: (page: ReactNode) => ReactNode;
}

const AssetsTab = () => {

    const router = useRouter()
    const { id } = router.query
    const { data, error, isValidating } = useDisguise(id)
    const [structuredData, setStructuredData] = useState<any>()
    const [isFirstValidation, setIsFirstValidation] = useState(true)
    let errorCode = error?.response?.status
    let preset = data?.disguise?.preset

    //Remove reload indicator if data was fetched before
    useEffect(() => {
        if (isFirstValidation && !isValidating) {
            setIsFirstValidation(false)
        }
    }, [data])

    useEffect(() => {
        let assetsObject = assetDistributionValues
        if(data?.percentages){
            for(let [key, value] of Object.entries(data.percentages)){
                if(value === 0){
                    delete assetsObject[key]
                }else {
                    assetsObject[key].percentage = value
                }
            }
        }
        setStructuredData(assetsObject)
        
    }, [data])

    console.log(data)
    return (
        <>
            {
                (isValidating && isFirstValidation) ? <Spinner /> :
                    (
                        (errorCode == 404 || errorCode == 408 || errorCode == 500 || errorCode == 999) ? (
                            <RequestError error={errorCode} />
                        ) : (
                            <>
                                <LineChart
                                    data={structuredData}
                                    title={"Asset Distribution"}
                                    ordered={false} />
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
                                        title="Claimable" />
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
                        ))
            }
        </>
    );
}

export default AssetsTab;

AssetsTab.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <DashboardLayout>
                {page}
            </DashboardLayout>
        </Layout>
    )
}

const StyledFlex = styled(Flex)`
    flex-wrap: wrap;
    justify-content: center;
`