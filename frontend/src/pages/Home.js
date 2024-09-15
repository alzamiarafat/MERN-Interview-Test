// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchDrawings, deleteDrawing } from '../services/api';
import { Link } from 'react-router-dom';

import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import DrawingList from '../components/DrawingList';

const Home = () => {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        const loadDrawings = async () => {
            const response = await fetchDrawings();
            setDrawings(response.data.data);
        };
        loadDrawings();
    }, []);

    async function handleDelete(id) {
        await deleteDrawing(id);
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const toast = useRef(null);

    const confirmation = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => handleDelete(id),
        });
    };

    return (
        <div>
            <h1>All Drawings</h1>
            <Toast ref={toast} />
            <ConfirmDialog />
            <DrawingList />
            <ul>
                {drawings.map(drawing => (
                    <li key={drawing._id}>
                        <Link to={`/drawing/${drawing._id}`}>{drawing.boardName}</Link>
                        <button onClick={() => confirmation(drawing._id)}>delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/drawing-create">Create New Drawing</Link>
        </div>
    );
};

export default Home;
