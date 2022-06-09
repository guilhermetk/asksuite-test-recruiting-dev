## About

Crawler that scrapes the website https://book.omnibees.com/chainresults returning hotels and their rooms availabilities given a check-in and check-out dates.

## Setup

1 - Clone the repository and move into the folder:
```
git clone https://github.com/guilhermetk/asksuite-test-recruiting-dev.git
```
```
cd asksuite-test-recruiting-dev
```

2 - Install dependencies:
```
npm install
```

3 - Start the server:
```
npm start
```

## Consuming the API

Send a POST request to the url: http://your-server-url:3000/buscar with a JSON body as the example below:

```JSON
{
    "checkin": "30/06/2022",
    "checkiut": "30/06/2022"
}
```
Dates <b>must</b> use the format: DD/MM/YYYY
