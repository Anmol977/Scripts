import { mkdir, opendir } from 'node:fs/promises';
import { Dirent, rename, unlink } from 'node:fs';

const folderName: string = `D:\\downloads`;
const defaultFolderDestName : string = 'Misc';

async function moveData(currPath : string, newPath : string){
    await rename(currPath, newPath, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(
                `moved file : ${currPath} to ${newPath}`
            );
        }
    });
}

async function manageFiles(dirent: Dirent) {
    let fileNameSplit = dirent.name.split('.');
    const fileExtension = fileNameSplit[fileNameSplit.length - 1];
    const newPath = `${folderName}\\${fileExtension}s`;
    const newDir = await mkdir(newPath, { recursive: true });
    moveData(`${folderName}\\${dirent.name}`, `${newPath}\\${dirent.name}`);
}

async function manageFolders(dirent: Dirent) {
    // const newDir = await mkdir(defaultFolderDestName, { recursive: true });
    // moveData(`${folderName}\\${dirent.name}`,`${folderName}\\${defaultFolderDestName}\\${dirent.name}`);
}

async function manageDownloads() {
    try {
        const dir = await opendir(folderName);
        for await (const dirent of dir) {
            if (dirent.isFile()) {
                await manageFiles(dirent);
            } else {
                // add folder management
                continue;
            }
        }
    } catch (err) {
        console.log(err);
    }
    console.log('done');
}

(async () => {
    await manageDownloads();
})();