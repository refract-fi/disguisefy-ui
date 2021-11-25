import { Layout } from "components";
import useDisguise from "hooks/useDisguise";
import { useRouter } from "next/dist/client/router";
import { FC, ReactElement, useEffect, useState } from "react";
import DashboardLayout from "sections/dashboard/DashboardLayout";

interface StatsProps {

}

const StatsTab: FC<StatsProps> = () => {

    const router = useRouter()
    const { id } = router.query
    const { data, error, isValidating } = useDisguise(id)
    const [isFirstValidation, setIsFirstValidation] = useState(true)

    //Remove reload indicator if data was fetched before
    useEffect(() => {
        if (isFirstValidation && !isValidating) {
            setIsFirstValidation(false)
        }
    }, [data])

    return (
        <>
            <div>hey mom</div>
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