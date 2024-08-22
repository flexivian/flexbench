curl -X GET "http://localhost:4000/users?limit=78"

curl -X POST "http://localhost:4000/users" -H "Content-Type: application/json" -d '{"name":"Olga Mayert","email":"Travon91@yahoo.com"}'

curl -X GET "http://localhost:4000/users/1"