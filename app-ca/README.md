# App-Ca

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Clean architecture with Angular

```text
src/
└── app/
    ├── core/                          # Shared infrastructure
    │   ├── base/
    │   │   ├── use-case.base.ts       # Base use case interface
    │   │   ├── mapper.base.ts         # Base mapper for data transformation
    │   │   └── repository.base.ts     # Base repository interface
    │   └── presentation/
    │       ├── components/            # Shared UI components
    │       └── guards/                # Route guards
    │
    └── user/                          # User bounded context (feature)
        ├── domain/                    # Layer 1: Business Logic
        │   ├── models/
        │   │   └── user.model.ts      # Domain entity
        │   └── repositories/
        │       └── user.repository.ts # Repository interface
        │
        ├── application/               # Layer 2: Use Cases
        │   └── usecases/
        │       ├── get-user.usecase.ts
        │       ├── create-user.usecase.ts
        │       └── update-user.usecase.ts
        │
        ├── infrastructure/            # Layer 3: Technical Implementation
        │   ├── entities/
        │   │   └── user.entity.ts     # API/Database entity
        │   ├── mappers/
        │   │   └── user.mapper.ts     # Entity to Model mapper
        │   └── repositories/
        │       └── user-impl.repository.ts # Repository implementation
        │
        └── presentation/              # Layer 4: UI Components
            ├── pages/
            │   ├── user-list/
            │   │   ├── user-list.component.ts
            │   │   ├── user-list.component.html
            │   │   └── user-list.component.css
            │   └── user-detail/
            │       ├── user-detail.component.ts
            │       ├── user-detail.component.html
            │       └── user-detail.component.css
            └── components/           # Presentational components
                └── user-card/
                    ├── user-card.component.ts
                    ├── user-card.component.html
                    └── user-card.component.css
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
