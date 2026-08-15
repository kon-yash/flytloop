import { markdownTable } from './markdown'; import { issueType, normalize } from '../shared';
export type ImportedIssue = { sourceId:string; accountName:string; sourceCategory:string; sourceStatus:string; title:string; normalizedTitle:string; canonicalType:'BUG'|'SUPPORT' };
export function parseIssues(markdown: string): ImportedIssue[] { return markdownTable(markdown).map((r) => ({ sourceId:r.ID, accountName:r.Account, sourceCategory:r.Category, sourceStatus:r.Status, title:r.Title, normalizedTitle:normalize(r.Title), canonicalType:issueType(r.Category) })); }
