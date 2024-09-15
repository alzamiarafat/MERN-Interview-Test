import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import DrawingList from '../components/DrawingList';
import './style.css'

const Home = () => {
    return (
        <div className='container'>
            <h1>All Drawings</h1>
            <DrawingList />
        </div>
    );
};

export default Home;
