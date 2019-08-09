import React from "react";
import App from "./App";
import { KeepAwake, registerRootComponent, Constants } from "expo";

const { manifest } = Constants

export const API_BASE = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? "http://" + manifest.debuggerHost.split(`:`).shift().concat(`:8080`)
  : `api.example.com`

console.log(`API_BASE: ${API_BASE}`)

if(__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(App);