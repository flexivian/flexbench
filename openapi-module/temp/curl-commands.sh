curl -X GET "http://localhost:3000/users?limit=557"

curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d '{"name":"Tiffany Conn","email":"Miguel_Cremin-Wisoky@yahoo.com"}'

curl -X GET "http://localhost:3000/users/681"