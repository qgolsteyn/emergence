import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const url = new URL(location.href);
const codeString = url.searchParams.get("code");

const code = codeString == null ? 22 : parseInt(codeString, 10);

ReactDOM.render(<App code={code} />, document.getElementById(
  "root"
) as HTMLElement);
