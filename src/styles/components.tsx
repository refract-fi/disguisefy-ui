import styled from 'styled-components';

//--- Common Components ---//
export const Flex = styled.div<{ margin?: string, width?: string }>`
	display: flex;
	margin: ${props => props.margin && props.margin};
	width: ${props => props.width && props.width};
`;

export const FlexEnd = styled(Flex)`
	justify-content: flex-end;
`

export const FlexCentered = styled(Flex)`
	align-items: center;
	justify-content: center;
`;


export const FlexCol = styled(Flex)`
	flex-direction: column;
`;

export const FlexColCentered = styled(FlexCol)`
	align-items: center;
`;

export const FlexColAllCentered = styled(FlexCol)`
	align-items: center;
	justify-content: center;
`;

export const FlexRow = styled(Flex)`
    flex-direction: row;
`;

export const FlexRowSpaceBetween = styled(FlexRow)`
	justify-content: space-between;
`

export const FlexRowSpaceAround = styled(FlexRow)`
	justify-content: space-around;
`

export const FlexRowCentered = styled(FlexRow)`
	align-items: center;
`;

export const Grid = styled.div`
	display: grid;
`

export const Tablet = styled.div`
	display: block;
	${({ theme }) => theme.mediaWidth.sm`
		display: none;
	`};
`