# Back-end

Purchases

- LOCAL: http://localhost:3333/graphql
- PROD: https://purchases-backend.herokuapp.com/graphql

Classrooms

- LOCAL: http://localhost:3334/graphql
- PROD: https://classrooms-backend.herokuapp.com/graphql

# Front-end

Web

- Se for para purchases -> http://localhost:3333/graphql
- Se for para classrooms -> http://localhost:3334/graphql

# Apolo Federation

Gateway

- LOCAL: http://localhost:3335/

O frontend (web) pode acessar somente um único endereço, que é o gateway. O gateway é responsável por fazer a chamada para o backend correto, de acordo com o que foi solicitado (proxy).

## Exemplo SEM Gateway

- 1º chamada para purchases

```graphql
query {
  me {
    purchases {
      id
    }
  }
}
```

- 2º chamada para classrooms

```graphql
query {
  me {
    enrollments {
      id
    }
  }
}
```

## Exemplo COM Gateway

- Fazer UMA única chamada para o gateway
- O gateway vai fazer as chamadas para os backends necessários (purchases e classrooms)
- PROXY

```graphql
me {
  purchases {
    id
  }

  enrollments {
    id
  }
}
```
