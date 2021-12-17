import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import { Text } from 'components';
import moment from 'moment';
import styled from 'styled-components';

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
        setForm({...form, duration: marks[index].duration})
    };

    console.log(form.duration)

    return (
        <SliderWrapper>
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
                    'forever'
                    :
                    moment.duration(duration, 'seconds').humanize()
                }
                </Text>
        </SliderWrapper>
    );
}

export default SliderComponent;

const SliderWrapper = styled.div`
    width: 250px;
    .MuiSlider-colorPrimary{
        color: ${({ theme }) => theme.accent};;
    }
    .MuiSlider-colorSecondary{
        color: #49ceef;
    }
`;