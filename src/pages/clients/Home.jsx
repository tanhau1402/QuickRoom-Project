import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import ClientRoutes from '../../routes/ClientRoutes';
function Home(props) {
    return (
        <div>
            <Nav/>
            <ClientRoutes/>
            <Footer/>
        </div>
    );
}

export default Home;