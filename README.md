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
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2
quote_type = single

[*.json]
indent_style = space
indent_size = 2

[*.html]
indent_style = space
indent_size = 2
max_line_length = 140

[*.{css,scss,sass}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
max_line_length = 0

[*.{yml,yaml}]
indent_style = space
indent_size = 2

[*.{xml,config,props,targets,nuspec,proj,projitems,ruleset,vsixmanifest,vsct}]
indent_style = space
indent_size = 2
```

- Create a `.prettierrc.json` file in the root with this content:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "endOfLine": "auto",
  "bracketSpacing": true,
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": "*.scss",
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": "*.html",
      "options": {
        "printWidth": 120
      }
    }
  ]
}
```

- Create a file `eslint.config.js` in the root with this content:

```ts
// @ts-check
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplateParser = require('@angular-eslint/template-parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
module.exports = [
  {
    ignores: ['.cache/', '.git/', '.github/', 'node_modules/'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.spec.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
      ...prettierPlugin.configs?.rules,
      '@angular-eslint/directive-selector': [
        'warn',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'warn',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'import/order': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/naming-convention': 0,
      '@angular-eslint/no-host-metadata-property': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@angular-eslint/template': angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },
  eslintPluginPrettierRecommended,
];

```

- Finally, add in the VS Code settings (the `settings.json` file in `.vscode/settings.json` or user preferences):

```json
{
  "cSpell.words": ["Dtos", "Gifs", "GIPHY"],
  "angular-schematics.schematicsDefaultOptions": {
    "angular-*": {
      "style": "css"
    }
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "editor.formatOnSave": false,
    "editor.quickSuggestions": {
      "other": "on",
      "comments": "off",
      "strings": "on"
    }
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.quickSuggestions": {
      "other": "on",
      "comments": "off",
      "strings": "on"
    }
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.quickSuggestions": {
      "other": "on",
      "comments": "off",
      "strings": "on"
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.organizeImports": "explicit",
      "source.fixAll.eslint": "explicit",
      "source.fixAll.tslint": "explicit",
      "source.fixAll.stylelint": "explicit"
    },
    "editor.formatOnSave": true,
    "editor.quickSuggestions": {
      "other": "on",
      "comments": "off",
      "strings": "on"
    }
  },
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.inlineSuggest.enabled": true,
  "window.zoomLevel": 1.2,
  "editor.fontSize": 15,
  "editor.quickSuggestions": {
    "other": "on",
    "comments": "off",
    "strings": "on"
  }
}
```

---

## 2.2. Installation with pnpm

Open a terminal at the root of the project and run:

```bash
    pnpm add -D eslint prettier angular-eslint prettier-eslint typescript-eslint eslint-config-prettier eslint-plugin-prettier
```

This will install all the necessary development dependencies for Prettier, ESLint, and its integration with Angular and TypeScript.

---

## 2.3. Usage

- Now when saving TypeScript and HTML files in VS Code, formatting and auto-correction will be applied.

- To format manually with Prettier:

```bash
    pnpm prettier --write .
```
