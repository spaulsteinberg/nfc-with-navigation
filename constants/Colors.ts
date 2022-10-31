const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const statusColors = {
  ready: "green",
  seated: "#9c27b0",
  cleaning: "blue",
  dirty: "red"
}

export { statusColors }

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  main: {
    text: "#fff",
    background: "red"
  }
};
