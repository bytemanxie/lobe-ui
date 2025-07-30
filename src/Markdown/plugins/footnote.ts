import { Node } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

interface FootnoteLink {
  alt?: string;
  title?: string;
  url: string;
}

// eslint-disable-next-line unicorn/consistent-function-scoping
export const remarkCustomFootnotes = () => (tree: any, file: any) => {
  const footnoteLinks = new Map();

  visit(tree, 'footnoteDefinition', (node) => {
    let linkData: FootnoteLink | null = null;

    // 查找第一个link类型的子节点
    visit(node, 'link', (linkNode) => {
      if (linkData) return SKIP; // 只取第一个链接

      // 提取链接文本
      const textNode = linkNode.children.find((n: Node) => n.type === 'text');

      linkData = {
        alt: textNode?.value || '',
        title: textNode?.value || '',
        url: linkNode.url, // 或者根据需求处理
      };

      return SKIP; // 找到后停止遍历
    });

    if (linkData) {
      footnoteLinks.set(node.identifier, linkData);
    }
  });

  // 将数据存入文件上下文
  file.data.footnoteLinks = Object.fromEntries(footnoteLinks);
};

// eslint-disable-next-line unicorn/consistent-function-scoping
export const rehypeFootnoteLinks = () => (tree: any, file: any) => {
  const linksData: Record<string, FootnoteLink> = file.data.footnoteLinks || {};
  // 创建排序后的链接数组（按identifier排序）
  const sortedLinks = Object.entries(linksData)
    .sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10)) // 数字排序
    .map(([id, data]) => ({ id, ...data }));

  // 创建从原始ID到排序索引的映射
  const idToIndexMap = new Map();
  sortedLinks.forEach((link, index) => {
    idToIndexMap.set(link.id, index);
  });

  visit(tree, 'element', (node) => {
    if (node.tagName === 'section' && node.properties.className?.includes('footnotes')) {
      // 注入排序后的数据
      node.properties['data-footnote-links'] = JSON.stringify(sortedLinks);
    }

    if (node.tagName === 'sup') {
      const link = node.children.find((n: any) => n.tagName === 'a');

      if (link) {
        const originalId = link.properties?.id;

        // 修复：处理带后缀的脚注引用ID
        // user-content-fnref-18-6 -> 提取 18
        const match = originalId?.match(/^user-content-fnref-(\d+)(?:-\d+)?$/);
        const linkRefIndex = match ? match[1] : null;

        if (linkRefIndex !== null && linksData[linkRefIndex]) {
          // 获取在排序数组中的索引
          const sortedIndex = idToIndexMap.get(linkRefIndex);

          if (sortedIndex !== undefined) {
            // 使用排序后的数据
            link.properties['data-link'] = JSON.stringify(sortedLinks[sortedIndex]);

            // 更新显示的数字为排序后的位置（从1开始）
            const displayNumber = sortedIndex + 1;
            if (link.children && link.children[0] && link.children[0].type === 'text') {
              link.children[0].value = displayNumber.toString();
            }
          } else {
            console.log('❌ 找不到排序索引 - linkRefIndex:', linkRefIndex);
          }
        } else {
          console.log('❌ 找不到排序索引 - linkRefIndex:', linkRefIndex);
        }
      }
    }
  });
};
