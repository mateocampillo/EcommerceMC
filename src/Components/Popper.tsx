import React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {AiOutlineInfoCircle} from 'react-icons/ai';

interface propList {
    boxContent: string
}

export default function SimplePopper(props: propList) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <AiOutlineInfoCircle aria-describedby={id} onClick={handleClick} />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box>
          {props.boxContent}
        </Box>
      </Popper>
    </div>
  );
}