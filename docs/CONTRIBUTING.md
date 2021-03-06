# Contributing to BabiaXR

This guide collects information about how to deploy babiaXR locally, how to create a new component and add it to the babiaXR set and how to create the distribution files.


> :warning: **IMPORTANT**  : BabiaXR is a set of A-Frame components based on [**Angle**](https://www.npmjs.com/package/angle), for further information, please visit the angle main page.


## Table of Contents

A high level overview of our contributing guidelines.

- [Contributing process to the project](#contributing-process-to-the-project)
    - [Team organization](#team-organization)
    - [Pending tasks](#pending-tasks)
    - [How to MR](#how-to-mr)
- [Deploy a dev server locally](#deploy-a-dev-server-locally)
- [Build distribution files](#build-distribution-files)
- [Develop code in BabiaXR](#develop-code-in-babiaxr)
- [Testing code in BabiaXR](#testing-code-in-babiaxr)


## Contributing process to the project

BabiaXR is an open-source project hosted on [GitLab](https://gitlab.com/babiaxr), all the information about the tasks, the repositories with the code and the webpage are there, if you are on GitHub, please visit https://gitlab.com/babiaxr.

### Team organization

The core developers organize the development using springs of two weeks of duration, each spring is defined as a Milestone of GitLab. In each milestone, some tasks will have done, and the organization of the tasks is the following:

- Topics/Subjects of the tasks are defined as issues in GitLab with the `Theme` tag.
- Epics are big and complex tasks that have smaller and defined subtasks as children, each epic has a topic assigned. Once all the tasks of an epic are resolved, the epic will be resolved as well. Are defined as issues in GitLab with the `Epic` tag.
- The common tasks are issues on GitLab and these issues depend on an epic or are a bug/feature.

#### Springs/Milestones

Please, for further information about the Springs, go to the [RELEASE_NOTES.md](https://gitlab.com/babiaxr/aframe-babia-components/-/blob/master/docs/RELEASE_NOTES.md) doc.

### Pending tasks

We follow a Kanban for each, hosted as a board on GitLab, in the "To Do" list there are the tasks that are prepared to do. In order to see the tasks related to the current spring/milestone, please filter by milestonse the kanban/tasks list:

- Kanban: https://gitlab.com/groups/babiaxr/-/boards
- Tasks list: https://gitlab.com/groups/babiaxr/-/issues

### How to MR

In order to submit a PR, please follow the next steps:

1. Fork the target repository of BabiaXR on GitLab.
2. Do the development/action.
3. Submit a Merge Request referring the task/issue if the development resolves it.

## Deploy a dev server locally

The steps to reproduce and deploy a dev server for developing babiaXR are:

1. Clone the repository:
    ```
    git clone https://gitlab.com/babiaxr/aframe-babia-components
    ```

2. Install the dependencies:
    ```
    cd aframe-babia-components
    npm install
    ```

3. Deploy the dev server:

    - Without SSL:
        ```
        npm run dev
        ```
        or
        ```
        npm start
        ```
    - With SSL:
        ```
        npm run ssldev
        ```

Each change in a file will automatically update the dev server.


## Build distribution files

In order to build a distribution release for babiaXR, just need to execute the next command:

```
npm run dist
```

The webpack service of [**angle**](https://www.npmjs.com/package/angle) will take the `index.js` file and will fetch the needed files and collect them into the distribution files.
Therefore, the command will generate two distribution files, `aframe-babia-components.js` and `aframe-babia-components.min.js` inside the `dist/` folder.


## Develop code in BabiaXR

In order to develop code for babia, e.g. a new component, you have to add it to the `index.js` file using `require` sintax:

```
// index.js file
...
require('your_file_path')
...
```

This is neccessary since the distribution files are based on the information of the `index.js` file (see [Build distribution files](#build-distribution-files) section
). Once the file is added, you can now deploy the dev server and 


## Testing code in BabiaXR

Currently, we use `cypress` testing runner.

Before starting the testing, you need to start the server (with SSL):
```
npm run ssldev
```

To start testing, execute the next command:
```
npm run test
```
This will run all the test that you'd created into `tests` folder. 

When a test file includes to create snapshot or videos, will save it into `/screenshots` and `/videos` folders.

While development, if you want to test some tests, you can run cypress using:
```
npm run devtest
```

If you want to test only one browser (`firefox` or `chrome`):
```
npm run test:firefox
```
or 
```
npm run test:chrome
```