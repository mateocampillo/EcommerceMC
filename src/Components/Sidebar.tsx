'use client';
import React, {useState, useEffect} from 'react';
React.useLayoutEffect = React.useEffect
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import styles from '@/styles/sidebar.module.css';
import Switch from '@mui/material/Switch';
import LogoComponent from './Logo';
import {BsGithub, BsLinkedin} from 'react-icons/bs';
import {FaUserCircle} from 'react-icons/fa';
import {BiLogOutCircle} from 'react-icons/bi';
import {AiOutlineHome, AiOutlineGithub, AiFillLinkedin, AiOutlineUser,AiOutlineShoppingCart} from 'react-icons/ai';
import Link from 'next/link';
import { Divider } from '@mui/material';
import ModalComments from './ModalComments'
import { Poppins } from 'next/font/google';
import { signIn } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useAppSelector } from '../../store/store';
import { totalCartItemSelector } from '../../store/features/cartSlice';

const label = { inputProps: { 'aria-label': 'Sidebar switch' } };
const poppins = Poppins({weight: ['300'], style: ['normal'], subsets: ['latin']})

export default function SidebarComponent() {

    const { data, status } = useSession();

    const {collapseSidebar} = useProSidebar();
    const [checked, setChecked] = useState(false);
    const totalItems = useAppSelector(totalCartItemSelector);

    function handleSidebar(): void {
        collapseSidebar();
        checked === false ? setChecked(true) : setChecked(false);
        let body: HTMLElement = document.querySelector('body')!;
        body.classList.contains('stop-scroll') === true ? body.classList.remove('stop-scroll') : body.classList.add('stop-scroll');
    }

    function handleUser(): void {
        console.log('handleUser');
    }

    useEffect(():void => {
        function retrasarSidebarDisplay() {
            document.getElementById('menuSidebar')!.style.display = 'block'
        }
        setTimeout(retrasarSidebarDisplay, 300);
    }, [])

    let userButtons;
    if ( status === 'unauthenticated' ) {
        userButtons = <MenuItem onClick={() => {
                        signIn();
                    }}><AiOutlineUser className={styles.sidebarIcons}/>Login</MenuItem>
    } else if ( status === 'authenticated') {
        let img = data.user?.image as string;
        userButtons = 
            <SubMenu label={data.user?.name} id='subMenuUser'>
                <MenuItem className={styles.sidebarLinks}><Image alt='imagen de usuario' src={img} width={40} height={30}/>My profile</MenuItem>
                <MenuItem href='/users/cart'><AiOutlineShoppingCart className={styles.sidebarIcons}/>Cart{
                    !!totalItems && (
                        <p className={styles.sidebarCartNumber}>{totalItems}</p>
                    )
                }</MenuItem>
                <MenuItem onClick={() => signOut()}><BiLogOutCircle className={styles.sidebarIcons}/>Logout</MenuItem>
            </SubMenu>
                
    }

    return (
        <header>
            {/* Menu SIDEBAR */}
            <Sidebar id='menuSidebar' className={[styles.container, poppins.className].join(" ")} collapsedWidth='0' width={'100vw'} transitionDuration={400} defaultCollapsed={true}>
                <Menu className={styles.menu}>
                <Switch {...label} onChange={() => handleSidebar()} checked={checked}/>
                <div className={styles.sidebarLogoContainer}><LogoComponent color='#000'/></div>
                <MenuItem href="/"><AiOutlineHome className={styles.sidebarIcons}/>Home</MenuItem>
                {userButtons}
                <Divider variant='middle'/>
                <SubMenu label="Products">
                    <MenuItem href='/products?query=all'>All products</MenuItem>
                    <SubMenu label="Categories">
                        <MenuItem href="/products?query=women's clothing" className={styles.sidebarLinks}>Women&#39;s Clothing</MenuItem>
                        <MenuItem href="/products?query=men's clothing" className={styles.sidebarLinks}>Men&#39;s Clothing</MenuItem>
                        <MenuItem href='/products?query=electronics' className={styles.sidebarLinks}>Electronics</MenuItem>
                        <MenuItem href='/products?query=jewelery' className={styles.sidebarLinks}>Jewelery</MenuItem>
                    </SubMenu>
                </SubMenu>
                <Divider variant='middle'/>
                <SubMenu label="Author socials">
                    <MenuItem href='https://www.linkedin.com/in/mateocampillo/' target='_blank' rel='noreferrer' className={styles.sidebarLinks} onClick={() => handleSidebar()}><AiOutlineGithub className={styles.sidebarIcons}/>GitHub</MenuItem>
                    <MenuItem href='https://www.linkedin.com/in/mateocampillo/' target='_blank' rel='noreferrer' className={styles.sidebarLinks} onClick={() => handleSidebar()}><AiFillLinkedin className={styles.sidebarIcons}/>LinkedIn</MenuItem>
                </SubMenu>
                </Menu>
                <div className={styles.copy}>
                    <ModalComments />
                    <Divider variant='middle'/>
                    <h4>Mateo Campillo&nbsp;&copy;&nbsp;2023</h4>
                </div>
            </Sidebar>
            {/* Menu HEADER */}
            <div className={styles.headerContainer}>
                <Switch {...label} onChange={() => handleSidebar()} checked={checked}/>
                <LogoComponent color='#000' />
                <Link href='https://github.com/mateocampillo' target='_blank'><BsGithub className={styles.icon}/></Link>
                <Link href='https://www.linkedin.com/in/mateocampillo/' target='_blank'><BsLinkedin className={styles.icon}/></Link>
                <FaUserCircle className={styles.icon} onClick={handleUser}/>
            </div>
        </header>
    )
}
