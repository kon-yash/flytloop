import { markdownTable } from './markdown';
export type ImportedTask={sourceId:string;accountName:string;title:string;assignee:string;priority:string;sourceStatus:string;due:string};
export function parseTasks(markdown:string):ImportedTask[]{return markdownTable(markdown).map(r=>({sourceId:r.ID,accountName:r.Account,title:r.Title,assignee:r.Assignee,priority:r.Priority,sourceStatus:r.Status,due:r.Due}))}
