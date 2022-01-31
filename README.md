# FriendFinder

Friend Finder

**Problem it solves:** \
Identification of a friend that is the most compatible.

**How solved:** \
By having each friend respond to a short survery and storing the responses, an individual can be alerted to the friend that is closest in compatibility to them after answering the same survey.

**Technical approach:** \
Leverages express and node to route survey responses and store friends data. Upon adding a new person, the person with the closest compatibility is shown in a modal. Responses are compared to each other and a difference is calculated and then added up across all responses for an individual. The individual with the closes score to the new person is the most compatible.

## Getting Started

Clone the repository locally and run the below from the root directory of the project:

```
# install needed packages
npm install

# start the server
node server.js

# navigate to the browser and enter
https://localhost:3000
```

1. Go to Survey
2. Enter new person
   Note: an image can be used from https://randomuser.me/api/portraits/men/22.jpg

### Prerequisites

Node and NPM

### Installing

To get a development environment up and running, clone the repository locally. You will need node installed and npm.

## Running tests

Testing was done against friends with a range of different scores.

## Deployment

The project should be run from the browser by specifying http://localhost:3000 after starting node.

The project is hosted on heroku at https://gentle-lowlands-38561.herokuapp.com/

## Built With

The following npm packages are used: express, path, body-parser

**Technologies**\
JavaScript, Node, HMTL, CSS, Chosen

## Contributing

N/A

## Versioning

This is version 1.0

## Authors

- **Jenni** - initial project

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
