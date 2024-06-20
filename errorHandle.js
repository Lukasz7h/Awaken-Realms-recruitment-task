import { readFileSync, writeFile } from "fs";

export function catchError(_error)
{
    const error = {
        message: _error.message,
        stack: _error.stack
    }

    const errorJSON = readFileSync('./errors.json');
    const objFromJson = JSON.parse(errorJSON);

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, 0);
    const day = date.getDay().toString().padStart(2, 0);

    const hours = date.getHours().toString().padStart(2, 0);
    const minutes = date.getMinutes().toString().padStart(2, 0);
    const seconds = date.getSeconds().toString().padStart(2, 0);

    objFromJson[`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`] = error;

    writeFile("./errors.json", JSON.stringify(objFromJson, null, 2), (writeErr) => {
        if (writeErr) {
            console.error("Error writing to file:", writeErr);
        }
    });
};