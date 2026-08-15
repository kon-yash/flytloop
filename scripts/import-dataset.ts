import { importAll } from '../lib/import/importAll';
const result=importAll(); console.log(JSON.stringify(result,null,2)); if(result.errors.length)process.exitCode=1;
