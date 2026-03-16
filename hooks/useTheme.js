import { useSelector } from 'react-redux';
import { COLOR_SCHEMES } from '../components/common/color';

const useTheme = () => {
  const color = useSelector(state => state.theme.theme);

  if (color == 'dark') {
    return COLOR_SCHEMES.dark;
  } else {
    return COLOR_SCHEMES.light;
  }
};

export default useTheme;
