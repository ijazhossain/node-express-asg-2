## How to run this project locally

1. Install Node.js and npm
   Ensure that Node.js and npm installed on your machine.

2. Install TypeScript globally:
   Open terminal and run the following command to install Typescript globally:

```bash
npm install -g typescript
```

3. Install project dependencies:
   In the root directory run the following command to install the project: dependencies.

```bash
npm install
```

4. Build the typescript code:
   Run the following command to transpile TypeScript code to javascript

```bash
npm run build
```

5. Create a `.env` file:
   Create a `.env` file in the root of your project to store environment variables. Include any necessary configuration for your app. For example:

```bash
PORT=5000
DATABASE_URL=mongodb+srv://<user>:<password>@.mongodb.net/?retryWrites=true&w=majority
BCRYPT_SALT_ROUND=your count
```

6. Run the application:
   For development use, use the following command:

```bash
npm run start-dev
```

For production, use the following command:

```bash
npm run start-prod
```

This will run the application using the transpiled javascript files in the `./dist` directory.

7. Access the application:
   Once the server is running, accessing the application by opening a web browse and navigating to `http://localhost5000` or the port specified in your `.env` file.

8. Linting and Formatting:
   To lint the code run

```bash
npm run lint
```

9.To automatically fix linting issuess, run:

```bash
npm run lint-fix
```

10.To format the code using Prettier, run

```bash
npm run prettier
```
