<h1 align="center"> Welcome to Musitracker API 🔍 </h1>

<p align="center">
  <a href="https://www.linkedin.com/in/abigailsarzuri/">
    <img alt="Abigail Sarzuri" src="https://img.shields.io/badge/AbigailSarzuri-0A66C2?style=for-the-badge&logo=LinkedIn" />
  </a>
  <a href="https://github.com/AbigailSC/Musitracker-api#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-blue?style=for-the-badge"/>
  </a>
  <a href="https://github.com/AbigailSC/Musitracker-api#readme">
    <img alt="Repo size" src="https://img.shields.io/badge/repo_size-226KB-blue?style=for-the-badge" />
  </a>
</p>

## Documentation

Full documentation for the Musitracker API lives in [Swagger doc](https://musitracker-api-production.up.railway.app/docs/).

## Prerequisites

- [Node.js](https://nodejs.org/): ^12.0.0
- [NPM](https://npmjs.org/) or any other Node.js package manager

## Installation

Install packages with your preferred package manager, e.g. npm:

```
npm install
```

If you want to have the API running on a different port, into `.env` and change the `PORT` field to your preferred port. \
Depending on if you want to install the API for production or for development, the process is different.

### Production

Build the project using the following command:

```
npm run build
```

Then start the server with this command:

```
npm start
```

### Development

Start the dev server with this command:

```
npm run dev
```

### Configuration via Environment variable

Most Musitracker configuration is done through musitracker-config, however the API has additional environment variables that affect its operation:

| environment variable | default     | description                                                             |
| -------------------- | ----------- | ----------------------------------------------------------------------- |
| MONGODB_URI          | `undefined` | Add your connection string of MongoDB into your application code.       |
| PORT                 | 3000        | The TCP port the Musitracker will use for incoming network connections. |
| TOKEN_SECRET         | secretWord  | The secret word of your JWT connections.                                |

Made with love by [AbigailSC](https://github.com/AbigailSC) 🚀
