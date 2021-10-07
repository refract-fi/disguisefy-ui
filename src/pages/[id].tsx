
import axios from 'axios';
import { Router, useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { MainPanel, DetailsPanel } from 'sections/dashboard';
import { Footer, Menu } from 'sections/shared';
import styled from 'styled-components';
import { FlexCentered, Grid } from 'styles/components';

const Dashboard = () => {

    const router = useRouter()

    const { id } = router.query

    const [data, setData] = useState();
    const [loading, setLoading] = useState<boolean>(true);

    const getBalances = async () => {
        await axios.get('/api/disguise', {params: {id: id}}).then(function (response) {
            setData(response.data)
            console.log(response.data)
        }).catch(function (error) {
            // console.log(error.response!.status)
            setData(error.response!.status)
            setLoading(false)
        });
        await setLoading(false)
    }

    useEffect(() => {
        if(id){
            getBalances()
        }
    }, [id])
    return (
        <Wrapper>
            <Menu />
            <DetailsPanel data={data} loading={loading} />
            <MainPanel data={data} loading={loading} />
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