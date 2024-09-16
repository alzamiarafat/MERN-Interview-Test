import { useState, useRef, useEffect } from 'react'
import Whiteboard from '../components/Whiteboard'
import { fetchDrawingById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toolbar from '../components/Toolbar';
import { Toast } from 'primereact/toast';

const RoomPage = () => {
    const params = useParams();
    const toast = useRef(null);

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [drawing, setDrawing] = useState({});

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const getDrawing = async () => {
        try {
            const response = await fetchDrawingById(params.id);
            setElements(response.data.data.elements);
            setDrawing(response.data.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.error, life: 3000 });
            // const navigate = useNavigate();
            // navigate("/home");
        }
    }

    useEffect(() => {
        if (params.id)
            getDrawing()
    }, [])

    function handleClear() {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        // context.fillRect("white")

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        setElements([])
    }

    function handleUndo() {
        setHistory(prevHistory => {
            return [...prevHistory, elements[elements.length - 1]]
        })
        //important to return the elements
        setElements(prevElements => {
            return prevElements.slice(0, prevElements.length - 1)
        })

        if (elements.length === 1) {
            handleClear()
        }
    }

    function handleRedo() {
        setHistory(prevHistory => {
            return prevHistory.slice(0, prevHistory.length - 1)
        })

        setElements(prevElements => [
            ...prevElements, history[history.length - 1]
        ])
    }

    function handleTool(data) {
        setTool(data)
    }

    function handleColor(data) {
        setColor(data)
    }

    return (
        <div>
            <Toast ref={toast} />
            <Navbar elements={elements} history={history} drawing={drawing} handleUndoData={handleUndo} handleRedoData={handleRedo} handleClearData={handleClear} />
            <Toolbar handleToolData={handleTool} handleColorData={handleColor} />
            <Whiteboard
                canvasRef={canvasRef}
                ctxRef={ctxRef}
                elements={elements}
                setElements={setElements}
                tool={tool}
                color={color}
                setColor={setColor} />

        </div>
    )
}

export default RoomPage