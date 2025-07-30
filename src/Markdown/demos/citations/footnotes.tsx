import { toMarkdown } from 'mdast-util-to-markdown';
import React from 'react';
import { Flexbox } from 'react-layout-kit';
import { Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

import { Markdown } from '@/index';

const code = `
<think>

嗯，用户想要了解英伟达(NVDA)最近和未来一个月内的重大事件。让我梳理一下搜索结果中的关键信息。

首先关于近期事件，2025年8月7日有个YouTube技术分析视频讨论了英伟达股票走势的关键点位[^14]。更重要的是即将在2025年8月27日盘后发布的2026财年第二季度财报[^3][^23][^92][^94][^96]，这个被Wedbush分析师称为"科技行业多年来最重要的事件"[^1][^4]。

未来一个月的重要活动包括：
- 2025年8月10-14日：SIGGRAPH 2025大会在温哥华举行，英伟达将展示OpenUSD、生成式AI等前沿技术[^5][^9]
- 2025年8月12-21日：NCSA Open活动（具体内容未详述）[^35]
- 2025年8月27日：第二季度财报电话会议，具体时间是太平洋时间下午2点[^92]

产品方面注意到两条信息：一是计划在2025年7月推出的中国特供版H20 AI芯片[^10][^16]，二是传闻将在2026年推出的下一代Rubin芯片平台[^78]。

需要验证时间范围是否在"未来一个月"内（当前时间2025-08-08）。CES 2025和GTC 2025都已过去，Blackwell芯片量产计划在2024年第四季度[^40]，与当前查询时段不直接相关。同样，RTX 50系列显卡已在2025年1月发布[^27][^49]，不在近期事件范围内。

市场影响方面，分析师普遍关注8月27日的财报表现[^90][^94]，高盛等机构近期还上调了目标股价[^94]。不过用户明确要求事件信息而非股价预测。

最后检查是否有遗漏：2025年8月7日的股票技术分析属于"最近"事件[^14]，而金融界专属活动仅显示日期为2024年11月[^36]，不在查询时段内。

</think>
根据搜索结果，以下是英伟达（NVDA）近期及未来一个月（截至2025年9月8日）的重大事件汇总：

---

### 📅 一、近期已发生事件（最近一周）
1. **2025年8月7日：股票技术分析发布**  
   - YouTube频道发布针对英伟达股票的价格分析视频，讨论8月7日关键支撑与阻力位，并预测短期交易策略[^14]。

---

### 🚀 二、未来一个月重大事件
#### 1. **2025年8月27日：2026财年第二季度财报发布**  
   - **时间**：太平洋时间下午2点（美东时间下午5点）盘后公布[^3][^23][^89][^92][^96]。  
   - **重要性**：被Wedbush分析师称为“科技行业多年来最重要的事件”，预计将披露数据中心业务增长、Blackwell芯片进展及AI需求趋势[^1][^4][^13]。  
   - **预期**：分析师普遍预测营收约286.7亿美元，每股收益0.64美元，数据中心业务收入或达251.9亿美元（同比增长超100%）[^4][^22]。

#### 2. **2025年8月10日-14日：SIGGRAPH 2025大会**  
   - **地点**：加拿大温哥华会议中心[^5][^9]。  
   - **内容**：英伟达将展示OpenUSD、生成式AI、机器人技术及空间计算领域的最新进展[^5][^17]。

#### 3. **2025年8月12日-21日：NCSA Open活动（推测为技术峰会）**  
   - 具体议程未公开，但列入英伟达官方活动日历[^35]。

---

### 🔍 三、其他关联动态
- **Blackwell芯片进展**：量产按计划推进，预计未来12个月内售罄[^40]。  
- **中国特供版AI芯片**：计划7月推出调整版H20芯片，以符合美国出口限制[^10][^16][^51]。  
- **下一代产品布局**：  
  - 2025年推出Blackwell Ultra芯片，2026年发布Rubin平台[^78]。  
  - CES 2025已发布RTX 5080/5090显卡（2025年1月）[^18][^27][^49]。

---

### 📊 英伟达未来1个月重大事件概览
| **日期**       | **事件类型**       | **关键内容**                                | **来源引用**       |
|----------------|--------------------|--------------------------------------------|--------------------|
| 2025-08-27     | 财报发布           | Q2 FY26业绩，数据中心与AI需求分析          | [^1][^3][^23][^92] |
| 2025-08-10至14 | 行业会议           | SIGGRAPH展示AI与图形技术突破               | [^5][^9][^17]      |
| 2025-08-12至21 | 技术峰会           | NCSA Open（议程未完全公开）               | [^35]              |

---

### 💎 总结
- **核心焦点**：**8月27日财报**是未来一个月最受关注的事件，可能影响科技股整体走势[^1][^90][^94]。  
- **技术动向**：SIGGRAPH大会或透露AI与机器人技术新应用[^5][^73]。  
- **风险提示**：需关注Blackwell芯片量产进度及中国市场需求变化[^40][^51]。

> 注：未列入CES 2025（2025年1月）及GTC 2025（2025年3月）等已过期会议。更多细节可查阅[英伟达投资者关系页面](https://investor.nvidia.com)[^3][^89]。

---


[^1]: [Wedbush:英伟达(NVDA.US)下周公布的Q2财报将是今年“最重要”事件_腾讯新闻](https://new.qq.com/rain/a/20240823A09LL200)
[^3]: [NVIDIA Corporation - Events & Presentations](https://investor.nvidia.com/events-and-presentations/events-and-presentations/default.aspx)
[^4]: [Wedbush:英伟达(NVDA.US)下周公布的Q2财报将是今年“最重要”事件](https://www.zhitongcaijing.com/content/detail/1169824.html)
[^5]: [NVIDIA at SIGGRAPH 2025](https://www.nvidia.com/en-us/events/siggraph/)
[^9]: [NVIDIA at SIGGRAPH 2025](https://www.nvidia.com/en-us/events/siggraph/)
[^10]: [英伟达 (NVDA) 新闻动态 - 富途牛牛](https://www.futunn.com/stock/NVDA-US/news/news?code=01970)
[^13]: [关键拐点！英伟达将代表美股交出答卷，华尔街准备迎接超级碗行情](https://m.sohu.com/a/804059671_120170089/?pvid=000115_3w_a)
[^14]: [Top $NVDA Levels To Watch for August 7th, 2025 - YouTube](https://www.youtube.com/watch?v=yBHMATOGawc)
[^16]: [英伟达 (NVDA) 新闻动态 - 富途牛牛](https://www.futunn.com/stock/NVDA-US/news/news?m=hk&code=00893&type=equity)
[^17]: [Explore What's Next in AI From NVIDIA GTC 2025](https://www.nvidia.com/gtc/)
[^18]: [英伟达确认 2025 年 CES 主题演讲，可能发布 RTX 50 系列-Notebookcheck-cn.com News](https://www.notebookcheck-cn.com/2025-CES-RTX-50.898891.0.html)
[^22]: [英伟达(NVDA) Q2财报 英伟达 前瞻 1、概述 1博弈 Nvidia 公司将于 8 月28 日公布第二季度... - 雪球](https://xueqiu.com/8322940088/301183024)
[^23]: [NVIDIA Sets Conference Call for Second-Quarter Financial ...](https://www.stocktitan.net/news/NVDA/nvidia-sets-conference-call-for-second-quarter-financial-xv9m1foybh0b.html)
[^27]: [GeForce RTX 50 series - Wikipedia](https://en.wikipedia.org/wiki/GeForce_RTX_50_series#:~:text=The%20GeForce%20RTX%2050%20series,5090%20on%20January%2030%2C%202025.)
[^35]: [NVIDIA Corporate and Investor Events Calendar](https://www.nvidia.com/en-us/events/)
[^40]: [英伟达的Blackwell AI处理器将在未来12个月内售罄-指股网](https://www.zhiguf.com/focusnews_detail/1512238)
[^49]: [CES 2025: NVIDIA GeForce RTX 50 Series GPUs and ...](https://pcper.com/2025/01/ces-2025-nvidia-geforce-rtx-50-series-gpus-and-dlss-4/)
[^51]: [Nvidia to launch cheaper Blackwell AI chip for China after ...](https://www.reuters.com/world/china/nvidia-launch-cheaper-blackwell-ai-chip-china-after-us-export-curbs-sources-say-2025-05-24/)
[^73]: [Nvidia Unveils Expansive AI Roadmap at GTC 2025](https://finance.yahoo.com/news/nvidia-unveils-expansive-ai-roadmap-210844927.html)
[^78]: [英伟达CEO宣布AI芯片新战略,股价创新高-电子发烧友网](https://www.elecfans.com/d/3105911.html)
[^89]: [NVIDIA Corporation - Events & Presentations](https://investor.nvidia.com/events-and-presentations/events-and-presentations/default.aspx)
[^90]: [Prediction: Nvidia Stock Is Going to Soar After Aug. 27](https://finance.yahoo.com/news/prediction-nvidia-stock-going-soar-085100019.html)
[^92]: [NVIDIA 2nd Quarter FY26 Financial Results](https://investor.nvidia.com/events-and-presentations/events-and-presentations/event-details/2025/NVIDIA-2nd-Quarter-FY26-Financial-Results/default.aspx)
[^94]: [Nvidia gets price target hike from Goldman Sachs ahead of ...](https://www.cnbc.com/2025/08/07/nvidia-gets-price-target-hike-from-goldman-sachs-ahead-of-earnings.html)
[^96]: [NVIDIA Sets Conference Call for Second-Quarter Financial ...](https://nvidianews.nvidia.com/news/nvidia-sets-conference-call-for-second-quarter-financial-results-6912330)
`;

// 预处理函数：确保 think 标签前后有两个换行符
export const normalizeThinkTags = (input: string) => {
  return (
    input
      // 确保 <think> 标签前后有两个换行符
      .replaceAll(/([^\n])\s*<think>/g, '$1\n\n<think>')
      .replaceAll(/<think>\s*([^\n])/g, '<think>\n\n$1')
      // 确保 </think> 标签前后有两个换行符
      .replaceAll(/([^\n])\s*<\/think>/g, '$1\n\n</think>')
      .replaceAll(/<\/think>\s*([^\n])/g, '</think>\n\n$1')
      // 处理可能产生的多余换行符
      .replaceAll(/\n{3,}/g, '\n\n')
  );
};

const message = normalizeThinkTags(code);

// Move function definitions before component
export const createRemarkCustomTagPlugin = (tag: string) => () => {
  return (tree: any) => {
    visit(tree, 'html', (node, index, parent) => {
      if (node.value === `<${tag}>`) {
        const startIndex = index as number;
        let endIndex = startIndex + 1;
        let hasCloseTag = false;

        // 查找闭合标签
        while (endIndex < parent.children.length) {
          const sibling = parent.children[endIndex];
          if (sibling.type === 'html' && sibling.value === `</${tag}>`) {
            hasCloseTag = true;
            break;
          }
          endIndex++;
        }

        // 计算需要删除的节点范围
        const deleteCount = hasCloseTag
          ? endIndex - startIndex + 1
          : parent.children.length - startIndex;

        // 提取内容节点
        const contentNodes = parent.children.slice(
          startIndex + 1,
          hasCloseTag ? endIndex : undefined,
        );

        // 将内容节点作为 mdast children 保留，交由 remark-rehype 转换；
        // 指定 data.hName 让它在 hast 中变成 <think>
        const customNode = {
          children: contentNodes,
          data: {
            hName: tag,
          },
          position: node.position,
          type: `${tag}Block`,
        };

        // 替换原始节点
        parent.children.splice(startIndex, deleteCount, customNode);
        // 跳过已处理的节点
        return [SKIP, startIndex + 1];
      }
    });
  };
};

const ThinkElement = createRemarkCustomTagPlugin('think');

export default () => {
  return (
    <Flexbox padding={16}>
      <Markdown
        components={{
          think: (props: { children?: React.ReactNode }) => {
            return (
              <div
                style={{
                  backgroundColor: '#f0f0f0',
                  borderLeft: '4px solid #007acc',
                  borderRadius: '6px',
                  margin: '8px 0',
                  padding: '12px',
                }}
              >
                <strong>思考过程：</strong>
                <div style={{ marginTop: '8px' }}>{props.children}</div>
              </div>
            );
          },
        }}
        enableCustomFootnotes
        remarkPlugins={[ThinkElement]}
        variant={'chat'}
      >
        {message}
      </Markdown>
    </Flexbox>
  );
};

const processNode = (node: any): string => {
  //! EAM - 处理脚注引用
  if (node.type === 'footnoteReference') {
    return `[^${node.identifier}]`;
  }

  // 处理数学公式节点
  if (node.type === 'inlineMath') {
    return `$${node.value}$`;
  }

  if (node.type === 'link') {
    const text = node.children?.[0] ? processNode(node.children?.[0]) : '';

    return `[${text}](${node.url})`;
  }

  // 处理带有子节点的容器
  if (node.children) {
    const content = node.children.map((element: Parent) => processNode(element)).join('');

    // 处理列表的特殊换行逻辑
    if (node.type === 'list') {
      return `\n${content}\n`;
    }

    // 处理列表项的前缀
    if (node.type === 'listItem') {
      const prefix = node.checked !== null ? `[${node.checked ? 'x' : ' '}] ` : '';
      return `${prefix}${content}`;
    }

    return content;
  }

  // 处理文本节点
  if (node.value) {
    // 保留原始空白字符处理逻辑
    return node.value.replaceAll(/^\s+|\s+$/g, ' ');
  }

  // 兜底使用标准转换
  return toMarkdown(node);
};

export const treeNodeToString = (nodes: Parent[]) => {
  return nodes
    .map((node) => {
      // 处理列表的缩进问题 !! EAM - 2025-07-16
      if (node.type === 'list') {
        return node.children
          .map((item, index) => {
            // 在列表符号前添加零宽空格，避免被 Markdown 渲染器二次处理 !! EAM - 2025-07-16
            const prefix = (node as any).ordered
              ? `\u200B${(node as any).start + index}. `
              : `\u200B- `;
            return `${prefix}${processNode(item)}`;
          })
          .join('\n');
      }

      return processNode(node);
    })
    .join('\n\n')
    .trim();
};
