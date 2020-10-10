import { FormatBold, FormatItalic, FormatUnderlined } from '@material-ui/icons';

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
    type: 'header-three',
  },
  {
    label: 'H4',
    type: 'header-four',
  },
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
  {
    label: 'Underline',
    style: 'UNDERLINE',
    icon: <FormatUnderlined />,
  },
];

export { blockTypes, inlineStyles };
