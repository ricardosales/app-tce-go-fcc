import React, { ReactNode } from 'react';

function inlineMarkdown(text: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|__[^_]+__|(?<!\*)\*[^*]+\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
  return text.split(tokenPattern).filter(Boolean).map((token, index) => {
    if (token.startsWith('**') || token.startsWith('__')) return <strong key={index} className="font-bold text-on-surface">{token.slice(2, -2)}</strong>;
    if (token.startsWith('*')) return <em key={index}>{token.slice(1, -1)}</em>;
    if (token.startsWith('`')) return <code key={index} className="rounded bg-surface-container-high px-1 py-0.5 font-mono text-[0.92em]">{token.slice(1, -1)}</code>;
    const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">{link[1]}</a>;
    return token;
  });
}

const isTableDivider = (line: string) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
const cells = (line: string) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
const isList = (line: string) => /^\s*(?:[-+*]\s+|\d+[.)]\s+)/.test(line);
const isSpecial = (lines: string[], index: number) => {
  const line = lines[index] ?? '';
  return /^\s{0,3}#{1,6}\s+/.test(line) || /^\s*```/.test(line) || /^\s*>/.test(line)
    || /^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line) || isList(line)
    || (line.includes('|') && isTableDivider(lines[index + 1] ?? ''));
};

export const MarkdownContent: React.FC<{ source: string }> = ({ source }) => {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }

    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const level = heading[1].length;
      const title = inlineMarkdown(heading[2]);
      const classes = level <= 2
        ? 'mt-5 border-b border-outline-variant/40 pb-1.5 text-[18px] font-bold text-on-surface'
        : level === 3
          ? 'mt-4 text-[16px] font-bold text-on-surface'
          : 'mt-3 text-[14px] font-bold text-on-surface';
      const HeadingTag = level <= 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
      blocks.push(<HeadingTag key={`h-${index}`} className={classes}>{title}</HeadingTag>);
      index += 1;
      continue;
    }

    if (/^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line)) {
      blocks.push(<hr key={`hr-${index}`} className="my-3 border-outline-variant/50" />);
      index += 1;
      continue;
    }

    if (/^\s*```/.test(line)) {
      const language = line.trim().slice(3).trim();
      index += 1;
      const code: string[] = [];
      while (index < lines.length && !/^\s*```/.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push(<pre key={`code-${index}`} className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-[12px] leading-5 text-slate-100"><code data-language={language || undefined}>{code.join('\n')}</code></pre>);
      continue;
    }

    if (line.includes('|') && isTableDivider(lines[index + 1] ?? '')) {
      const header = cells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().includes('|')) rows.push(cells(lines[index++]));
      blocks.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-xl border border-outline-variant/60">
          <table className="min-w-full border-collapse text-left text-[12px] leading-5">
            <thead className="bg-surface-container-high text-on-surface"><tr>{header.map((cell, cellIndex) => <th key={cellIndex} className="border-b border-outline-variant/60 px-3 py-2 font-bold">{inlineMarkdown(cell)}</th>)}</tr></thead>
            <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex % 2 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/60'}>{header.map((_, cellIndex) => <td key={cellIndex} className="border-b border-outline-variant/30 px-3 py-2 align-top text-on-surface-variant">{inlineMarkdown(row[cellIndex] ?? '')}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*> ?/, ''));
      blocks.push(<blockquote key={`quote-${index}`} className="border-l-4 border-primary/40 bg-surface-container-low px-3 py-2 text-on-surface-variant">{quote.map((part, partIndex) => <p key={partIndex} className="leading-6">{inlineMarkdown(part)}</p>)}</blockquote>);
      continue;
    }

    if (isList(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const listItems: Array<{ content: string; indent: number; checked?: boolean }> = [];
      while (index < lines.length && isList(lines[index])) {
        const current = lines[index++];
        const indent = current.match(/^\s*/)?.[0].length ?? 0;
        const item = current.replace(/^\s*(?:[-+*]\s+|\d+[.)]\s+)/, '');
        const task = item.match(/^\[([ xX])\]\s*(.*)$/);
        listItems.push({ content: task ? task[2] : item, indent, checked: task ? task[1].toLowerCase() === 'x' : undefined });
        while (index < lines.length && /^\s{2,}\S/.test(lines[index]) && !isList(lines[index]) && !isSpecial(lines, index)) {
          listItems[listItems.length - 1].content += ` ${lines[index].trim()}`;
          index += 1;
        }
      }
      const ListTag = ordered ? 'ol' : 'ul';
      blocks.push(<ListTag key={`list-${index}`} className={`${ordered ? 'list-decimal' : 'list-disc'} space-y-1 pl-6 text-on-surface-variant marker:text-primary`}>{listItems.map((item, itemIndex) => <li key={itemIndex} className={item.indent > 0 ? 'ml-4' : ''}>{item.checked !== undefined && <span aria-label={item.checked ? 'concluído' : 'pendente'} className="mr-1">{item.checked ? '☑' : '□'}</span>}{inlineMarkdown(item.content)}</li>)}</ListTag>);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isSpecial(lines, index)) paragraph.push(lines[index++].trim());
    blocks.push(<p key={`p-${index}`} className="text-[14px] leading-7 text-on-surface-variant">{inlineMarkdown(paragraph.join(' '))}</p>);
  }

  return <div className="space-y-3 break-words">{blocks}</div>;
};
