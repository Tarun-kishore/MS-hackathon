### Signup 
method : POST
endpoint: /signup

Sample Input: json
{
    name: "name ",
    DOB: "Feb 29 2009" //or any other format,
    mobile: "9999999999",
    email: "email@domain.com",
    password: "password",
    isStudent: false, 
    isEmployee: false, 
    Organisation: false,
    educationalBackground: "Graduate",
    occupation: "Student",
    languages: "Hindi",
    nationality: "indian,
    Location: "delhi,
    availableTill: "Jun 30 2022", //not needed during signup
    canTravel: false, //not needed during signup
    preferences: [
      {
        preference: "event management"
      },
      {
        preference : "game playing"
        }
    ],    //not needed during signup
    skills: [
      {
        skill: "content"
      },
      {
        skill : "design"
        }
    ]  //not needed during signup   
}

Sample Output:
{
    "message": "Account Created",
    "role": "volunteer",
    "user": {       //user data
        "name": "user name",
        "DOB": "2011-09-15T18:30:00.000Z",
        "mobile": "9998887776",
        "email": "user@email.com",
        "isStudent": true,
        "isEmployee": false,
        "isAdmin": false,
        "_id": "629c5e9f0a4fb53e7da07e61",
        "preferences": [],
        "skills": [],
        "createdAt": "2022-06-05T07:43:27.287Z",
        "updatedAt": "2022-06-05T07:43:27.287Z",
        "__v": 0
    }
}

### Login
method : POST
endpoint: /login

Sample Input: json
{
    mobile:"9998887776",
    password:"password"
}

Sample Output:
{
    "message": "Logged in successfully"
}

### Logout 
method : POST
endpoint: /logout

Sample Input: json
{}

Sample Output:
{
    "message": "Logged Out Successfully"
}

### View profile (By volunteer) Must be logged in
method : Get
endpoint: /volunteer/profile

Sample Input: json
{}

Sample Output:
{
    "_id": "629c5e9f0a4fb53e7da07e61",
    "name": "user name",
    "DOB": "2011-09-15T18:30:00.000Z",
    "mobile": "9998887776",
    "email": "user@email.com",
    "isStudent": true,
    "isEmployee": false,
    "isAdmin": false,
    "preferences": [],
    "skills": [],
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2
}
