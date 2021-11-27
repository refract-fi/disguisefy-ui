import { FC } from "react";
import { useTheme } from "styled-components";
import MobileLineWrapper from './MobileLineWrapper';

interface MobileBarChartProps {
    data: any
}

const MobileBarChartComponent: FC<MobileBarChartProps> = ({ data }) => {

    return (
        <>
            {
                data &&
                Object.entries(data).map((entry, index) => {
                    let object: any = entry[1]
                    if (object.percentage > 0.1 && entry[0] !== 'notUsed' && entry[0] !== 'others') {
                        return (
                            <MobileLineWrapper
                                title={object.title}
                                color={object.color}
                                percentage={object.percentage}
                                variant={entry[0]}
                                key={index}
                            />
                        )
                    }
                })
            }
        </>
    );
}

export default MobileBarChartComponent;

