import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { fetchDrawings, deleteDrawing } from '../services/api';
import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

export default function DrawingList() {
    const [drawings, setDrawings] = useState([]);
    const toast = useRef(null);

    const loadDrawings = async () => {
        const response = await fetchDrawings();
        setDrawings(response.data.data);
    };

    useEffect(() => {
        loadDrawings();
    }, []);

    const renderHeader = () => {
        return (
            <div className="flex justify-between">
                <Button type="button" icon="pi pi-filter-slash" label="Add" onClick={() => routeChange('drawing-create')} />
            </div>
        );
    };

    async function handleDelete(id) {
        await deleteDrawing(id);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Drawing delete successfully!', life: 3000 });
        loadDrawings();
    }

    const confirmation = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => handleDelete(id),
        });
    };

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button label="Edit" icon="pi pi-pencil" severity='success' style={{ marginRight: "10px" }} onClick={() => routeChange(`drawing/${rowData._id}`)} />
                <Button label="Del" icon="pi pi-trash" severity='danger' onClick={() => confirmation(rowData._id)} />

            </>
        )
    };

    const header = renderHeader();

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <DataTable value={drawings} tableStyle={{ minWidth: '60rem' }} header={header}
                emptyMessage="No Drawing found.">
                <Column field="_id" header="ID"></Column>
                <Column field="boardName" header="Title"></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
        </>
    );
}
