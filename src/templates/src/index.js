/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ModelManager } from "@adobe/aem-spa-page-model-manager";
import CustomModelClient from "./CustomModelClient";

// Initialize the ModelManager before invoking ReactDOM.render(...).
const modelClient = new CustomModelClient(process.env.REACT_APP_HOST_URI);
ModelManager.initializeAsync({modelClient});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
