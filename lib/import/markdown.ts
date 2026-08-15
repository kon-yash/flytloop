export function markdownTable(markdown: string): Array<Record<string, string>> {
  const lines = markdown.split('\n').filter((line) => line.trim().startsWith('|'));
  if (lines.length < 3) throw new Error('Expected a Markdown table with header and divider.');
  const headers = lines[0].split('|').slice(1, -1).map((cell) => cell.trim());
  return lines.slice(2).map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== headers.length) throw new Error(`Malformed Markdown row: ${line}`);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
  });
}
