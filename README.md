# tenno-typer

# To use
1. Install Node.js
2. Clone the repo
3. run 'npm install'
4. run 'npm run start'
5. The nestjs app is now served on port 3000
6. To test simply do a GET to '/{text}/{language}' and the translation will be returned in base64/png format

# Current language implementations and their status
| Language | Status   | In Depth Status           |
| -------- |:--------:|:-------------------------:|
| Corpus   | COMPLETE |                           |
| Grineer  | COMPLETE |                           |
| Orokin   | COMPLETE | (LITERAL/PHONETIC/ALIGNED)|
| Solaris  | PARTIAL  | (LITERAL)                 |
| Ostron   | PARTIAL  | (LITERAL)                 |

# Todo's
| Language | Todo                                                     |
| -------- |:--------------------------------------------------------:|
| Solaris  | Automatic phonetization                                  |
| Ostron   | Automatic phonetization, alignment (horizontal/vertical) |