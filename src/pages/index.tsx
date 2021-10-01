import { Button, Modal, Text } from "components";
import { TextInput } from "components";
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import styled, { useTheme } from 'styled-components';
import { FlexCentered, FlexCol, FlexColCentered } from "styles/components";
import { isAddress } from '@ethersproject/address'
import axios from 'axios';
import { Form, Help } from "sections/home";
import { isENS } from "functions/isENS";
import Spinner from "components/Spinner";
import Index from "pageComponents/Home";
import Dashboard from "pageComponents/Dashboard";

export default function Home() {

  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/:id" children={<Dashboard />} />
        </Switch>
      </HashRouter>
    </>
  )
}