import { FormatBold, FormatItalic } from '@material-ui/icons';

const blockTypes = [
  {
    label: 'H1',
    style: 'header-one',
  },
  {
    label: 'H2',
    style: 'header-two',
  },
  {
    label: 'H3',
    style: 'header-three',
  },
  {
    label: 'H4',
    style: 'header-four',
  },
  {
    label: '``',
    style: 'blockquote',
  },
  {
    label: '< >',
    style: 'code-block',
  },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
];

const inlineStyles = [
  {
    label: 'bold',
    style: 'BOLD',
    icon: <FormatBold />,
  },
  {
    label: 'italic',
    style: 'ITALIC',
    icon: <FormatItalic />,
  },
];

export { blockTypes, inlineStyles };
