import React, {useState} from 'react';
React.useLayoutEffect = React.useEffect
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import styles from '@/styles/sidebar.module.css';
import Switch from '@mui/material/Switch';
import LogoComponent from './Logo';
import {BsGithub, BsLinkedin} from 'react-icons/bs';
import {FaUserCircle} from 'react-icons/fa';
import {AiOutlineHome, AiOutlineGithub, AiFillLinkedin, AiOutlineUser} from 'react-icons/ai';
import Link from 'next/link';
import { Divider } from '@mui/material';

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
                <MenuItem href="/"><AiOutlineHome className={styles.sidebarIcons}/>Home</MenuItem>
                <MenuItem><AiOutlineUser className={styles.sidebarIcons}/>Login</MenuItem>
                <Divider variant='middle'/>
                <SubMenu label="Products">
                    <MenuItem href='/products/'>All products</MenuItem>
                    <SubMenu label="Categories">
                        <MenuItem href='/products/category' className={styles.sidebarLinks}>Women&#39;s Clothing</MenuItem>
                        <MenuItem href='/products/category' className={styles.sidebarLinks}>Men&#39;s Clothing</MenuItem>
                        <MenuItem href='/products/category' className={styles.sidebarLinks}>Electronics</MenuItem>
                        <MenuItem href='/products/category' className={styles.sidebarLinks}>Jewelery</MenuItem>
                    </SubMenu>
                </SubMenu>
                <Divider variant='middle'/>
                <SubMenu label="My socials">
                    <MenuItem href='https://www.linkedin.com/in/mateocampillo/' target='_blank' rel='noreferrer' className={styles.sidebarLinks} onClick={() => handleSidebar()}><AiOutlineGithub className={styles.sidebarIcons}/>GitHub</MenuItem>
                    <MenuItem href='https://www.linkedin.com/in/mateocampillo/' target='_blank' rel='noreferrer' className={styles.sidebarLinks} onClick={() => handleSidebar()}><AiFillLinkedin className={styles.sidebarIcons}/>LinkedIn</MenuItem>
                </SubMenu>
                </Menu>
                <div className={styles.copy}>
                    <Divider variant='middle'/>
                    <h4>Mateo Campillo&nbsp;&copy;&nbsp;2023</h4>
                </div>
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
