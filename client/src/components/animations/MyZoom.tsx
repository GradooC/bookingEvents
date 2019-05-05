import React from 'react';
import { Zoom } from '@material-ui/core';
import { Theme, useTheme } from '@material-ui/core/styles';

interface MyZoomProps {
  isVisible: boolean;
}

const MyZoom: React.FC<MyZoomProps> = props => {
  const theme = useTheme<Theme>();
  const { children, isVisible } = props;

  const transitionDuration = {
    enter: theme.transitions.duration.complex,
    exit: theme.transitions.duration.complex
  };

  return (
    <Zoom
      in={isVisible}
      unmountOnExit
      appear={false}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${
          isVisible ? theme.transitions.duration.complex : 0
        }ms`
      }}
    >
      {children}
    </Zoom>
  );
};

export default MyZoom;
