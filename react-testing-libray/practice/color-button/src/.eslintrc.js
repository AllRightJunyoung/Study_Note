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
