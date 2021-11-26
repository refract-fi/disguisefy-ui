import { Button, CopyLink, Text, Tooltip } from 'components';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Links, Menu } from 'sections/shared';
import styled, { css, useTheme } from 'styled-components';
import { Flex, FlexCol, FlexRow, FlexRowCentered } from 'styles/components';
import Link from 'next/link';
import Logo from '../../../public/disguisefy_logo_2.svg';

const DetailsPanelComponent = ({ loading, data }) => {

    const theme = useTheme()

    const [location, setLocation] = useState<string>();

    useEffect(() => {
        if (typeof window !== undefined) {
            setLocation(window.location.host)
        } else {
            setLocation("disguisefy.xyz/")
        }
    })

    return (
        <Wrapper>
            <DisLogo src="/static/disguisefy_logo.svg" />
            <DetailsPanel>
                {
                    (!loading && data) && (
                        <div>
                            <Text variant="subtitle">{data?.disguise?.name}</Text>
                            <StyledFlexRowCentered margin="5px 0 0 0">
                                <Text color={theme.accent} variant="normal">{location}/{data?.disguise?.url}</Text>
                                <CopyLink variant="details" host={location} url={`${data?.disguise?.url}`} />
                            </StyledFlexRowCentered>
                            <Text margin="5px 0 0 0" variant="normal" color="lightgrey">Expires {data && moment.unix(data?.disguise?.expiration).format("MMMM Do YYYY, h:mm a")}</Text>
                            {
                                data?.disguise?.options.isSnapshot &&
                                <FlexRowCentered>
                                    <SnowIcon src="/static/snow.svg" />
                                    <div>
                                        <FlexRow>
                                            <Text margin="5px 0 0 0" variant="normal" weight="bold" color="lightgrey">One time snapshot taken on:</Text>
                                            <Tooltip
                                                type="white"
                                                variant="dashboard"
                                                content1="This data was fetched once"
                                                content2="at the time shown below." />
                                        </FlexRow>
                                        <Text margin="0 0 0 0" variant="normal" color="lightgrey">{data && moment.unix(data?.disguise?.generation).format("MMMM Do YYYY, h:mm a")}</Text>
                                    </div>
                                </FlexRowCentered>}
                            {
                                data?.disguise?.options.chains &&
                                <Text margin="5px 0 0 0" variant="normal" color="lightgrey">{data?.disguise?.options.chains}</Text>
                            }
                        </div>
                    )
                }
                <Mobile>
                    <Link href="/">
                        <Button width="85px" size="small">New</Button>
                    </Link>
                </Mobile>
            </DetailsPanel>
        </Wrapper>
    );
}

export default DetailsPanelComponent;


const Wrapper = styled.div`
    position: relative;
    justify-self: flex-end;
    min-width: 315px;
    margin-top: 38.59px;
    ${({ theme }) => theme.mediaWidth.lg`
        min-width: 300px;
    `};
    ${({ theme }) => theme.mediaWidth.md`
        margin: 10px 0px;
        width: 315px;
    `};
    ${({ theme }) => theme.mediaWidth.sm`
        width: 100%;
    `};
`
const DetailsPanel = styled(FlexCol)`
    position: relative;
    min-height: fit-content;
    z-index: 2;
    border: 1px dotted ${({ theme }) => theme.accent};
    padding: 20px;
    background-color: ${({ theme }) => theme.bg16};
    border-radius: 14px 0 0 14px;
    border-style: dashed none dashed dashed;
    z-index: 3;
    ${({ theme }) => theme.mediaWidth.md`
        border-radius: 14px;
        border-style: dashed;
    `};
    ${({ theme }) => theme.mediaWidth.sm`
        order: 2;
        width: 100%;
        margin-top: -10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 20px;
    `};
`;

const StyledFlexRowCentered = styled(FlexRowCentered)`
    position: relative;
`

const Mobile = styled.div`
    display: none;
    @media (max-width: 475px){
        display: block;
    }
`

const SnowIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`



const PresetImage = styled.img<{ preset: number }>`
    position:fixed;
    width: 220px;
    bottom: 0px;
    ${props => props.preset == 20 &&
        css`
        position: relative;
    `};
    @media (max-height: 540px){
        display: none;
    }
`

const DisLogo = styled.img`
    width: 40px;
    position: absolute;
    top: -22px;
    left: 40px;
    z-index: 1;
    ${({ theme }) => theme.mediaWidth.md`
        display: none;
    `};
`

// const LogoWrapper = styled.div`
//     position: absolute;
//     width:40px;
//     top: -32px;
//     left: 40px;
//     ${({ theme }) => theme.mediaWidth.lg`
//     display: none;
//     `};
// `

const LinksWrapper = styled.div`
    display: none;
    ${({ theme }) => theme.mediaWidth.lg`
        display: flex;
        // margin-top: 20px;
        height: 100%;
        padding-bottom: 10px;
        padding-right: 15px;
        align-items: flex-end;
        // height: fit-content;
    `};
    ${({ theme }) => theme.mediaWidth.sm`
        display: none;
    `};
`