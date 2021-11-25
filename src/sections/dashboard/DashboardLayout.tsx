import useDisguise from "hooks/useDisguise";
import { useRouter } from "next/dist/client/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { Footer, Menu } from "sections/shared";
import styled from "styled-components";
import { Grid } from "styles/components";
import { DetailsPanel } from ".";
import Content from "./Content";

interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {

    const router = useRouter()
    const { id } = router.query
    const { data, error, isValidating } = useDisguise(id)
    const [isFirstValidation, setIsFirstValidation] = useState(true)
    let errorCode = error?.response!.status
    
    //Remove reload indicator if data was fetched before
    useEffect(() => {
        if(isFirstValidation && !isValidating){
            setIsFirstValidation(false)
        }
    }, [data])

    return (
        <Wrapper>
            <Menu />
            <DetailsPanel data={data} loading={isValidating && isFirstValidation} />
            <Content loading={isValidating && isFirstValidation} error={errorCode == 404 || errorCode == 408 || errorCode == 500 || errorCode == 999}>
                {children}
            </Content>
            <Footer />
        </Wrapper>
    );
}

export default DashboardLayout;

const Wrapper = styled(Grid)`
    padding-top: 40px;
    grid-template-columns: repeat(12, 1fr);
    margin-bottom: 10px;
    ${({ theme }) => theme.mediaWidth.xl`
        padding: 0px 20px;
        padding-top: 40px;
    `};
    ${({ theme }) => theme.mediaWidth.lg`
        padding: 0px 20px;
        padding-top: 10px;
    `};
    ${({ theme }) => theme.mediaWidth.md`
        padding: 0px 10px;
        padding-top: 5px;
    `};
`;