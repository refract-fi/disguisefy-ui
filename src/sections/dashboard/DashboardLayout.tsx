import useDisguise from "hooks/useDisguise";
import { useRouter } from "next/dist/client/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { Footer, Menu } from "sections/shared";
import styled from "styled-components";
import { Flex, Grid } from "styles/components";
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
        if (isFirstValidation && !isValidating) {
            setIsFirstValidation(false)
        }
    }, [data])

    return (
        <Wrapper>
            <Tablet>
                <DetailsPanel data={data} loading={isValidating && isFirstValidation}/>
            </Tablet>
            <StyledFlex>
                <Desktop>
                <DetailsPanel data={data} loading={isValidating && isFirstValidation} />
                </Desktop>
                <Content loading={isValidating && isFirstValidation} error={errorCode == 404 || errorCode == 408 || errorCode == 500 || errorCode == 999}>
                    {children}
                </Content>
            </StyledFlex>
        </Wrapper>
    );
}

export default DashboardLayout;

const Wrapper = styled(Flex)`
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding: 40px 20px 0px;
    width: 100%;
    ${({ theme }) => theme.mediaWidth.lg`
    `};
    ${({ theme }) => theme.mediaWidth.md`
        padding: 5px 10px 0px;
    `};
`;

const StyledFlex = styled(Flex)`
    width: 100%;
    max-width: 1350px;
    justify-content: center;
`

const Tablet = styled.div`
    display: none;
    ${({ theme }) => theme.mediaWidth.md`
        display: block;
        width: 100%;
    `};
`

const Desktop = styled.div`
    ${({ theme }) => theme.mediaWidth.md`
        display: none;
    `};
`