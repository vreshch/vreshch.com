import {
  run,
} from "./app";

const PORT = (process.env['PORT'] || '8080' || '').trim();

run({PORT}).then(() => {
    // tslint:disable-next-line
    console.log((new Date().toLocaleString()), " vreshch.com ", "started on port " + PORT + " ");
}).catch((err) => {
    // tslint:disable-next-line
    console.error("Error during start", err);
});
