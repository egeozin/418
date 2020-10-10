import React from 'react';
import createStyles from 'draft-js-custom-styles';

import { Container, ToolbarItem } from './Common';

//STYLES THAT WILL BE TOGGELED
const { styles, customStyleFn } = createStyles(
  ['font-size', 'color'],
  'CUSTOM_'
);

const customStyles = [
  {
    label: 'red-color',
    // icon: <FontAwesomeIcon icon={faAnchor} />,
    styler: (editorState) => {
      return styles.color.toggle(editorState, 'red');
    },
  },
];

export function RenderCustomStyles(props) {
  const { editorState, updateEditorState } = props;

  const applyCustomStyle = (item) => {
    if (item) {
      const newEditorState = item.styler(editorState);
      updateEditorState(newEditorState);
    }
  };

  return (
    <Container>
      {customStyles.map((item, idx) => {
        return (
          <ToolbarItem
            key={`${item.label}-${idx}`}
            onClick={(e) => applyCustomStyle(item)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}

export { customStyles, customStyleFn };
