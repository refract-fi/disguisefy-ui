import { Button, Text, TextInputDropdown } from "components";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { FlexCentered, FlexCol, FlexColCentered } from "styles/components";
import { isAddress } from '@ethersproject/address'
import axios from 'axios';
import { FormModal, Help, LinkModal } from "sections/home";
import { isENS } from "functions/isENS";
import Spinner from "components/Spinner";
import IForm from "utils/interface/form";

export default function Home() {

  const [form, setForm] = useState<IForm>({
    address: [''],
    name: '',
    duration: 3600,
    preset: null,    
    type: "All",
    chains: ["All"],
    groupAssetsUnder: 0.1,
    isGroupAssetsUnder: false,
    ignoreNFTs: false,
    showNFTCollections: false,
    isSnapshot: false
  })

  const [formActive, setFormActive] = useState(false)
  const [durationValue, setDurationValue] = useState(0)
  const [url, setUrl] = useState('')
  const [active, setActive] = useState(false)
  const [formMsg, setFormMsg] = useState(null)
  const [helpActive, setHelpActive] = useState(false)
  const [awaitingLink, setAwaitingLink] = useState(false)
  const [awaitingENSResolve, setAwaitingENSResolve] = useState(false)

  const onDisguiseClick = async () => {
    setFormMsg('')
    setHelpActive(false)
    if (form.address.every(isAddress)) {
      setFormActive(true)
    } else {
      setAwaitingENSResolve(true)
      for (let address of form.address) {
        if (isAddress(address)) {
          console.log("Valid Address")
        } else if (address === '') {
          setFormMsg('You have an empty input')
          setAwaitingENSResolve(false)
          return;
        } else {
          let resolvedAddress = await isENS(address)
          if (!resolvedAddress) {
            setFormMsg(`${address} is not a valid address or ENS`)
            setAwaitingENSResolve(false)
            return;
          }
        }
      }
      await setAwaitingENSResolve(false)
      await setFormActive(true)
    }
  }

  const onHelpClick = () => {
    setFormActive(false)
    setFormMsg('')
    helpActive ? (
      setHelpActive(false)
    ) : (
      setHelpActive(true)
    )
  }

  const onResetClick = () => {
    setFormMsg('')
    setFormActive(false)
    setForm({
      address: [""],
      name: '',
      duration: 3600,
      preset: null,
      type: "All",
      chains: ["All"],
      groupAssetsUnder: 0.1,
      isGroupAssetsUnder: false,
      ignoreNFTs: false,
      showNFTCollections: false,
      isSnapshot: false
    })
    setActive(false)
    // Array.from(document.querySelectorAll("input")).forEach(
    //   input => (input.value = "")
    // );
  }

  const postForm = async (addressArray: Array<string>) => {
    setFormMsg(null)
    setAwaitingLink(true)
    setTimeout(() => {
      setFormMsg("Don't worry, this can take a few seconds");
    }, 3500)
    axios.post('/api/disguise', {
      address: addressArray,
      name: form.name,
      duration: form.duration,
      preset: form.preset,
      type: form.type,
      chains: form.chains.map(chain => chain.toLowerCase()),
      isGroupAssetsUnder: form.isGroupAssetsUnder,
      groupAssetsUnder: form.groupAssetsUnder,
      ignoreNFTs: form.ignoreNFTs,
      showNFTCollections: form.showNFTCollections,
      isSnapshot: form.isSnapshot
    }).then(function (response) {
      setUrl(response.data.url)
      setAwaitingLink(false)
      setActive(true)
      setFormMsg(null)
    }).catch(function (error) {
      setAwaitingLink(false)
      setFormMsg('Error: Could not create link, please try again')
    });
  }

  const onFormSubmit = async () => {
    setFormMsg(null)
    setAwaitingLink(true)
    if (form.name.length > 36) {
      console.log("[ERROR] Name is too long")
      setFormMsg("Name is too long")
      setAwaitingLink(false)
      return;
    }
    if (!form.preset) {
      console.log("[ERROR] No Privacy Level Selected")
      setFormMsg("No Privacy Level Selected")
      setAwaitingLink(false)
      return;
    }
    if (form.address.every(isAddress)) {
      postForm(form.address)
    } else {
      let addressArray = []
      let index = 0
      for (let address of form.address) {
        index += 1
        if (isAddress(address)) {
          addressArray.push(address)
        } else if (address == '') {
          console.log('Empty String removed')
        } else {
          let resolvedAddress = await isENS(address)
          if (!resolvedAddress) {
            setFormMsg(`${address} is not a valid address or ENS`)
            setAwaitingLink(false)
            return;
          } else {
            addressArray.push(resolvedAddress)
          }
        }
      }
      postForm(addressArray)
    }
  }

  const getCurrentValue = (duration) => {
    let value;
    switch (duration) {
      case 3600:
        setDurationValue(0)
        break;
      case 86400:
        setDurationValue(20)
        break;
      case 172800:
        setDurationValue(40)
        break;
      case 604800:
        setDurationValue(60)
        break;
      case 1209600:
        setDurationValue(80)
        break;
      case 2592000:
        setDurationValue(100)
        break;
      default:
        return value
    }
  }
  useEffect(() => {
    getCurrentValue(form.duration)
  }, [form])

  return (
    <>
      <LinkModal active={active} setActive={setActive} url={url} onResetClick={onResetClick} />
      <Wrapper>
        <Content>
          <Text
            variant="title"
            align="center"
            width="wide"
            margin="0 0 17px 0">
            Conceal your Wealth, Share your Choices
          </Text>
          <TextInputWrapper>
            <TextInputDropdown
              form={form}
              setForm={setForm}
              onEnter={onDisguiseClick}
              variant="index"
            />
          </TextInputWrapper>
          <Button width="wide" margin="17px 0 0 0" onClick={() => onDisguiseClick()} disable={formActive && true}>Disguisefy</Button>
          <Button variant="underline" onClick={() => onHelpClick()}>What is dis?</Button>
          {
            awaitingENSResolve &&
            <SpinnerWrapper>
              <Spinner variant="textinput" />
            </SpinnerWrapper>
          }
          {
            <ErrorText color={"red"}>{(formMsg && !formActive) && formMsg}</ErrorText>
          }
          {
            helpActive && (
              <Help setHelpActive={setHelpActive} />
            )
          }
        </Content>
      </Wrapper>
      {
            formActive && (

                  <FormModal 
                  form={form}
                  setForm={setForm}
                  durationValue={durationValue}
                  onFormSubmit={onFormSubmit}
                  awaitingLink={awaitingLink}
                  onExit={onResetClick}
                  formMsg={formMsg}
                />
            )
          }
    </>
  )
}

const Wrapper = styled(FlexCentered)`
  min-height: 100vh;
  ${({ theme }) => theme.mediaWidth.sm`
        width: 90%;
        align-items: flex-start
  `};
  @media(min-height: 769px){

    ${({ theme }) => theme.mediaWidth.sm`
        align-items: center;
    `};
    }
`

const Content = styled(FlexCol)`
  width: 630px;
  position: relative;
  padding-bottom: 140px;
  @media (max-height: 768px){
      padding-bottom: 0px;
      padding-top: 150px;
  }
  @media (max-height: 600px){
      padding-bottom: 0px;
      padding-top: 100px;
  }
  ${({ theme }) => theme.mediaWidth.sm`
        width: 100%;
        padding-top: 100px;
  `};
`;

const ErrorText = styled(Text)`
  height: 14px;
  text-align: center;
`

const TextInputWrapper = styled.div`
  position: relative;
  width: 100%;
`
const SpinnerWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: 12px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding-right: 10px;
`
