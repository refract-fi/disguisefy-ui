import { Layout, LineChart } from "components";
import Spinner from "components/Spinner";
import useDisguise from "hooks/useDisguise";
import { useRouter } from "next/dist/client/router";
import { FC, ReactElement, useEffect, useState } from "react";
import { RequestError } from "sections/dashboard";
import DashboardLayout from "sections/dashboard/DashboardLayout";
import styled from "styled-components";
import { assetDistributionValues } from "utils/chartObjects";

interface StatsProps {

}

const StatsTab = () => {

    const router = useRouter()
    const { id } = router.query
    const { data, error, isValidating } = useDisguise(id)
    const [isFirstValidation, setIsFirstValidation] = useState(true)
    let errorCode = error?.response?.status
    let preset = data?.disguise?.preset

    //Remove reload indicator if data was fetched before
    useEffect(() => {
        if (isFirstValidation && !isValidating) {
            setIsFirstValidation(false)
        }
    }, [data])

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
                                    title={"Network Distribution"}
                                    data={data?.percentages}
                                    values={assetDistributionValues} />
                                <LineChart
                                    title={"Protocol Distribution"}
                                    data={data?.percentages}
                                    values={assetDistributionValues} />
                                <LineChart
                                    title={"Gas Tokens"}
                                    data={data?.percentages}
                                    values={assetDistributionValues} />
                                <LineChart
                                    title={"Gas Spent vs Net Worth"}
                                    data={data?.percentages}
                                    values={assetDistributionValues} />
                                <LineChart
                                    title={"Gas Spent per Network"}
                                    data={data?.percentages}
                                    values={assetDistributionValues} />
                                <LineChart
                                    title={"Transactions per Network"}
                                    data={data?.percentages}
                                    values={assetDistributionValues} />
                            </>
                        ))
            }
        </>
    );
}

export default StatsTab;

StatsTab.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <DashboardLayout>
                {page}
            </DashboardLayout>
        </Layout>
    )
}