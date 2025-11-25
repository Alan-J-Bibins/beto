import { parse } from "./index.js";

console.log(parse("due on 10-09-2005", {
    rules: ["due -> due on $date", "due -> due $date", "due -> $date"],
}));

console.log(parse("remind me monday at 8pm", {
    rules: [
        "remind -> remind me $date $time",
        "remind -> remind me $date",
        "remind -> remind me at $time",
        "remind -> remind me $date at $time",
        "remind -> $date at $time",
        "due -> $date at $time"
    ]
}))
