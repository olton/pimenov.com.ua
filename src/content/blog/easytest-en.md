---
title: Easytest - JavaScript and TypeScript testing without detachment!
date: 2024-10-03
cover: {
    src: /images/testing.svg
}
category: "QA"
tags: ["javascript", "typescript", "easytest", "testing"]
sort: 1
slug: easytest-welcome-en
draft: false
---

> EasyTest on GitHub: https://github.com/olton/easytest

Author's website: https://pimenov.com.ua
EasyTest repository: https://github.com/olton/easytest

## Introduction

In this article, I'll talk about my own JavaScript/TypeScript testing framework that helps me ease the testing process and ensure high code quality. We will consider the main features of the framework, its architecture and examples of use.

<!-- -->

## Prerequisites for creation

Why did I decide to create my own framework? I write a lot of code in JavaScript, so it needs to be tested somehow. Of course, you will say that there are already JEST, VITEST and others. But I wanted to create my own! First, it is a great way to improve your JavaScript skills, and secondly, understanding how such frameworks work "under the hood" can greatly help in planning testing of your own code. Well, in general - can I?

## Functional planning

The first thing to start any project with is planning its functionality. What I wanted to see in my framework:

**Types of tests**

- Unit tests
- Integration tests

**Functional capabilities**

1. Easy to get started with the framework (config free)
2. Testing JavaScript and TypeScript code without any hassle
3. Testing asynchronous code
4. Testing HTML objects (Document, HTMLElement, …)
5. Mocking (functions and objects)
6. Many expectations (expect) in one test - the test is considered completed if all expectations have completed without errors.
7. A large number of built-in matchers (checking functions)
8. Ability to expand the list of available matchers directly in tests
9. Support for standard functions describe, it, test, and expect
10. Support for Setup and Teardown functions (beforeEach, beforeAll, afterEach, afterAll)
11. Ability to generate a code coverage report (including the ability to interact with CODECOV)
12. Ability to write tests in both JS and TS and combine them in one project

## Framework architecture

The framework will contain several structural components:

- Creator of the test execution queue
- Tester
- Assertion module
- Mocking tools
- A profiler for generating a test code coverage report
- Reporter for generating a code coverage report in LCOV format

#### Creator of the test execution queue

The framework starts its work by creating a test execution queue. An execution context is created for each test file, in which setup and teardown functions are added for each set of tests and individual tests. According to their purpose, these functions are:

- beforeAll - execute code before all tests
- beforeEach - execute the code before each test
- afterEach - execute the code after each test
- afterAll - execute code after all tests

**beforeAll** will be executed both at the beginning of the file and at the beginning of the test suite, depending on where it is declared.

```javascript
    beforeAll(() => {
        // Буде виконано на початку файла
    })


    describe(``, () => {
        beforeAll(() => {
            // Буде виконано на початку набора тестів
        })


        it(...)
    })
```

**beforeEach** will be executed before all tests in the file if it is declared at the beginning of the file, or before each test in the set if it is declared in the middle of the **describe** function.

```javascript
    beforeEach(() => {
        // Буде виконано перед кожним тестом в файлі
    })


    describe(``, () => {
        beforeEach (() => {
            // Буде виконано перед кожним тестом 
            // в поточному наборі тестів
        })


        it(...)
    })
```

**afterEach** will be executed after all tests in the file if it is declared at the beginning of the file, or after each test in the set if it is declared in the middle of the describe function.

**afterAll** will be executed either after the tests in the set or at the end of the file.

Calls to these functions can be combined in one file both globally and locally for a specific **describe**.

The queue builder ensures that tests and install and uninstall functions are executed exactly in the order they are specified.

#### Tester

After the execution queue is created, it is passed to the test runner for execution. The tester executes the tests, taking into account the functions of installation and disassembly. Each test is a set of expectations that must be fulfilled. Failure to fulfill any expectation (expect) leads to termination of further processing of the corresponding test (it, test).

#### Assertion module

The test runner uses calls to the Assertion module to calculate expectations. Triggering the wait is used using the expect function, passing to this function the value to be checked. The expect function returns an Expect object that contains a set of matchers - verification functions. Validation functions can take a control value to match against and a custom message if the validation fails. Currently, the Expect object contains more than 100 built-in validation functions. This is both a simple comparison, and a strict one, and checking the structures of objects and checking arrays (for example, for uniqueness). By the way, if these functions are not enough for you, you can easily add your own. More on that later.

If the validation fails, the validation function generates a Throw exception with the appropriate message and the values ​​that were mapped and terminates the execution of the current test and this test is now considered to have failed.

#### Mocking tools

Mocking functions greatly simplify the testing of related code by providing the ability to erase the actual implementation of the function, record calls to the function (and the parameters passed to it), record the instances returned by the constructor function called with the new operator, and specify the values ​​that the function should return during testing.

Currently, the framework supports the creation of a mock function using the mocker() factory method. With the help of these functions, you can test calls and passing parameters.

```javascript
    describe(`Test mocking`, () => {
        const mock = mocker()
        mock()
        expect(mock).toHaveBeenCalled()
    })
```

#### Profiler-generator of code coverage test report

If the test code coverage report generation function is enabled using the coverage parameter (cli argument --coverage), the framework generates a quantitative code coverage report after the tests are executed. The built-in reporter will create a report file in LCOV format. Which can, for example, be loaded into CODECOV.

The profiler uses the node:inspector module in its work. The node:inspector module provides an API to interact with the V8 inspector. Which in turn makes it possible to get a report on the use of the code under test.

After the profiler has generated a coverage report, this report is passed to the LCOV file generation module. The generated file can be used with any code coverage analysis tool that can handle the LCOV format, such as CODECOV.

### Installation
To install the framework, you need to execute the command:

```shell
npm i -D @olton/easytest
```

### Using
Let's create the first simple test (for example, in the __tests__/simple.test.js directory)

```javascript
import { describe, it, expect } from '@olton/easytest';

describe('My Tests', () => {
   it('should 1 === 1', () => {
       expect(1).toBe(1);
   });
});
```

### Configuration

EasyTest is designed as a config-free framework, that is, it does not require the creation of a configuration file for its work. By default, the following parameters are used:

```json
{
   include: [
"**/*.spec.{t,j}s", 
"**/*.spec.{t,j}sx", 
"**/*.test.{t,j}s", 
"**/*.test.{t,j}sx"
   ],
   exclude: ["node_modules/**"],
   coverage: false,
   verbose: false,
   report: {
       type: "lcov",
       dir: "coverage",
   }
}
```

To change the default setting, you can create a configuration file with the name easytest.json (or any other name, but then you need to tell the framework about it with the cli argument --config).

### Run tests
To start tests, you need to execute the command:

```shell
npx easytest
```

or add to package.json

```json
{
    “scripts”: {
        “test”: “easytest”
    }
}
```

and then use the command:

```shell
npm test
```

### Command line arguments

- --config=config_file_name.json - the path to the custom configuration file
- --verbose - verbose or detailed execution log (currently output is to the console)
- --coverage - generate a code coverage report with tests
- --test - run only tests whose name matches the specified pattern
- --include=’...’ - where to look for tests
- --exclude='...' - which files or folders to ignore when searching for tests

### TypeScript support

To add support for testing TypeScript code and creating TypeScript tests, you need to install the tsx module.

```shell
npm i -D tsx cross-env
```

> **cross-env** will add the ability to set the NODE_OPTIONS variable cross-platform.

To use the capabilities of tsx, you need to add the NODE_OPTIONS environment variable with the value “–import tsx”. Change the easytest startup command:

```json
{
    “scripts”: {
        “test”: “cross-env NODE_OPTIONS=\"--import tsx\" easytest”
    }
}
```
That's all you need to do to test code written in TypeScript and write tests in TypeScript.

### Uploading the report to an external resource

Below is a GitHub automation example for automatically testing code when pushed and uploading a report to CODECOV:

```yaml
name: Run tests and upload coverage


on:
 push


jobs:
 test:
   name: Run tests and collect coverage
   runs-on: ubuntu-latest
   strategy:
     matrix:
       node-version: [ '22.x' ]
   steps:
     - name: Checkout
       uses: actions/checkout@v4
       with:
         fetch-depth: 0
     - name: Set up Node
       uses: actions/setup-node@v4
       with:
         node-version: ${{ matrix.node-version }}
     - name: Install dependencies
       run: npm install
     - name: Run tests
       run: easytest --coverage
     - name: Upload results to Codecov
       uses: codecov/codecov-action@v4
       with:
         token: ${{ secrets.CODECOV_TOKEN }}
```

Result on CODECOV


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5di92tvjirc9g8ubrf3s.jpg)

### Expanding functionality
If for some reason you lack built-in matchers (checking functions), you can easily add your own:

```javascript
  import {Expect, ExpectError} from "@olton/easytest";


  class MyExpect extends Expect {
   toBeEven() {
       let received = this.received
       let result = received % 2 === 0
       if (!result) {
           throw new ExpectError(`Expected ${received} to be even`, ‘toBeEven’, received, ‘Even’)
       }
   }
  }


  const expect = (received) => new MyExpect(received)


  test(`Custom expect`, () => {
   expect(2).toBeEven()
  })
```

### Testing HTML UI
You can use `EasyTest` to test UI components. In this example, I test the Metro UI accordion component:
```javascript
import fs from "fs";
import {beforeAll, describe, it, expect} from "@olton/easytest";

beforeAll(() => {
    window.METRO_DISABLE_BANNER = true;
    window.METRO_DISABLE_LIB_INFO = true;
    document.body.innerHTML = `
    <div id="accordion">
        <div class="frame">
            <div class="heading">Heading</div>
            <div class="content">Content</div>
        </div>
    </div>
`

    window.eval(fs.readFileSync('./lib/metro.js', 'utf8'))
})

describe(`Accordion tests`, () => {
    it(`Create accordion`, async () => {
        const accordion = window.Metro.makePlugin("#accordion", 'accordion')[0]
        expect(accordion).hasClass('accordion')
    })
})
```

**Examples of tests**

https://github.com/olton/easytest/tree/master/__tests__
Result

### Final
The project turned out to be very interesting, it allowed me to gain new knowledge and deepen my existing skills in JavaScript.

---

Link to GitHub - https://github.com/olton/easytest
Author's website: https://pimenov.com.ua

---

The project is currently under active development.