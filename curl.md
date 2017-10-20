# CURL docs

## Auth

* Login 

  ```sh
  curl -X POST -H "Content-Type: application/json" -d '{"email":"tom@example.com", "password": "password"}' http://localhost:3001/login
  curl -X POST -H "Content-Type: application/json" -d '{"email":"tom@example.com", "password": "password"}' https://mock-project-server.herokuapp.com/login
  ```
