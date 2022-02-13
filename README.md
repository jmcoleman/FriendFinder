# Friend Finder

**Problem it solves:** \
In this day and age, it is difficult to find friends with similar likes and interests. This solution provides a means to find friends that are the most compatible.

**How solved:** \
Each friend responds to a short survey and is paired with the friend that is closest in compatibility based on the survey results.

**Technical approach:** \
Uses express and node to route survey responses and store friend data. Upon responding to a survey, the person with the closest compatibility is shown in a modal. Responses are compared to each other and a difference is calculated and then added up across all responses for each individual. The individual with the closes score to the survey responder is the most compatible.

## Prerequisites

Node and NPM

## Getting Started

Clone the repository locally and run the below from the root directory of the project:

### Install needed packages

```
npm install
```

### Start the server

```
node server.js
or
npm run start
```

### Navigate to the browser and enter

```
https://localhost:3000
```

From the website:

1. Go to the Survey
2. Enter the users name and url to user photo \
   (An image can be used from https://randomuser.me/api/portraits/men/22.jpg)
3. Answer survey questions
4. Submit the survey
5. A modal will be shown with the friend that has the closest score for compatibility score.

## Deployment

The project runs from the browser by specifying http://localhost:3000 after starting node.

The project is hosted on heroku at https://gentle-lowlands-38561.herokuapp.com/

## Technologies

Node, NPM, JavaScript, Express, HMTL5, CSS3, Bootstrap 5, Font Awesome 6

## Versioning

Version 1.1

## Authors

- **Jenni Coleman**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
