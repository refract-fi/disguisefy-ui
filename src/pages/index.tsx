import { Button, Modal, Text } from "components";
import { TextInput } from "components";
import { ChangeEvent, useEffect, useState } from "react";
import styled, { useTheme } from 'styled-components';
import { FlexCentered, FlexCol, FlexColCentered } from "styles/components";
import { isAddress } from '@ethersproject/address'
import axios from 'axios';
import { Form, Help } from "sections/home";
import { isENS } from "functions/isENS";
import Spinner from "components/Spinner";
import { provider } from "utils/provider";

export default function Home() {

  const [form, setForm] = useState({
    address: null,
    name: '',
    duration: 3600,
    preset: null,
    groupAssetsUnder: 0.1,
    isAssetGroupActive: false,
    ignoreNFTs: false
  })
  const [formActive, setFormActive] = useState(false)
  const [durationValue, setDurationValue] = useState(0)
  const [url, setUrl] = useState('')
  const [active, setActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [helpActive, setHelpActive] = useState(false)
  const [awaitingLink, setAwaitingLink] = useState(false)
  const [awaitingENSResolve, setAwaitingENSResolve] = useState(false)

  const onDisguiseClick = async () => {
    setErrorMsg('')
    setHelpActive(false)
    if (isAddress(form.address)) {
      setFormActive(true)
    } else {
      setAwaitingENSResolve(true)
      let resolvedAddress = await isENS(form.address)
      if (resolvedAddress) {
        setForm({ ...form, address: resolvedAddress })
        setAwaitingENSResolve(false)
        setFormActive(true)
      } else {
        setErrorMsg('Not a valid address')
        setAwaitingENSResolve(false)
      }
    }
  }

  const onHelpClick = () => {
    setFormActive(false)
    setErrorMsg('')
    setHelpActive(true)
  }

  const onResetClick = () => {
    setFormActive(false)
    setForm({
      address: null,
      name: '',
      duration: 3600,
      preset: null,
      groupAssetsUnder: 0.1,
      isAssetGroupActive: false,
      ignoreNFTs: false
    })
    setActive(false)
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }


  const postForm = async (resolvedAddress?: string) => {
    setAwaitingLink(true)
    axios.post('/api/disguise', {
      address: resolvedAddress ? resolvedAddress : form.address,
      name: form.name,
      duration: form.duration,
      preset: form.preset
    }).then(function (response) {
      setUrl(response.data.url)
      setAwaitingLink(false)
      setActive(true)
    }).catch(function (error) {
      setAwaitingLink(false)
      console.log(error);
    });
  }

  const onFormSubmit = async () => {
    setErrorMsg(null)
    setAwaitingLink(true)
    if (form.name.length > 36) {
      console.log("[ERROR] Name is too long")
      setErrorMsg("Name is too long")
      setAwaitingLink(false)
      return;
    }
    if (!form.preset) {
      console.log("[ERROR] No Privacy Level Selected")
      setErrorMsg("No Privacy Level Selected")
      setAwaitingLink(false)
      return;
    }
    if (isAddress(form.address)) {
      postForm()
    } else {
      let resolvedAddress = await isENS(form.address)
      if (resolvedAddress) {
        postForm(resolvedAddress)
      } else {
        setErrorMsg('Not a valid address')
        setAwaitingLink(false)
      }
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
      <Modal active={active} setActive={setActive} url={url} onResetClick={onResetClick} />
      <Wrapper>
        <Content>
          <Text
            variant="title"
            align="center"
            width="wide"
            margin="0 0 10px 0">
            Conceal your Wealth, Share your Choices
          </Text>
          <TextInputWrapper>
            <TextInput
              placeholder="0x...*"
              // value={form.address}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, address: event.target.value })}
              width="100%"
            />
            {
              awaitingENSResolve &&
              <SpinnerWrapper>
                <Spinner variant="textinput" />
              </SpinnerWrapper>
            }
          </TextInputWrapper>
          <Button width="wide" margin="12px 0 0 0" onClick={() => onDisguiseClick()} disable={formActive && true}>Disguisefy</Button>
          <Button variant="underline" onClick={() => onHelpClick()}>What is dis?</Button>
          {
            <ErrorText color={"red"}>{(errorMsg && !formActive) && errorMsg}</ErrorText>
          }
          {
            formActive && (
              <Form
                form={form}
                setForm={setForm}
                setFormActive={setFormActive}
                durationValue={durationValue}
                onFormSubmit={onFormSubmit}
                awaitingLink={awaitingLink}
                errorMsg={errorMsg}
              />
            )
          }
          {
            helpActive && (
              <Help setHelpActive={setHelpActive} />
            )
          }
        </Content>
      </Wrapper>
    </>
  )
}

const Wrapper = styled(FlexCentered)`
  min-height: calc(100vh - 120px);
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
  padding-bottom: 100px;
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
  top: 0;
  display: flex;
  align-items: center;
  right: 0;
  padding-right: 10px;
`