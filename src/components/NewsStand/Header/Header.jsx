import React from 'react';
import { Link, routes } from '@utils/Router';
import { myNewsModeState, carouselXSelector, carouselMoveState } from '@recoilStore/news';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DirectionBtnWrap, HeaderWrap, MyNewsBtnWrap, NewsStandSortBtnWrap, RightControlBtnWrap } from './Header.style';
import { HEADER_BTN, MODE } from '@utils/constant';
import { useNewsMove, usePaging, usePath, useTimer } from '@hooks';

const Header = () => {
  const { path } = usePath();
  const { moveNewsCompany } = useNewsMove();
  const { movePaging } = usePaging();
  const setNewsMode = useSetRecoilState(myNewsModeState);

  const setX = useSetRecoilState(carouselXSelector);
  const moving = useRecoilValue(carouselMoveState);

  const onMove = (direction) => {
    const panelWidth = 1050;
    setX((prevX) => prevX + direction * panelWidth);
  };

  useTimer({ path, moveNewsCompany });

  const handleClickArrow = ({
    target: {
      name,
      dataset: { direction },
    },
  }) => {
    if (path === routes.mynews.path) {
      if (moving) return;
      onMove(direction);
      return moveNewsCompany(name);
    }
    if (path === routes.newscompany.path) return movePaging(name);
  };

  const changeViewMode = ({ target: { name } }) => setNewsMode(name);

  const MyNewsBtnList = () => {
    if (path === routes.mynews.path) {
      return (
        <MyNewsBtnWrap>
          <button name={MODE.LIST} onClick={changeViewMode}>
            {MODE.LIST}
          </button>
          <button name={MODE.CARD} onClick={changeViewMode}>
            {MODE.CARD}
          </button>
        </MyNewsBtnWrap>
      );
    }
    return null;
  };

  return (
    <HeaderWrap>
      <NewsStandSortBtnWrap>
        <Link to={routes.mynews.path}>{HEADER_BTN.SUBSCRIPTION_COMPANY}</Link>
        <Link to={routes.newscompany.path}>{HEADER_BTN.ALL_COMPANY}</Link>
      </NewsStandSortBtnWrap>
      <RightControlBtnWrap>
        <MyNewsBtnList />
        <DirectionBtnWrap>
          <button name={HEADER_BTN.PREV.title} data-direction="1" onClick={handleClickArrow}>
            {HEADER_BTN.PREV.symbol}
          </button>
          <button name={HEADER_BTN.NEXT.title} data-direction="-1" onClick={handleClickArrow}>
            {HEADER_BTN.NEXT.symbol}
          </button>
        </DirectionBtnWrap>
      </RightControlBtnWrap>
    </HeaderWrap>
  );
};

export default Header;
