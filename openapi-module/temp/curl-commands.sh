curl -X GET "http://localhost:4000/users?limit=602"

curl -X POST "http://localhost:4000/users" -H "Content-Type: application/json" -d '{"name":"Orlando Crooks I","email":"Wilmer.Buckridge15@hotmail.com"}'

curl -X GET "http://localhost:4000/users/238"