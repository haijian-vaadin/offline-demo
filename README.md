# Custom project from start.vaadin.com

This project is to demo the offline feature.

master branch is using v18.

offlien branch is using v18 + Flow offlie feature branch.

## Project structure

| Directory                                  | Description                                                                                                                 |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `frontend/`                                | Client-side source directory                                                                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;`index.html`       | HTML template                                                                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;`index.ts`         | Frontend entrypoint, contains the client-side routing setup using [Vaadin Router](https://vaadin.com/router)                |
| &nbsp;&nbsp;&nbsp;&nbsp;`main-layout.ts`   | Main layout Web Component, contains the navigation menu, uses [App Layout](https://vaadin.com/components/vaadin-app-layout) |
| &nbsp;&nbsp;&nbsp;&nbsp;`views/`           | UI views Web Components (TypeScript)                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;`styles/`          | Styles directory (CSS)                                                                                                      |
| `src/main/java/<groupId>/`                 | Server-side source directory, contains the server-side Java views                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;`Application.java` | Server entrypoint                                                                                                           |

## What next?

[vaadin.com](https://vaadin.com) has lots of material to help you get you started:

- Read the [Quick Start Guide](https://vaadin.com/docs/v16/flow/typescript/quick-start-guide.html) to learn the first steps of full stack Vaadin applications development.
- Follow the tutorials in [vaadin.com/learn/tutorials](https://vaadin.com/learn/tutorials). Especially [Building Modern Web Apps with Spring Boot and Vaadin](https://vaadin.com/learn/tutorials/modern-web-apps-with-spring-boot-and-vaadin) is good for getting a grasp of the basic Vaadin concepts.
- Read the documentation in [vaadin.com/docs](https://vaadin.com/docs).
- For a bigger Vaadin application example, check out the Full Stack App starter from [vaadin.com/start](https://vaadin.com/start).
