import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { carouselMoveState, carouselXSelector, transitionState } from '@recoilStore/news';
import { useEffect } from 'react';

export const useTransition = ({ carouselWidth, subscribeList }) => {
  const panelCount = subscribeList.length;

  const [x, setX] = useRecoilState(carouselXSelector);
  const setMoving = useSetRecoilState(carouselMoveState);
  const [transitionsValue, setTransitionValue] = useRecoilState(transitionState);
  const resetTransition = useResetRecoilState(transitionState);

  const onTransitionEnd = () => {
    setMoving(false);
    if (x === -carouselWidth * panelCount) {
      setTransitionValue('none');
      setX(0);
    } else if (x === carouselWidth) {
      setTransitionValue('none');
      setX(-carouselWidth * (panelCount - 1));
    }
  };

  const ulStyles = {
    transform: `translate3d(${x}px, 0, 0)`,
    transition: transitionsValue,
  };

  useEffect(() => {
    if (transitionsValue === 'none') resetTransition();
  }, [transitionsValue]);

  return {
    ulStyles,
    onTransitionEnd,
  };
};
