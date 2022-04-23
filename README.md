# React autocomplete skill test

## Deliverable

A react textarea component that has a Discord-like users and channels autocomplete + formatting

## Specs

- Search for a user and a channel as displayed in the sketch
- Store users and channels badges as `<#{channel_id}>` and `<&{user_id}>` on the underlying textarea value
- Ability to browse options using arrow keys + ability to select an option by pressing on the RETURN key
- Pressing ESC or SPACE should collapse the autocomplete popup
- Surrounding a text by ** and ** should display the text in bold

For any edgecases that aren't visible on the sketch file, please follow the Discord implementation.

## Data to play with

```json
{
  "channels": [
    {
      "id": "611014873639550999",
      "name": "présentations"
    },
    {
      "id": "571286115739238410",
      "name": "dev-test"
    },
    {
      "id": "675919773607002148",
      "name": "dev-room"
    },
    {
      "id": "572532173056507905",
      "name": "streams-announcements"
    },
    {
      "id": "656504373290991643",
      "name": "party"
    }
  ],
  "users": [
    {
      "id": "258258856189231104",
      "username": "Brendan",
      "discriminator": "1234"
    },
    {
      "id": "138362511190786048",
      "username": "Brendon",
      "discriminator": "4321"
    },
    {
      "id": "103559217914318848",
      "username": "JohnL",
      "discriminator": "3234"
    },
    {
      "id": "759336655478849578",
      "username": "JohnD",
      "discriminator": "4322"
    }
  ]
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
