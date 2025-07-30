import { Markdown, MarkdownProps } from '@lobehub/ui';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui/storybook';

import { AProps } from '@/types';

import { content2 } from './data';

const CustomA = (props: AProps) => {
  return <a {...props} style={{ color: 'red' }} target="_blank" />;
};

export default () => {
  const store = useCreateStore();
  const options = useControls(
    {
      children: {
        rows: true,
        value: content2,
      },
      fullFeaturedCodeBlock: false,
    },
    { store },
  ) as MarkdownProps;

  return (
    <StoryBook levaStore={store}>
      <Markdown
        {...options}
        componentProps={{
          img: {
            style: {
              border: '5px solid green',
              borderRadius: '20px',
            },
          },
        }}
        components={{
          a: CustomA,
          think: (props) => (
            <div style={{ border: '5px solid red', borderRadius: '20px' }} {...props} />
          ),
        }}
      />
    </StoryBook>
  );
};
