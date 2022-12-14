# ESLint

- JavaScript에서 흔히 사용
  - 구문을 마킹하는 도구
- 코드 스타일 유지하는데 매우 큰 도움
- 확장된 포맷터

# Prettier

- 코드를 자동으로 포맷팅 해준다

# Jest-Dom을 위한 ESLint 설정

- npm install --save-dev eslint-plugin-testing-library
- npm install --save-dev eslint-plugin-jest-dom

## ESLINT + Prettier 설정

- 마이그레이션 되서 강의 내용 잘못됨 아래가 맞음

```js
module.exports = {
  plugins: ["testing-library", "jest-dom", "prettier"],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:prettier/recommended",
  ],
};
```

```json
// setting.json
{
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

```json
// package.json
 "devDependencies": {
    "eslint": "^8.28.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-config-react-app": "^7.0.1",
    "eslint-plugin-jest": "^27.1.6",
    "eslint-plugin-jest-dom": "^4.0.3",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.31.11",
    "eslint-plugin-testing-library": "^5.9.1"
  }
```
