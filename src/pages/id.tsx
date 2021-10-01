
import axios from 'axios';
import { Router, useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { MainPanel, DetailsPanel } from 'sections/dashboard';
import { Footer, Menu } from 'sections/shared';
import styled from 'styled-components';
import { FlexCentered, Grid } from 'styles/components';
import {HashRouter, Route, Switch } from 'react-router-dom';

const Dashboard = () => {
    
    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if(data){
    //         setLoading(false)
    //     }
    // }, [data])
    return (
        <Wrapper>
            {/* <HashRouter>
                
            </HashRouter> */}
            {/* <Menu />
            <DetailsPanel data={data} loading={loading} />
            <MainPanel data={data} loading={loading} />
            <Footer /> */}
        </Wrapper>
    );
}
  

// export async function getServerSideProps(context) {
//     let {params} = context

//     // Fetch data from external API
//     const res = await axios.get(`https://api.disguisefy.xyz/disguises/url/${params.id}/balances`, {
//         headers:{
//             "x-api-key": "K4QouFjJu7xawHQq"
//         }
//     })
//     const data = res.data
//     return {
//         props: {
//             data
//         } 
//     }
// }


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