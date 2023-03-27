import React, {useState} from 'react';
React.useLayoutEffect = React.useEffect
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import styles from '@/styles/sidebar.module.css';
import Switch from '@mui/material/Switch';
import LogoComponent from './Logo';
import {BsGithub, BsLinkedin} from 'react-icons/bs';
import {FaUserCircle} from 'react-icons/fa';
import Link from 'next/link';

const label = { inputProps: { 'aria-label': 'Sidebar switch' } };

export default function SidebarComponent() {

    const {collapseSidebar} = useProSidebar();
    const [checked, setChecked] = useState(false);

    function handleSidebar() {
        collapseSidebar();
        checked === false ? setChecked(true) : setChecked(false);
    }

    function handleUser() {
        console.log('handleUser');
    }

    return (
        <header>
            {/* Menu SIDEBAR */}
            <Sidebar className={styles.container} collapsedWidth='0' width={'100vw'} transitionDuration={400} defaultCollapsed={true}>
                <Menu className={styles.menu}>
                <Switch {...label} onChange={() => handleSidebar()} checked={checked}/>
                <div className={styles.sidebarLogoContainer}><LogoComponent /></div>
                <MenuItem href="/">Home</MenuItem>
                <MenuItem href="/products">Products</MenuItem>
                <SubMenu label="Socials">
                    <MenuItem href='https://www.linkedin.com/in/mateocampillo/' target='_blank' className={styles.sidebarLinks}>GitHub</MenuItem>
                    <MenuItem href='https://www.linkedin.com/in/mateocampillo/' target='_blank' className={styles.sidebarLinks}>LinkedIn</MenuItem>
                </SubMenu>
                </Menu>
            </Sidebar>
            {/* Menu HEADER */}
            <div className={styles.headerContainer}>
                <Switch {...label} onChange={() => handleSidebar()} checked={checked}/>
                <LogoComponent />
                <Link href='https://github.com/mateocampillo' target='_blank'><BsGithub className={styles.icon}/></Link>
                <Link href='https://www.linkedin.com/in/mateocampillo/' target='_blank'><BsLinkedin className={styles.icon}/></Link>
                <FaUserCircle className={styles.icon} onClick={handleUser}/>
            </div>
        </header>
    )
}
