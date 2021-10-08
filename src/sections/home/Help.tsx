import { Block, Bold, ExitButton, Logo, Text } from 'components';
import React from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import Link from 'next/link';

const HelpComponent = ({ setHelpActive }) => {
    const levels = [
        {
            name: 'Level 1',
            details: 'Discloses all your holdings with their percentages'
        },
        {
            name: 'Level 2',
            details: 'Discloses all your holdings with the percentages of their category, your assets are shown, but not weighted to the total of your portfolio'
        },
        {
            name: 'Level 3',
            details: 'Discloses stats related to your portfolio (in dev)'
        },
        {
            name: 'Level 4',
            details: 'Discloses stats with a deviation (in dev)'
        }
    ]

    return (
        <Help>
            <StyledBlock>
                <ExitButton onClick={() => setHelpActive(false)} src="/exit.svg" />
                <Text margin="2px 0 15px 0" variant="subtitle" color="black">What is Disguisefy?</Text>
                <Text variant="normal" width="100%" color="black" align="justify">Disguisefy allows you to share your portfolio without revealing your address or your net worth. You can select from multiple levels, ranging from low privacy to high privacy:</Text>
                <br />
                {
                    levels.map((level) => {
                        return (
                            <LevelRow margin="2px 0 2px 0">
                                <LevelName variant="normal" width="fit-content" color="black" weight="bold">- {level.name}:</LevelName>
                                <Text align="justify" variant="normal" color="black">{level.details}</Text>
                            </LevelRow>
                        )
                    })
                }
                <br />
                <Text variant="normal" color="black" align="justify">All the data manipulations are done in the back-end. The higher the privacy level, the harder it is to reverse search your address.</Text>
                <StyledRow margin="20px 0 0 0">
                    <div>
                        <a target="_blan" href="https://github.com/disguisefy">
                            <Logo src="github_black.svg" />
                        </a>
                        <a target="_blan" href="https://twitter.com/disguisefy">
                            <Logo src="twitter_black.svg" marginLeft={true} />
                        </a>
                        <a target="_blan" href="https://discord.gg/Jn6aZEkvRd">
                            <Logo src="discord_black.svg" marginLeft={true} />
                        </a>
                    </div>
                    <ZapperLogo src="zapper.svg" />
                </StyledRow>
            </StyledBlock>
        </Help>
    );
}

export default HelpComponent;

const Help = styled.div`
  position: absolute;
  width: 630px;
  top: 175px;
  margin-bottom: 25px;
  @media (max-height: 768px){
      position: relative;
      top: 0px;
  }
  ${({ theme }) => theme.mediaWidth.sm`
        margin-top: -15px;
        width: 100%;
  `};
    @media(min-height: 769px){
    ${({ theme }) => theme.mediaWidth.sm`
        top: 275px;
    `}
    }
`

const ZapperLogo = styled.img`
    width: 150px;
`

const StyledRow = styled(FlexRowSpaceBetween) <{ margin?: string }>`
    width: 100%;
    margin-top: ${props => props.margin ? props.margin : '10px'};
`

const LevelRow = styled(FlexRow)`
    justify-content: flex-start;
    width: 100%;
`

const LevelName = styled(Text)`
    min-width: 65px;
    ${({ theme }) => theme.mediaWidth.sm`
    min-width: 58px;
    `};
`

const StyledBlock = styled(Block)`
    padding: 20px 30px;
    ${({ theme }) => theme.mediaWidth.sm`
        padding: 20px 20px;
    `}
`