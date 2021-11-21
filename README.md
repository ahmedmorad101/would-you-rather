# Would you rather

Would you rather is a small web app that lets a user play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”

## Installation

install all project dependencies with
```bash
npm install
```
start the development server with
```bash
npm start
```
## Project Structure

```bash
├── App.js
├── assets
│   └── css
│       └── style.css
├── components
│   ├── NoQuestions.js
│   └── QuestionContent.js
├── data
│   └── _users.js
├── index.js
├── pages
│   ├── Home.js
│   ├── Layout.js
│   ├── Leaderboard.js
│   ├── Login.js
│   ├── NewPoll.js
│   ├── NotFound.js
│   ├── Question.js
│   ├── Questions.js
│   └── RequiredAuth.js
├── reportWebVitals.js
├── setupTests.js
├── src.txt
└── store
    ├── actions.js
    ├── index.js
    ├── reducer.js
    └── types.js
```

## Packages 

- [Semantic UI React](https://react.semantic-ui.com/)
    - installation :
        `npm install semantic-ui-react semantic-ui-css`
    - add the following line to index.js 
        `import 'semantic-ui-css/semantic.min.css'`

- [React Router](https://reactrouter.com/)
    `npm install react-router-dom@6`

- [React Redux](https://react-redux.js.org/)
    `npm install react-redux redux`

