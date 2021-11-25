
import axios from 'axios';
import { Layout } from 'components';
import useDisguise from 'hooks/useDisguise';
import useRequest from 'hooks/useRequest';
import { Router, useRouter } from 'next/dist/client/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { MainPanel, DetailsPanel } from 'sections/dashboard';
import { Footer, Menu } from 'sections/shared';
import styled from 'styled-components';
import { FlexCentered, Grid } from 'styles/components';

const Dashboard = () => {

    const router = useRouter()

    const { id } = router.query

    const { data, error, isValidating } = useDisguise(id)

    const [isFirstValidation, setIsFirstValidation] = useState(true)

    //Remove reload indicator if data was fetched before
    useEffect(() => {
        if(isFirstValidation && !isValidating){
            setIsFirstValidation(false)
        }
    }, [data])

    return (
        <Wrapper>
            <Menu />
            <DetailsPanel data={data} loading={isFirstValidation && isValidating} />
            <MainPanel data={data} error={error} loading={isFirstValidation && isValidating} />
            <Footer />
        </Wrapper>
    );
}

export default Dashboard;

const Wrapper = styled(Grid)`
    width: 100%;
    padding: 0px 80px;
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
        padding-top: 10px;
    `};
`;