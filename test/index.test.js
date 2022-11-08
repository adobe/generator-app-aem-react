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

const helpers = require('yeoman-test')
const assert = require('yeoman-assert')
const fs = require('fs')
const path = require('path')
const cloneDeep = require('lodash.clonedeep')

const reactApp = require('../src/index')
const Generator = require('yeoman-generator')

describe('prototype', () => {
  test('exports a yeoman generator', () => {
    expect(reactApp.prototype).toBeInstanceOf(Generator)
  })
})

const prevEnvContent = 'MOCK_ENV=testme'

describe('run', () => {
  test('test AEM react SPA generator', async () => {
    const options = cloneDeep(global.basicGeneratorOptions)
    // const options = { 'skip-prompt': true }
    options['project-name'] = 'abc'
    await helpers.run(reactApp)
      .withOptions(options)
      .inTmpDir((dir) => {
        fs.writeFileSync(path.join(dir, '.env'), prevEnvContent)
      })
    
    // dependencies
    assertDependencies(
      fs,
      {
        '@adobe/aem-headless-client-js': expect.any(String),
        'buffer': expect.any(String),
        'process': expect.any(String),
        'querystring-es3': expect.any(String),
        'react': expect.any(String),
        'react-currency-format': expect.any(String),
        'react-dom': expect.any(String),
        'react-router-dom': expect.any(String),
        'util': expect.any(String),
      },
      {
        '@babel/core': expect.any(String),
        '@babel/polyfill': expect.any(String),
        '@babel/preset-env': expect.any(String),
        '@babel/plugin-transform-react-jsx': expect.any(String),
        '@parcel/packager-raw-url': expect.any(String),
        '@parcel/transformer-sass': expect.any(String),
        '@parcel/transformer-svg-react': expect.any(String),
        '@parcel/transformer-webmanifest': expect.any(String),
        'node-sass': expect.any(String),
        'normalize-scss': expect.any(String),
      }
    )

    // .env file
    assert.fileContent('.env', prevEnvContent)
    assert.fileContent('.env', 'REACT_APP_HOST_URI')
    assert.fileContent('.env', 'REACT_APP_GRAPHQL_ENDPOINT')

    // added files
    assert.file('web-src/index.html')
    assert.file('web-src/src/index.js')
    assert.file('web-src/src/App.js')
    assert.file('web-src/src/components/Home.js')
  })
})
