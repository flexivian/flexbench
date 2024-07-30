curl -X GET "http://localhost:3000/users?limit=cado"

curl -X POST "http://localhost:3000/users"  -d '{"name":"coniuratio","email":"amet"}'

curl -X GET "http://localhost:3000/users/585"