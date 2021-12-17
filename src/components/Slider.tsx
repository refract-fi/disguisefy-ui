import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import { Text } from 'components';
import moment from 'moment';
import styled from 'styled-components';
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
        duration: moment.duration(48, 'h').asSeconds()
    },
    {
        value: 60,
        duration: moment.duration(1, 'w').asSeconds()
    },
    {
        value: 80,
        duration: moment.duration(2, 'w').asSeconds()
    },
    {
        value: 100,
        duration: moment.duration(1, 'M').asSeconds()
    }
];

const StyledSlider = withStyles({
    root: {
        color: '#EF4950',
        height: 4,
    },
    thumb: {
        height: 18,
        width: 18,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -7,
        marginLeft: 0,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 4,
    },
    rail: {
        height: 4,
        borderRadius: 4,
    },
    mark: {
        height: 0,
        width: 0,
    },
})(Slider);

const SliderComponent = ({ duration, form, setForm, durationValue }) => {

    const handleChange = (event: any, newValue: number | number[]) => {
        const index = marks.findIndex(object => object.value === newValue)
        setForm({ ...form, duration: marks[index].duration })
    };

    return (
        <SliderWrapper isSnapshot={form.isSnapshot}>
            <Text size="1.2rem" margin="0 0 1rem 0">Link Duration</Text>
            {
                form.isSnapshot ?
                    <FlexRowCentered>
                        <SnowIcon src="/static/snow.svg" />
                        <Text variant="normal" weight="bold" color="lightblue">Links hosted on IPFS can't be deleted and last forever.</Text>
                    </FlexRowCentered>
                    :
                    <>
                        <StyledSlider
                            defaultValue={durationValue}
                            aria-labelledby="discrete-slider"
                            step={20}
                            valueLabelDisplay="off"
                            onChange={handleChange}
                        />
                        <Text weight="bold">{moment.duration(duration, 'seconds').humanize()}</Text>
                    </>
            }

        </SliderWrapper>
    );
}

export default SliderComponent;

const SliderWrapper = styled.div<{ isSnapshot: boolean }>`
    width: ${props => props.isSnapshot ? '100%' : '250px'};;
`;

const SnowIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`