import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import palette from './palette';
import typography from './typography';

// Create a theme instance.
const theme = createMuiTheme({
  shape: {
    borderRadius: 14,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 2,
      },
    },
    MUIRichTextEditor: {
      root: {
        color: palette.text.primary,
      },
      container: {
        margin: 0,
        padding: 0,
        borderRadius: 2,
        backgroundColor: palette.background.paper,
        toolbar: {},
      },
      editor: {
        //height: 200,
        minHeight: 150,
        padding: 10,
        lineHeight: 1.5,
        backgroundColor: palette.background.default,
        //borderBottom: "1px solid gray",
        fontSize: 18,
      },
      placeHolder: {
        color: palette.text.secondary,
        fontSize: 18,
      },

      editorContainer: {
        minHeight: '130px',
        margin: 0,
        padding: 10,

        '& *': {
          minHeight: '100%',
        },

        '& div[class^="CodeBlock-root-"]': {
          color: palette.text.primary,
          borderRadius: 2,
          lineHeight: 0.8,
          backgroundColor: palette.background.codeBlock,
        },
        '& div[class^="Blockquote-root-"]': {
          color: palette.text.primary,
        },
      },
      toolbar: {
        borderBottom: '1px solid #ccc',
        padding: '5px',
      },
    },
    MuiIconButton: {
      root: {
        color: '#fff',
        '&:hover': {
          color: '#ccc',
        },
      },
    },
  },
  palette,
  typography,
});

export default theme;
