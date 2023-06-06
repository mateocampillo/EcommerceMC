import React from 'react';
import LogoComponent from './Logo';
import styles from '@/styles/footer.module.css';
import {AiOutlineMail, AiFillLinkedin, AiOutlineGithub, AiOutlineQuestionCircle} from 'react-icons/ai';
import {HiOutlineInformationCircle} from 'react-icons/hi';
import {GiTechnoHeart} from 'react-icons/gi';
import ModalFaq from './ModalFaq';

export default function FooterComponent() {

    return (
        <footer className={styles.footerContainer}>
            <section className={styles.logoContainer}>
                <LogoComponent color='#fff'/>
            </section>
            <section className={styles.sectionsContainer}>
                <div className={styles.infoContainer}>
                    <h3>Contact Info</h3>
                    <nav>
                        <a href="https://github.com/mateocampillo"><AiOutlineGithub />Github</a>
                        <a href="https://www.linkedin.com/in/mateocampillo/"><AiFillLinkedin />LinkedIn</a>
                        <a href="mailto:mateocampillo1@gmail.com"><AiOutlineMail />mateocampillo1@gmail.com</a>
                    </nav>
                </div>
                <div className={styles.infoContainer}>
                <h3>FAQ</h3>
                    <nav>
                        <ModalFaq icon={<HiOutlineInformationCircle className={styles.icons}/>} titulo='What is StoreHub?' texto='StoreHub, based on an Ecommerce, is a personal project I built to continue learning and to have more technologies and experience under my belt. If you wish to see more of my work fell free to contact me or to checkout my Github repositories on the links above.'/>
                        <ModalFaq icon={<GiTechnoHeart className={styles.icons}/>} titulo='Used Technologies' texto='StoreHub is based on Next.js, the React.js framework. For the layout it uses a mix of custom components and some utlities from Material UI. For the styling, it takes advantage of Next.js&#39;s native module CSS capabilities. All product information and images are taken from &#34;https://fakestoreapi.com/&#34; using Next.js&#39;s Static-site generation.'/>
                        <ModalFaq icon={<AiOutlineQuestionCircle className={styles.icons}/>} titulo='Purpose of this page' texto='The purpose of the page is to create a FAKE ecommerce, to practice new technologies and get out of the comfort coding stack I was used to.
                            For this reason, the normal actions that would affect a database are simulated and functional, but they do not modify anything.'/>
                    </nav>
                </div>
            </section>
        </footer>
    )

}