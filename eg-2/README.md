 npm i express mongoose dotenv 
 node server.js


  1. Register Users (POST /register)
//Student

{
  "name": "Arjun Kumar",
  "email": "arjun@student.com",
  "role": "student"
}
//Mentor
{
  "name": "Meera Sharma",
  "email": "meera@mentor.com",
  "role": "mentor"
}


Schedule a Mentorship (POST /mentorships)

{
  "topic": "Web Development",
  "date": "2025-05-16T10:00:00.000Z",
  "studentId": "",// copy when student user is created
  "mentorId": ""//copy when mentor user is created
}