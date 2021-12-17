import { Button, Layout, Text, TextInputDropdown } from "components";
import { ReactElement, useEffect, useState } from "react";
import styled from 'styled-components';
import { FlexCentered, FlexCol, FlexColCentered } from "styles/components";
import { isAddress } from '@ethersproject/address'
import axios from 'axios';
import { Modal, Help } from "sections/home";
import { isENS } from "functions/isENS";
import Spinner from "components/Spinner";
import IForm from "utils/interface/form";

export default function Home() {

  const [form, setForm] = useState<IForm>({
    address: [''],
    name: '',
    duration: 604800,
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
    setFormActive(true)
    setForm({
      address: [""],
      name: '',
      duration: 604800,
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
  }

  const onExitClick = () => {
    setFormMsg('')
    setFormActive(false)
    setForm({
      address: [""],
      name: '',
      duration: 604800,
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
      // type: form.type,
      chains: form.chains.map(chain => chain.toLowerCase()),
      isGroupAssetsUnder: form.isGroupAssetsUnder,
      groupAssetsUnder: form.groupAssetsUnder,
      ignoreNFTs: form.ignoreNFTs,
      showNFTCollections: form.showNFTCollections,
      isSnapshot: form.isSnapshot,
      assetCategories: ["all"]
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
    if (form.address.every((address) => address == "")) {
      console.log("[ERROR] All address inputs are empty")
      setFormMsg("Please input at least one address")
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

  return (
    <>
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
          <Modal
            form={form}
            setForm={setForm}
            onFormSubmit={onFormSubmit}
            awaitingLink={awaitingLink}
            onExit={onExitClick}
            onReset={onResetClick}
            formMsg={formMsg}
            linkActive={active}
            setLinkActive={setActive}
            url={url}
          />
        )
      }
      </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

const Wrapper = styled(FlexCentered)`
  min-height: 100vh;
  min-width: 225px;
  ${({ theme }) => theme.mediaWidth.sm`
        width: 85%;
        align-items: flex-start;
  `};
  ${({ theme }) => theme.mediaWidth.md`
        width: 80%;
  `};
  ${({ theme }) => theme.mediaWidth.xs`

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
