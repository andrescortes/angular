- [1. Angular Project Setup Using pnpm](#1-angular-project-setup-using-pnpm)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Installing pnpm](#12-installing-pnpm)
  - [1.3. Check the installed version:](#13-check-the-installed-version)
  - [1.4. Creating a New Angular Project with pnpm](#14-creating-a-new-angular-project-with-pnpm)
  - [1.5. Useful pnpm Commands for Angular Development](#15-useful-pnpm-commands-for-angular-development)
  - [1.6. Configure Angular CLI to Use pnpm by Default](#16-configure-angular-cli-to-use-pnpm-by-default)
  - [1.7. Benefits of Using pnpm with Angular](#17-benefits-of-using-pnpm-with-angular)
  - [1.8. Additional Resources](#18-additional-resources)
- [2. Guide to set up Prettier, ESLint, and .editorconfig in an Angular 19 project using pnpm](#2-guide-to-set-up-prettier-eslint-and-editorconfig-in-an-angular-19-project-using-pnpm)
  - [2.1. Create configuration files](#21-create-configuration-files)
  - [2.2. Installation with pnpm](#22-installation-with-pnpm)
  - [2.3. Usage](#23-usage)

# 1. Angular Project Setup Using pnpm

## 1.1. Prerequisites
- Node.js installed (recommended version 16 or higher)
- pnpm installed globally
- Angular CLI installed globally

## 1.2. Installing pnpm

Install pnpm globally using npm:

```bash
    npm install -g pnpm
```

## 1.3. Check the installed version:
```bash
    pnpm -v
```

## 1.4. Creating a New Angular Project with pnpm

1. Create a new Angular project using Angular CLI and specify pnpm as the package manager:

```bash
    ng new my-angular-app --package-manager=pnpm
```

2. Change directory to the project folder:

```bash
    cd my-angular-app
```

3. Install project dependencies (this is usually done automatically on creation, but can be done manually):

```bash
    pnpm install
```

## 1.5. Useful pnpm Commands for Angular Development

- Add a new package:

```bash
    pnpm add <package-name>
```

- Add a package as a development dependency:

```bash
    pnpm add -D <package-name>
```

- Remove a package:

```bash
    pnpm remove <package-name>
```

- Run scripts defined in package.json (e.g., start, build, test):

```bash
    pnpm run <script-name>
```

Example to start the development server:

```bash
    pnpm start
```

- Update dependencies:

```bash
    pnpm update
```

- Clean pnpm store cache and reinstall:

```bash
    pnpm store prune
    pnpm install
```

## 1.6. Configure Angular CLI to Use pnpm by Default

To make pnpm the default package manager for Angular CLI globally run:

```bash
    ng config -g cli.packageManager pnpm
```

## 1.7. Benefits of Using pnpm with Angular

- Faster installs and updates
- Efficient disk space usage with symlinked packages
- Strict and accurate dependency management
- Full compatibility with Angular CLI tooling

## 1.8. Additional Resources

- Official pnpm documentation: https://pnpm.io
- Angular CLI documentation: https://angular.io/cli



# 2. Guide to set up Prettier, ESLint, and .editorconfig in an Angular 19 project using pnpm

This guide explains how to set up a development environment for Angular 19 with automatic code formatting using Prettier, ESLint, and .editorconfig, and how to install the dependencies using pnpm.

---

## 2.1. Create configuration files

- Create a `.editorconfig` file at the root of the project with the following content:


```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

- Create a `.prettierrc.json` file in the root with this content:

```json
{
"tabWidth": 2,
"useTabs": false,
"singleQuote": true,
"semi": true,
"bracketSpacing": true,
"arrowParens": "avoid",
"trailingComma": "es5",
"bracketSameLine": true,
"printWidth": 120
}
```

- Create a file `eslint.config.js` in the root with this content:

```ts

// eslint.config.js
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = tseslint.config({
  ignores: ['.angular/**', 'dist/**', 'node_modules/**'],
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
    eslintConfigPrettier,
  ],
  processor: angular.processInlineTemplates,
  rules: {
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
    '@angular-eslint/component-selector': [
      'error',
      { type: ['attribute', 'element'], prefix: 'app', style: 'kebab-case' },
    ],
  },
});

module.exports = {
  files: ['**/*.html'],
  extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  rules: {},
};
```

- Finally, add in the VS Code settings (the `settings.json` file in `.vscode/settings.json` or user preferences):

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
        "editor.formatOnSave": false
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
        "editor.formatOnSave": false
    }
}
```

---

## 2.2. Installation with pnpm

Open a terminal at the root of the project and run:

```bash
    pnpm add -D prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template eslint-config-prettier eslint-plugin-prettier
```

This will install all the necessary development dependencies for Prettier, ESLint, and its integration with Angular and TypeScript.

---

## 2.3. Usage

- Now when saving TypeScript and HTML files in VS Code, formatting and auto-correction will be applied.- You can run ESLint manually with:

```bash
    pnpm eslint . --ext .ts,.html
```

- To format manually with Prettier:

```bash
    pnpm prettier --write .
```
