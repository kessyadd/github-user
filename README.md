# Github Repositories Explorer

This is a simple Github Repositories Explorer built using React and Typescript. The application allows users to search for GitHub user by entering a GitHub username. The search results display list of GitHub users along with their repositores.

## Getting Started

To use the application, you will need to provide a GitHub personal access token. This can be done by creating a `.env` file in the root directory of the project and adding the following line:

```
REACT_APP_TOKEN=your_access_token_here
```

To obtain a Github personal access token, please refer to the [official documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Once you have provided your personal access token, you can start the application by running the following commands in the project directory:

```
npm install
npm start
```

This will start the application on [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Search for GitHub user along with their repositories on Github by entering a GitHub username
- Display list of GitHub users along with their repositores
- Pagination support to display 5 search result per page

## Technology Used

- React
- Typescript
- Redux Toolkit
- Ant Design

## Live Demo

You can see a live demo of the application at https://github-user-five.vercel.app/
