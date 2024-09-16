import { useState, useRef } from 'react'
import './style.css'
import { AiOutlineHome, AiOutlineUndo, AiOutlineRedo, AiOutlineClear } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { updateDrawing, createDrawing } from '../services/api';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

const Navbar = ({ elements, history, drawing, handleUndoData, handleRedoData, handleClearData }) => {
    const params = useParams();
    const toast = useRef(null);
    const [boardName, setBoardName] = useState("White Board");

    function handleClear() {
        handleClearData();
    }

    function handleUndo() {
        handleUndoData();
    }

    function handleRedo() {
        handleRedoData();
    }

    async function handleSave() {
        const drawing = { boardName };
        const updatedDrawing = { ...drawing, elements: elements };
        await createDrawing(updatedDrawing);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Saved', life: 3000 });
    }

    async function handleUpdate() {
        const drawing = { boardName };
        const updatedDrawing = { ...drawing, elements: elements };
        await updateDrawing(params.id, updatedDrawing);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Updated!', life: 3000 });
    }

    return (
        <div>
            <Toast ref={toast} />
            <ul className="horizontal-menu">
                <FloatLabel>
                    <InputText id="title" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
                    <label htmlFor="title">Title</label>
                </FloatLabel>
                <li className="menu-item" style={{ marginLeft: "20px" }}>
                    <a href="/" className="menu-link">
                        <AiOutlineHome className="menu-icon" />
                        <span className="menu-text">Home</span>
                    </a>
                </li>

                <li className="menu-item" onClick={handleUndo} style={{
                    pointerEvents: elements.length == 0 ? "none" : "",
                    opacity: elements.length == 0 ? 0.4 : 1
                }}>
                    <a href="#" className="menu-link" >
                        <AiOutlineUndo className="menu-icon" />
                        <span className="menu-text">Undo</span>
                    </a>
                </li>
                <li className="menu-item" onClick={handleRedo} style={{
                    pointerEvents: history.length == 0 ? "none" : "",
                    opacity: history.length == 0 ? 0.4 : 1
                }}>
                    <a href="#" className="menu-link">
                        <AiOutlineRedo className="menu-icon" />
                        <span className="menu-text">Redo</span>
                    </a>
                </li>
                <li className="menu-item" onClick={handleClear}>
                    <a href="#" className="menu-link">
                        <AiOutlineClear className="menu-icon" />
                        <span className="menu-text">Clear All</span>
                    </a>
                </li>
                <li className="menu-item" onClick={!params.id ? handleSave : handleUpdate}>
                    <a href="#" className="menu-link">
                        <BiSave className="menu-icon" />
                        <span className="menu-text">Save</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar