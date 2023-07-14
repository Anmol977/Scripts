import { opendir } from 'node:fs/promises';
import { unlink } from 'node:fs';

// const args = process.argv;
const folderName = "D:/downloads";

let unneededExtensions = ["exe","msi","torrent","zip","rar","parts"];

function checkNeedability(arg : string){
    const splitArg = arg.split('.');
    const fileExtension = splitArg[splitArg.length - 1];
    if(unneededExtensions.includes(fileExtension)){
        unlink(`${folderName}/${arg}`,(err)=>{
            if(err){
                console.log(`failed to delete file : ${arg}`);
                return;
            } 
            console.log(`deleted file : ${arg}`);
        })
    }
}

async function iterateDir() {
    try {
        const dir = await opendir(folderName);
        for await (const dirent of dir) {
            checkNeedability(dirent.name);
        }
    } catch (err) {
        console.log(err);
    }
}

iterateDir();
console.log('done');