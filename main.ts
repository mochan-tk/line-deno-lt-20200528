import { App, parser } from "https://deno.land/x/attain/mod.ts";
import ky from 'https://deno.land/x/ky/index.js'
import { HmacSha256 } from "https://deno.land/std/hash/sha256.ts"
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const app = new App();

app.use(parser);

app.post("/callback", (req, res,)=> {
    if (validate_signature(String(req.headers.get("x-line-signature")),JSON.stringify(req.params))) {
        const event =  req.params.events[0];
        if (event.type == 'message'){
            const body = {
                replyToken: event.replyToken,
                messages: [{
                    type: 'text',
                    text: event.message.text
                }]
            }
            
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config().LINE_CHANNEL_ACCESS_TOKEN,
                'Content-Length': encode(JSON.stringify(body)).byteLength
            }
            const original = ky.create({
                headers: headers
            });
            const url = 'https://api.line.me/v2/bot/message/reply';
            
            original.post(url, { body: JSON.stringify(body) }).json()

        }  
    }

    res.status(200).end;
});

function validate_signature(signature: string, body: string)
{
    const algorithm = new HmacSha256(config().LINE_CHANNEL_SECRET);
    const b64: string = base64.fromUint8Array(Uint8Array.from((algorithm.update(body).digest())));
    return signature == b64;
}

const PORT = Number(Deno.env.get('PORT')) || 8080;
app.listen({ port: PORT });
console.log(`Start listening on http://localhost:${PORT}`);