// export const lightTheme = {
//   background: "#ffffff",
//   card: "#ffffff",
//   text: "rgba(0, 0, 0, 0.58)",
//   buttonBorder: "green",
//   borderColor:"#00000000",
//   dueColor:"rgba(245, 5, 5, 0.1)",
//   creditColor:"rgba(97, 245, 5, 0.1)"
// };

// export const darkTheme = {
//   background: "#121212",
//   card: "#1e1e1e",
//   text: "rgba(255, 255, 255, 0.68)",
//   buttonBorder: "#6c6e6c",
//   borderColor:"#8d8c8c",
//     dueColor:"rgba(245, 5, 5, 0.1)",
//   creditColor:"rgba(97, 245, 5, 0.1)"

// };

//themes
export const COLOR_SCHEME_LIGHT = 'light';
export const COLOR_SCHEME_DARK = 'dark';

export const announcementColor = '#FFF0EC';
export const formColor = '#D1FCFF';
export const auditColor = '#FFE5FF';

export const COLOR_SCHEMES = Object.freeze({
  [COLOR_SCHEME_LIGHT]: {
    icon: '#000000',
    background: '#FFFFFF',
    text: {
      light: '#808080',
      regular: '#454545',
      dark: '#000000',
    },
    primaryColor: {
      background: '#F3F8FF',
      selection: '#E0ECFF',
      fill: '#2D64B8',
      hover: '#2359AD',
    },
    status: {
      success: {
        background: '#F0FDF4',
        fill: '#169E48',
      },
      warning: { background: '#F9F0E2', fill: '#EB8F00' },
      error: { background: '#FFF8F8', fill: '#D8484E' },
      default: { background: '#F3F8FF', fill: '#454545' },
    },
    blur: {
      modal: {
        background: '#BCC1CC80',
      },
    },
    shadow: {
      button: '#4B86DF4D',
      dark: '#2222223D',
      light: '#99999940',
    },
    grey: {
      background: '#F5F5F5',
      border: '#F1F1F1',
      disabled: '#C5C5C5',
    },
    emptyComponentBackgroundColor: '#FCFCFC',
  },
  [COLOR_SCHEME_DARK]: {
    icon: '#FFFFFF',
    background: '#000000',

    text: {
      light: '#808080',
      regular: '#AAAAAA',
      dark: '#DDDDDD',
    },
    primaryColor: {
      background: '#232C38',
      selection: '#263B5A',
      fill: '#679BEA',
      hover: '#8CBAFF',
    },
    status: {
      success: { background: '#243E27', fill: '#3F975F' },
      warning: { background: '#3E3624', fill: '#CD810C' },
      error: { background: '#43292A', fill: '#E38083' },
      default: { background: '#232C38', fill: '#AAAAAA' },
    },
    blur: {
      modal: {
        background: '#484D5780',
      },
    },
    shadow: {
      button: '#679BEA4D',
      dark: '#DDDDDD3D',
      light: '#DDDDDD40',
    },
    grey: {
      background: '#1F1F1F',
      border: '#333333',
      disabled: '#6A6A6A',
    },
    emptyComponentBackgroundColor: '#1C1C1C',
  },
});
