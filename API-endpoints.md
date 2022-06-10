### Signup

method : `POST`

endpoint: `/signup`
//Admin cannot be created using this endpoint

Sample Input: json

{

    name: "name ",
    DOB: "Feb 29 2009" //or any other format,
    mobile: "9999999999",
    email: "email@domain.com",
    password: "password",
    isStudent: false,
    school:"",
    organisation: "",
    isEmployee: false,
    Organisation: false,
    educationalBackground: "Graduate",
    occupation: "Student",
    languages: "Hindi",
    nationality: "indian",
    address:"address"
    Location: "delhi",
    availableTill: "Jun 30 2022", //not needed during signup
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

method : `POST`
endpoint: `/login`

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

method : `POST`
endpoint: `/logout`

Sample Input: json

{}

Sample Output:
{

    "message": "Logged Out Successfully"

}

### View profile ( User Must be logged in)

method : `Get`
endpoint: `/profile`

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

### View profile ( User Must be logged in)

method : `Patch`
endpoint: `/profile`

Sample Input: json //Do not give email,mobile,password,isAdmin because they cannot be changed using this endpoint
{

    "name":"updated name"

}

Sample Output:
{

    "_id": "629c5e9f0a4fb53e7da07e61",
    "name": "updated name",
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

### Delete profile ( User Must be logged in)

method : `delete`
endpoint: `/profile`

Sample Input: json

{}

Sample Output:
{

    "message": "User profile deleted"

}

### Register as a volunteer profile ( Volunteer Must be logged in)

method : `post`
endpoint: `/volunteer/register`

Sample Input: json
{

    ... other details
    "availableTill" : "Fri 10 Jun 2022" //can also be passed in form of date object

}

Sample Output:
{

    "_id": "629c5e9f0a4fb53e7da07e61",
    "name": "updated name",
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

### Add event ( Admin Must be logged in)

method : `post`
endpoint: `/event/add`

Sample Input: json
{

    "name":"activity",
    "description":"desc",
    "type":"translations",  //can only have values ["play sessions", "translations", "virtual sessions"]
    "location" : "online",  //online in case of online events else mention city
    "date":"Fri 10 Jun 2022",
    "startsAt" : "Fri 10 Jun 2022",
    "duration" : "24",  //number of hours
    "volunteersRequired":"2",
     preferences: [
      {
        preference: "event management"
      },
      {
        preference : "game playing"
        }
    ],
    skills: [
      {
        skill: "content"
      },
      {
        skill : "design"
        }
    ]

}

Sample Output:
{

    "_id" : "629dc2a8e0c2dbd77272aad5",
    "name":"activity",
    "type":"translations",
    "location" : "none",
    "date":"Fri 10 Jun 2022",
    "startsAt" : "Fri 10 Jun 2022",
    "duration" : "24",
    "volunteersRequired":"2",
    "enrolledVolunteers" : [],
    "volunteersEnrolled" : "0",
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2

}

### View event ( User Must be logged in)

method : `get`
endpoint: `/event/629dc2a8e0c2dbd77272aad5` //event Id is passed in url

Sample Input: json

{}

Sample Output:
{

    "name":"activity",
    "type":"translations",
    "location" : "none",
    "date":"Fri 10 Jun 2022",
    "startsAt" : "Fri 10 Jun 2022",
    "duration" : "24",
    "volunteersRequired":"2",
    "enrolledVolunteers" : [],
    "volunteersEnrolled" : "0",
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2

}

### Edit event ( Admin Must be logged in)

method : `put`
endpoint: `/event/edit/629dc2a8e0c2dbd77272aad5` //event Id is passed in url

Sample Input: json

{

name : "updated event",
preferences:[
{
preference:"Game playing"
}
]
}

Sample Output:
{

    "name":"updated event",
    "type":"translations",
    "location" : "none",
    "date":"Fri 10 Jun 2022",
    "startsAt" : "Fri 10 Jun 2022",
    "duration" : "24",
    "volunteersRequired":"2",
    "enrolledVolunteers" : [],
    "volunteersEnrolled" : "0",
    preferences:[
        {
            preference:"Game playing"
        }
    ]
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2

}

### Delete event ( Admin Must be logged in)

method : `delete`
endpoint: `/event/629dc2a8e0c2dbd77272aad5` //event Id is passed in url

Sample Input: json

{}

Sample Output:
{

    message:"Event deleted succefully"

}

### enroll event ( Volunteer Must be logged in)

method : `post`
endpoint: `/enrollment/enroll/629dc2a8e0c2dbd77272aad5` //event Id is passed in url

Sample Input: json

{}

Sample Output:
{

    "name":"activity",
    "type":"translations",
    "location" : "none",
    "date":"Fri 10 Jun 2022",
    "startsAt" : "Fri 10 Jun 2022",
    "duration" : "24",
    "volunteersRequired":"2",
    "enrolledVolunteers" : [
        {
            "_id" : object id,
            "enrolledVolunteer" : user Object id
        }
    ],
    "volunteersEnrolled" : "1",
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2

}

### Unenroll event ( Volunteer Must be logged in)

method : `post`
endpoint: `/enrollment/unenroll/629dc2a8e0c2dbd77272aad5` //event Id is passed in url

Sample Input: json

{}

Sample Output:
{

    "name":"activity",
    "type":"translations",
    "location" : "none",
    "date":"Fri 10 Jun 2022",
    "startsAt" : "Fri 10 Jun 2022",
    "duration" : "24",
    "volunteersRequired":"2",
    "enrolledVolunteers" : [],
    "volunteersEnrolled" : "0",
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2

}

### Get enrolled volunteer in an event ( Admin Must be logged in)

method : `get`
endpoint: `/enrollment/volunteers/629dc8e5edfe389cf1d4b41d` //event Id is passed in url

Sample Input: json

{}

Sample Output:
{

     {
            "enrolledVolunteer": {
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
                "updatedAt": "2022-06-06T12:14:37.099Z",
                "__v": 9,
                "approval": "accepted",
                "availableTill": "2022-06-09T18:30:00.000Z"
            },
            "_id": "629dce5602ac5261d14ea53a"
        }

}

### Get all event which the loggedIn volunteer enrolled in( Volunteer Must be logged in)

method : `get`
endpoint: `/volunteer/myEvents`

Sample Input: json

{}

Sample Output:
{

      {
        "_id": "629dc8e5edfe389cf1d4b41d",
        "name": "activity",
        "type": "translations",
        "location": "none",
        "date": "2022-06-09T18:30:00.000Z",
        "startsAt": "2022-06-09T18:30:00.000Z",
        "duration": 24,
        "volunteersEnrolled": 1,
        "volunteersRequired": 2,
        "skillsRequired": [
            "None"
        ],
        "enrolledVolunteers": [
            {
                "enrolledVolunteer": "629c5e9f0a4fb53e7da07e61",
                "_id": "629dce5602ac5261d14ea53a"
            }
        ],
        "createdAt": "2022-06-06T09:29:09.757Z",
        "updatedAt": "2022-06-06T09:52:22.073Z",
        "__v": 27
    }

}

### Get all events( User Must be logged in)

method : `get`
endpoint: `/event/all`

Sample Input: json

{}

Sample Output:
{

      {
        "_id": "629dc8e5edfe389cf1d4b41d",
        "name": "activity",
        "type": "translations",
        "location": "none",
        "date": "2022-06-09T18:30:00.000Z",
        "startsAt": "2022-06-09T18:30:00.000Z",
        "duration": 24,
        "volunteersEnrolled": 1,
        "volunteersRequired": 2,
        "skillsRequired": [
            "None"
        ],
        "enrolledVolunteers": [
            {
                "enrolledVolunteer": "629c5e9f0a4fb53e7da07e61",
                "_id": "629dce5602ac5261d14ea53a"
            }
        ],
        "createdAt": "2022-06-06T09:29:09.757Z",
        "updatedAt": "2022-06-06T09:52:22.073Z",
        "__v": 27
    }

}

### Get all recommended events( Volunteer Must be logged in)

method : `get`
endpoint: `/event/recommended`

Sample Input: json

{}

Sample Output:
{

      {
        "_id": "629dc8e5edfe389cf1d4b41d",
        "name": "activity",
        "type": "translations",
        "location": "none",
        "date": "2022-06-09T18:30:00.000Z",
        "startsAt": "2022-06-09T18:30:00.000Z",
        "duration": 24,
        "volunteersEnrolled": 1,
        "volunteersRequired": 2,
        "skillsRequired": [
            "None"
        ],
        "enrolledVolunteers": [
            {
                "enrolledVolunteer": "629c5e9f0a4fb53e7da07e61",
                "_id": "629dce5602ac5261d14ea53a"
            }
        ],
        "createdAt": "2022-06-06T09:29:09.757Z",
        "updatedAt": "2022-06-06T09:52:22.073Z",
        "__v": 27
    }

}

### Approve user registration( Admin Must be logged in)

method : `get`
endpoint: `/enrollment/requests/approve/629c5e9f0a4fb53e7da07e61` //volunteer id is passed

Sample Input: json

{}

Sample Output:
{

     message: "user approval successful"

}

### Reject user registration( Admin Must be logged in)

method : `get`
endpoint: `/enrollment/requests/reject/629c5e9f0a4fb53e7da07e61` //volunteer id is passed

Sample Input: json

{}

Sample Output:
{

    message: "user rejection successful"

}

### Get all requests pending for approval (Admin must be logged in)

method : `get`
endpoint : `/enrollment/requests`

Sample Input : json

{}

Sample Output:

[
{
"\_id": "629f14ce830ee0f61f7bab69",
"name": "second User",
"DOB": "2001-12-15T18:30:00.000Z",
"mobile": "9000000009",
"email": "user@domain.com",
"isStudent": true,
"isEmployee": false,
"approval": "pending",
"isAdmin": false,
"preferences": [],
"skills": [],
"createdAt": "2022-06-07T09:05:18.235Z",
"updatedAt": "2022-06-07T09:05:18.235Z",
"**v": 0
},
{
"\_id": "629f165acdabcb422b2c3895",
"name": "third user",
"DOB": "2001-09-10T18:30:00.000Z",
"mobile": "9922300431",
"email": "user3@gmail.com",
"isStudent": false,
"isEmployee": false,
"approval": "pending",
"isAdmin": false,
"preferences": [],
"skills": [],
"createdAt": "2022-06-07T09:11:54.526Z",
"updatedAt": "2022-06-07T09:11:54.526Z",
"**v": 0
}
]


### View profile public view ( No need for login)

method : `Get`
endpoint: `/publicProfile/629c5e9f0a4fb53e7da07e61`  //userId must be passed

Sample Input: json

{}


Sample Output:  //user mobile number and email will not be returned due to user privacy
{

    "_id": "629c5e9f0a4fb53e7da07e61",
    "name": "user name",
    "DOB": "2011-09-15T18:30:00.000Z",
    "isStudent": true,
    "isEmployee": false,
    "isAdmin": false,
    "preferences": [],
    "skills": [],
    "createdAt": "2022-06-05T07:43:27.287Z",
    "updatedAt": "2022-06-05T07:46:41.546Z",
    "__v": 2

}
