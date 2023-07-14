import { opendir } from 'node:fs/promises';
import { unlink } from 'node:fs';
import { tmpdir } from 'os';

async function deleteTempFiles() {
    const tempDirName = tmpdir();
    const tempDir = await opendir(tempDirName)
    let count = 0;
    let remCount = 0;
    for await (const dirent of tempDir) {
        unlink(`${tempDirName}/${dirent.name}`, (err) => {
            if (err) {
                console.log(`could not delete : ${JSON.stringify(dirent)}`);
                // console.log(err);
                remCount++;
            } else {
                count++;
            }
        }
        )
    }
    console.log(`Deleted ${count} temp files.`);
    console.log(`${remCount} temp files remaining.`)
}

deleteTempFiles();