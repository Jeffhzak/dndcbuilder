
import { ModalUnstyled } from '@mui/core'
import { styled, Box } from '@mui/system';

import React from 'react'


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};


export default function Classinfo(props) {
  return (
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={props?.modalinfo?.open}
        onClose={props?.modalinfo?.closeFn}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Text in a modal</h2>
          <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
        </Box>
      </StyledModal>
  );
}
