# January.js

January.js is an API that generates notes, melodies and coherent harmonies. Travel through differing colours as you are able to explore the music algorithm to your hearts content.
Built in Typescript, January.js has no need for dependencies (other the Typescript compiler if you want to build to vanilla JS). 
You can run this through Node.js or through Docker. Running through Docker grants you access to some additional routes so I can track sone stats across multiple sessions. The algorithm is constructed through markov chains and good old `Math.random()`

Here are the main functions, all found as APi routes in `app/src/server.ts`

```javascript
small.onPress()
// generate a single note

vamp.onPress()
// generate a chord in the current key and mode

chord.onPress()
// generate a chord in the current key while changing the mode

octave.onPress()
// generate a note with a second one an octave above or below that

harmony.onPress()
// generate a note and one of it's harmonics in the current key

transpose.onPress()
// the big red button, combines the functions of the chord, octave, harmony and small functions while also changing the key
```

## Installation / Building

Make sure you have either Docker or Node.js installed. In case you want don't want to run this through Docker, make sure to install `ts-node` so you can run the neccesarry files without building. If you do want to build, enter the following command in your terminal or command line.


```bash
cd app
npm i -g typescript
npm run build-start
```
A build folder will appear with the compiled files inside.

## Usage

You can run the entire app using Docker, both a PostgreSQL database and the Express server serving up melodies and harmonies. It's also entirely possible to run this on Node.js, sacrificing some abilities.

Running through Docker

```bash
docker-compose up
```

Running through Docker with V2 Compose

```bash
docker compose up
```

Running through Node.js / Typescript Node.js

```bash
cd app
npm i
npm i -g ts-node
ts-node server.ts
```

## Testing the module

to run tests:
```bash
npm run test
```

## Missing something??
This library is a work in progress, and I'm always interested to receive inspiration, suggestions, enhancements, literature and more. Feel free to file an issue and I will look into it!


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Inspiration
This project would not have existed without the wonderful work of Rich Vreeland, more specifically his tool called 'January'. Give it a try yourself, it's relaxing.
[January by Rich Vreeland / Disasterpiece](https://disasterpeace.com/blog/january/january)

## License
GNU General Public License v3.0