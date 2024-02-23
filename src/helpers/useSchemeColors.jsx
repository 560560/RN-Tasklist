import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';

export const useSchemeColors = () => {
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const mainTextColor = useSelector((state) => state.config?.mainTextColor, isEqual);
  const iconSecondColor = useSelector((state) => state.config?.iconSecondColor, isEqual);
  const backgroundColor = useSelector((state) => state.config?.background, isEqual);
  const secondTextColor = useSelector((state) => state.config?.secondTextColor, isEqual);

  return { mainColor, mainTextColor, iconSecondColor, backgroundColor, secondTextColor };
};
