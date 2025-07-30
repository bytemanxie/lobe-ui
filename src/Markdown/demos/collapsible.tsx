import type { ReactNode } from 'react';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { SKIP, visit } from 'unist-util-visit';

import { Markdown } from '@/index';

// 工具调用数据类型
interface ToolCallData {
  output: string;
  tool_input: any[];
  tool_name: string;
}

// 模拟的工具调用数据
const toolCallData: ToolCallData = {
  output: '我来帮你查找 Python Playwright 如何控制键盘快捷键的文档，并给你一个完整的 async 示例。',
  tool_input: [{ libraryName: 'playwright python' }],
  tool_name: 'resolve-library-id',
};

// 另一个工具调用示例
const toolCallData2: ToolCallData = {
  output:
    '找到了相关的 Playwright Python 键盘快捷键文档和示例代码。Playwright 提供了 keyboard.press() 和 keyboard.type() 等方法来模拟键盘输入。',
  tool_input: [{ query: 'playwright python keyboard shortcuts example' }],
  tool_name: 'web-search',
};

// 可折叠工具调用组件
const ToolCallComponent = ({
  data,
  isExpanded: initialExpanded = false,
}: {
  data: ToolCallData;
  isExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div
      style={{
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        margin: '8px 0',
        overflow: 'hidden',
      }}
    >
      {/* 可点击的标题栏 */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          alignItems: 'center',
          background: '#f8f9fa',
          borderBottom: isExpanded ? '1px solid #e1e5e9' : 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}
      >
        <span
          style={{
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          📝 已使用 {data.tool_name}
        </span>
        <span
          style={{
            fontSize: '12px',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          ▼
        </span>
      </div>

      {/* 可折叠的内容区域 */}
      {isExpanded && (
        <div style={{ padding: '16px' }}>
          {/* 请求部分 */}
          <div style={{ marginBottom: '16px' }}>
            <h4
              style={{
                color: '#374151',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 8px 0',
              }}
            >
              请求
            </h4>
            <pre
              style={{
                background: '#f8f9fa',
                borderRadius: '6px',
                fontSize: '13px',
                margin: 0,
                overflow: 'auto',
                padding: '12px',
              }}
            >
              <code>{JSON.stringify(data.tool_input, null, 2)}</code>
            </pre>
          </div>

          {/* 响应部分 */}
          <div>
            <h4
              style={{
                color: '#374151',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 8px 0',
              }}
            >
              响应
            </h4>
            <div
              style={{
                background: '#f8f9fa',
                borderRadius: '6px',
                color: '#374151',
                fontSize: '13px',
                lineHeight: '1.5',
                padding: '12px',
              }}
            >
              {data.output}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 创建 tool-call remark 插件
const createToolCallPlugin = () => {
  return (tree: any) => {
    visit(tree, 'html', (node, index, parent) => {
      if (typeof index !== 'number' || !parent) return;

      // 匹配 <tool-call ...> 标签
      const toolCallMatch = node.value?.match(/<tool-call\s+([^>]*)>/);
      if (toolCallMatch) {
        // 解析属性
        const attributesString = toolCallMatch[1];
        const dataMatch = attributesString.match(/data="([^"]*)"/);
        const expandedMatch = attributesString.match(/expanded="([^"]*)"/);

        if (dataMatch) {
          // 创建自定义节点
          const customNode = {
            data: {
              hName: 'tool-call',
              hProperties: {
                data: dataMatch[1],
                expanded: expandedMatch ? expandedMatch[1] : 'false',
              },
            },
            position: node.position,
            type: 'toolCallBlock',
          };

          // 替换原始节点
          parent.children[index] = customNode;
          return [SKIP, index + 1];
        }
      }
    });
  };
};

const ToolCallPlugin = createToolCallPlugin();

// 使用 tool-call 标签的内容
const contentWithToolCall = `
# 工具调用展示

## 可折叠工具调用（默认折叠）

<tool-call data="${JSON.stringify(toolCallData).replaceAll('"', '&quot;')}" expanded="false">

## 默认展开的工具调用

<tool-call data="${JSON.stringify(toolCallData).replaceAll('"', '&quot;')}" expanded="true">

## 另一个工具调用示例

<tool-call data="${JSON.stringify(toolCallData2).replaceAll('"', '&quot;')}" expanded="false">
`;

export default () => {
  return (
    <Flexbox padding={16}>
      <Markdown
        components={{
          'tool-call': (props: { children?: ReactNode; data?: string; expanded?: string }) => {
            try {
              const data = JSON.parse(props.data?.replace(/&quot;/g, '"') || '{}') as ToolCallData;
              const expanded = props.expanded === 'true';
              return <ToolCallComponent data={data} isExpanded={expanded} />;
            } catch (error) {
              return (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    color: '#dc2626',
                    padding: '12px',
                  }}
                >
                  无效的工具调用数据: {error instanceof Error ? error.message : '解析错误'}
                </div>
              );
            }
          },
        }}
        remarkPlugins={[ToolCallPlugin]}
        variant={'chat'}
      >
        {contentWithToolCall}
      </Markdown>
    </Flexbox>
  );
};
