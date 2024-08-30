curl -X GET "http://localhost:4000/users?limit=192"

curl -X POST "http://localhost:4000/users" -H "Content-Type: application/json" -d '{"name":"Maria Wisozk","email":"Frank_Doyle33@yahoo.com"}'

curl -X GET "http://localhost:4000/users/436"