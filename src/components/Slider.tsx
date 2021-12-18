import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import { Text, Tooltip } from 'components';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { FlexRow, FlexRowCentered } from 'styles/components';

const marks = [
    {
        value: 0,
        duration: moment.duration(1, 'h').asSeconds()
    },
    {
        value: 20,
        duration: moment.duration(24, 'h').asSeconds()
    },
    {
        value: 40,
        duration: moment.duration(1, 'w').asSeconds()
    },
    {
        value: 60,
        duration: moment.duration(1, 'M').asSeconds()
    },
    {
        value: 80,
        duration: moment.duration(1, 'y').asSeconds()
    },
    {
        value: 100,
        duration: null
    }
];

const SliderComponent = ({ duration, form, setForm }) => {

    const handleChange = (event: any, newValue: number | number[]) => {
        const index = marks.findIndex(object => object.value === newValue)
        if(index === 5){
            setForm({ ...form, duration: marks[index].duration, isSnapshot: true })
        } else {
            setForm({ ...form, duration: marks[index].duration, isSnapshot: false })
        }
    };

    return (
        <SliderWrapper isSnapshot={form.isSnapshot} duration={duration}>
            <Text size="1.2rem" margin="0 0 1rem 0">Link Duration</Text>
            <Slider
                defaultValue={40}
                aria-labelledby="discrete-slider"
                step={20}
                valueLabelDisplay="off"
                onChange={handleChange}
                color={duration ? 'primary' : 'secondary'}
            />
            <Text weight="bold">
                {
                    duration === null ?
                        <>
                            <FlexRow>
                                <Text variant="large">
                                    forever
                                </Text>
                                <Tooltip id="ipfs-tooltip" content="Trustless way to generate a link. You address is never stored anywhere. Beware, link can never be deleted!" />
                            </FlexRow>
                            <br />
                            <FlexRow>
                                <Text variant="normal">
                                    Portfolio data is taken once at link creation and stored in decentralized storage
                                </Text>
                            </FlexRow>
                        </>
                        :
                        <>
                                <Text variant="large">
                                    {moment.duration(duration, 'seconds').humanize()}
                                </Text>
                            <br />

                            <Text variant="normal">
                                Portfolio data is real-time and stored in an encrypted centralized database
                            </Text>
                        </>
                }
            </Text>
        </SliderWrapper>
    );
}

export default SliderComponent;

const SliderWrapper = styled.div<{ isSnapshot: boolean, duration: number }>`
    width: 300px;
    ${({ theme }) => theme.mediaWidth.sm`
        width: 250px;

    `};
    .MuiSlider-colorPrimary{
        color: ${({ theme }) => theme.accent};;
    }
    .MuiSlider-colorSecondary{
        color: #49ceef;
    }
    ${props => props.duration === 604800 &&
        css`
            .MuiSlider-track{
                width: 40% !important;
            }
            .MuiSlider-thumb{
                left: 40% !important;
            }
        `
    };
    
`;
const SnowIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`
