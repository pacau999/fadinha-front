
# Fairy Teachers (front-end)

An complete application for private tutoring teachers. 
Made with modern, fast, scalable, reliable and DX optimised technologies. 
Live on: https://fairyt.vercel.app/
## Some Features

- Responsive and Mobile First
- Material Design 
- Light and Dark themes
- Blazing fast hot-reloading
- Easy and performant form fields' masks and validation
- Fairy themed' animated beautiful login/signup page
- Cool and straightforward Dashboard

## Features pre-installed and ready to be implemented if wanted:

- Redux + Saga(only used by react-admin v3 library (recently v4 relase doesnt' need it anymore)
- Testing with Jest
- Localisation
- Typescript




## Environment variables

To run this project you need to set the api url on `REACT_APP_APIURL` environment variable



ex: `http://192.168.100.74:3001`

## Quick Developmet

If you just wanna play with the front end you can quick run a fake rest api.  Add a `db.json` file in the root directory with the following data:

`  "enrollments": [],
  "teachers": [
    {
      "id": "me"
    },
    {
      "id": "login"
    }
  ],
  "tutoringtTypes": [],
  "students": []`
  
  then `yarn run json-server db.json` to run the API, now in another terminal you can just `yarn start` to live preview the app with blazing fast hot reload


## Stack 

 - React 
 - React Boiler Plate https://github.com/react-boilerplate/react-boilerplate-cra-template
 - React Admin https://marmelab.com/react-admin/
 - Vite (for blazing fast hot-reloading) https://vitejs.dev/
 - Zustant (for the easy & simple theme store/toggle implementation) https://github.com/pmndrs/zustand

