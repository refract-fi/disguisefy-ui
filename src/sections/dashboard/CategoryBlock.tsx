import { Block, Text } from 'components';
import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { FlexRowSpaceBetween } from 'styles/components';
import { CellRow } from '.';

const CategoryBlockComponent = ({ title, categoryData, assetData, display, preset }) => {

    const theme = useTheme();
    const round = (value) => {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }
    
    return (
        <CategoryBlock display={display} variant="dashboard" color={theme.bg} width="375px" title={title}>
            <FlexRowSpaceBetween width="100%">
                <Text variant="block-title" color="white" margin="0 0 5px 0">{title == 'Claimable' ? 'Yield Farming' : title}</Text>
                <Text variant="block-title" color="white" margin="0 0 5px 0">{(categoryData < 0.5) ? "< 0.5" : round(categoryData)}%</Text>
            </FlexRowSpaceBetween>
            {
                assetData &&
                Object.entries(assetData).sort((a: any, b: any) => (preset == 10 || preset == 0) ? b[1].percentage - a[1].percentage : a[1].percentage - b[1].percentage).map((asset, index) => {
                    if(asset[0] != 'groupedAssets'){
                        return (
                            <CellRow key={index} type={title} value={asset[1]} preset={preset} />
                        )
                    }
                })
            }
            {
                assetData?.groupedAssets && (
                    <CellRow type={title} value={assetData.groupedAssets} preset={preset} />
                )
            }
        </CategoryBlock>
    );
}

export default CategoryBlockComponent;

const CategoryBlock = styled(Block) <{ display?: boolean, title: string }>`
    margin: 10px;
    display: ${props => props.display ? 'none' : 'flex'};
    justify-content: flex-start;
    flex: 1;
    min-width: 31%;
    min-width: 300px;
    height: ${props => props.title === 'NFTs' ? 'fit-content' : 'auto'};
    ${({ theme }) => theme.mediaWidth.sm`
        min-width: 275px;
    `};
    ${({ theme }) => theme.mediaWidth.xs`
        width: 100%;
    `};
`