## About

Crawler that scrapes hotels and rooms availability from https://book.omnibees.com/

## How to

1 - After cloning the repository to your machine, access the repository folder through a terminal and run the <b>yarn</b> command to install the dependencies.</br>
2 - With the dependencies installed, run the command <b>yarn dev: server</b> to start the server.</br>
3 - You will need a tool to make requests to the Rest API, such as <b>Insomnia</b> or <b>Postman</b>.</br>
4 - The base URL is <b>http://localhost:3333</b>.</br>

## How to use the API

The robot will be called on the following POST route: <b>http://localhost:3333/search</b>. When called, it will access a specific path and extract data and information from the available rooms, according to the check-in and check-out informed.

</br><b>Example of the request body</b>

```JSON
{
    "checkIn": "13/06/2021",
    "checkOut": "14/06/2021"
}
```

</br><b>Example of expected return</b>

```JSON
[
  {
    "name": "Nome do quarto.",
    "description": "Descrição do quarto.",
    "price": "Valor da diária no formato R$ 0,00",
    "image": [
      "Imagens do quarto"
    ]
  },
]
```
