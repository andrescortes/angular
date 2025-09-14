- [1. Angular Project Setup Using pnpm](#1-angular-project-setup-using-pnpm)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Installing pnpm](#12-installing-pnpm)
  - [1.3. Check the installed version:](#13-check-the-installed-version)
  - [1.4. Creating a New Angular Project with pnpm](#14-creating-a-new-angular-project-with-pnpm)
  - [1.5. Useful pnpm Commands for Angular Development](#15-useful-pnpm-commands-for-angular-development)
  - [1.6. Configure Angular CLI to Use pnpm by Default](#16-configure-angular-cli-to-use-pnpm-by-default)
  - [1.7. Benefits of Using pnpm with Angular](#17-benefits-of-using-pnpm-with-angular)
  - [1.8. Additional Resources](#18-additional-resources)

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