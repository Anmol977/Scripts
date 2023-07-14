import process from "node:process";

const userString = process.argv[2];

function countWords(){
   let count = 0;
    for(let char of userString){
        if (char == ' '){
            count++;
        }
    }
    return count + 1;
}
console.log(countWords());
