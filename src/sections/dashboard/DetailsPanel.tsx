import { Button, CopyLink, Text, Tooltip } from 'components';
import moment from 'moment';
import React from 'react';
import { Links, Menu } from 'sections/shared';
import styled, { css, useTheme } from 'styled-components';
import { Flex, FlexCol, FlexRow, FlexRowCentered } from 'styles/components';
import {Link} from 'react-router-dom';
import Image from 'next/image';

const DetailsPanelComponent = ({ loading, data }) => {

    const theme = useTheme()

    console.log(typeof data?.disguise?.preset)
    return (
        <Wrapper>
            <DisLogo src="disguisefy_logo.svg" />
            <DetailsPanel>
                {
                    (!loading && data !== 404) && (
                        <div>
                            <Text variant="subtitle">{data?.disguise.name}</Text>
                            <StyledFlexRowCentered margin="5px 0 0 0">
                                <Text color={theme.accent} variant="normal">{window.location.origin.length > 24 ? `${window.location.origin.substring(0, 24)}[...]` : window.location.origin}/{data?.disguise?.url}</Text>
                                <CopyLink variant="details" url={`${data?.disguise?.url}`} />
                            </StyledFlexRowCentered>
                            <Text margin="5px 0 0 0" variant="normal" color="lightgrey">Expires {data && moment.unix(data?.disguise?.expiration).format("MMMM Do YYYY, h:mm a")}</Text>
                            {/* <FlexRowCentered>
                                <SnowIcon src="./snow.svg" />
                                <div>
                                    <FlexRow>
                                    <Text margin="5px 0 0 0" variant="normal" weight="bold" color="lightgrey">One time snapshot taken on:</Text>
                                    <Tooltip
                                        type="white"
                                        variant="dashboard"
                                        content1="This data was fetched once"
                                        content2="at the time shown below." />
                                    </FlexRow>
                                    <Text margin="0 0 0 0" variant="normal" color="lightgrey">October 8th 2021, 12:07 am</Text>
                                </div>
                            </FlexRowCentered> */}
                        </div>
                    )
                }
                <Mobile>
                    <Link to="/">
                        <Button width="85px" size="small">New</Button>
                    </Link>
                </Mobile>

                {
                    data?.disguise?.preset == 10 &&
                    <PresetImage preset={data?.disguise?.preset} src="preset_10.svg" />
                }
            </DetailsPanel>
            {
                data?.disguise?.preset == 20 &&
                <PresetImage preset={data?.disguise?.preset} src="preset_20.svg" />
            }
            <LinksWrapper>
                <Link to="/">
                    <Button width="85px" size="small">New</Button>
                </Link>
            </LinksWrapper>
        </Wrapper>
    );
}

export default DetailsPanelComponent;


const Wrapper = styled.div`
    position: relative;
    grid-column: 1/5;
    justify-self: flex-end;
    width: 350px;
    ${({ theme }) => theme.mediaWidth.xl`
        grid-column: 1/4;
        width: 300px;
    `};
    ${({ theme }) => theme.mediaWidth.lg`
        justify-self: flex-start;
        grid-column: 1/13;
        width: 100%;
        display: flex;
        justify-content: space-between;
        max-width: 1100px;
        justify-self: center;
    `};
    ${({ theme }) => theme.mediaWidth.sm`
        flex-direction: column;
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
    min-height: 90px;
    ${({ theme }) => theme.mediaWidth.lg`
        bottom: -20px;
        border-radius: 14px 14px 0 0;
        border-style: dashed dashed dashed dashed;
        width: 350px;
        padding: 10px 20px;
        padding-bottom: 30px;
        z-index: 0;
    `};
    ${({ theme }) => theme.mediaWidth.md`
        padding: 10px 20px;
        padding-bottom: 30px;
    `};
    ${({ theme }) => theme.mediaWidth.sm`
        order: 2;
        width: 100%;
        margin-top: -10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 20px;
        padding-bottom: 30px;
    `};
    ${({ theme }) => theme.mediaWidth.xs`
        padding: 10px 20px;
        padding-bottom: 30px;
    `};
`;

const StyledFlexRowCentered = styled(FlexRowCentered)`
    position: relative;
`

const Mobile = styled.div`
    display: none;
    ${({ theme }) => theme.mediaWidth.sm`
    display: block;
    `};
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
    ${({ theme }) => theme.mediaWidth.lg`
        display: none;
    `};
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
    ${({ theme }) => theme.mediaWidth.lg`
    display: none;
    `};
`

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