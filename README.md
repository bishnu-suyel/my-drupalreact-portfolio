# My DrupalReact Portfolio

**my-drupalreact-portfolio** is a React.js app that interacts with a **Drupal 10** backend to display dynamic content via **JSON:API**. Drupal is used solely as a backend, while React handles all frontend presentation. CORS issues between the two were resolved by configuring the `services.yml` file in Drupal.

## Technologies Used

- **React.js**: For building the frontend UI.
- **Drupal 10**: Separate drupal app that serves backend for content management and serving data via JSON:API (https://github.com/bishnu-suyel/my-drupal-portfolio).
- **Node.js & NPM**: Required to manage the React environment.

## Setup and Usage

### Step 1: Install Dependencies

Navigate to the React app folder and install the necessary dependencies:

```bash
npm install
```
### Step 2: Start the React App
To start the frontend React app, run the following command:

```bash
npm run dev
```
This will launch the React app on http://localhost:5173, fetching data from the Drupal backend. Make sure that the drupal app is up and running.

## Live Page

Not yet

## Screenshot

Not yet

## Sources

- [GitHub Guides - Mastering Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Make a README](https://www.makeareadme.com/)
- [React Documentation](https://react.dev/learn)

## Authors and Acknowledgment
This project was developed as part of an assignment.

- [GitHub @bishnu-suyel](https://github.com/bishnu-suyel)
- [LinkedIn @bishnu-suyel](https://www.linkedin.com/in/bishnu-suyel)
