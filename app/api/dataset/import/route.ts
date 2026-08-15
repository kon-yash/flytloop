import{importAll}from'@/lib/import/importAll';import{json,apiError}from'@/lib/api';export function POST(){try{return json(importAll())}catch(e){return apiError(e)}}
