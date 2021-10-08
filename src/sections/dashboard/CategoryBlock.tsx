import { Block, Text } from 'components';
import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { FlexRowSpaceBetween } from 'styles/components';
import { CellRow } from '.';
const CategoryBlockComponent = ({ title, categoryData, assetData, display, preset }) => {

    const theme = useTheme();

    return (
        <CategoryBlock display={display} variant="dashboard" color={theme.bg} width="375px">
            <FlexRowSpaceBetween width="100%">
                <Text variant="block-title" color="white" margin="0 0 5px 0">{title}</Text>
                <Text variant="block-title" color="white" margin="0 0 5px 0">{(categoryData < 0.5) ? "< 0.5" : categoryData?.toFixed(2)}%</Text>
            </FlexRowSpaceBetween>
            {
                assetData &&
                Object.entries(assetData).sort((a: any, b: any) => preset == 10 ? b[1].percentage - a[1].percentage : a[1].percentage - b[1].percentage).map((asset, index) => {
                    if(asset[0] != 'groupedAssets'){
                        return (
                            <CellRow key={index} value={asset[1]} preset={preset} />
                        )
                    }
                })
            }
            {
                assetData?.groupedAssets && (
                    <CellRow value={assetData.groupedAssets} preset={preset} />
                )
            }
        </CategoryBlock>
    );
}

export default CategoryBlockComponent;

const CategoryBlock = styled(Block) <{ display?: boolean }>`
    margin: 10px;
    display: ${props => props.display ? 'none' : 'flex'};
    justify-content: flex-start;
    flex: 1;
    min-width: 31%;
    /* max-width: 80%; */
    min-width: 250px;
    height: fit-content;
`