import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {Mulish} from 'next/font/google';
import styles from '@/styles/popper.module.css';

interface propList {
    title: string,
    firstInput?: string,
    secondInput?: string
}

const mulish = Mulish({weight: ['300'], style: ['normal'], subsets: ['latin']})

export default function SimplePopper(props: propList) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button style={{backgroundColor: 'transparent', border: 'none'}} aria-describedby={id} type="button" onClick={handleClick}>
        <AiOutlineInfoCircle />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} className={[styles.popperContainer, mulish.className].join(" ")}>
        <Box>
          <h3>{props.title}</h3>
          <p>{props.firstInput}</p>
          <p>{props.secondInput}</p>
        </Box>
      </Popper>
    </div>
  );
}