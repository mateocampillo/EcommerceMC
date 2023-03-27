import React, {useState} from 'react';
React.useLayoutEffect = React.useEffect
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import styles from '@/styles/sidebar.module.css';
import Image from 'next/image';
import Switch from '@mui/material/Switch';
import Link from 'next/link';

const label = { inputProps: { 'aria-label': 'Sidebar switch' } };

export default function SidebarComponent() {

    const {collapseSidebar} = useProSidebar();
    const [checked, setChecked] = useState(false);

    function handleSidebar() {
        collapseSidebar();
        checked === false ? setChecked(true) : setChecked(false);
    }

    return (
        <header>
            <Sidebar className={styles.container} collapsedWidth='0' width={'100vw'} transitionDuration={400} defaultCollapsed={true}>
                <Menu className={styles.menu}>
                <Switch {...label} onChange={() => handleSidebar()} checked={checked}/>
                <MenuItem href="/">Home</MenuItem>
                <MenuItem href="/products">Products</MenuItem>
                <SubMenu label="Charts">
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                </Menu>
            </Sidebar>
            <div>
                <Switch {...label} onChange={() => handleSidebar()} checked={checked}/>
                <Link href={'/'}><Image src='/img/logo/logo.png' alt='Imagen de logo' width={100} height={80}/></Link>
            </div>
        </header>
    )
}
