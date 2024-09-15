import { useState, useRef, useEffect } from 'react'
import Whiteboard from '../components/Whiteboard'
import { updateDrawing, createDrawing, fetchDrawingById } from '../services/api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toolbar from '../components/Toolbar';

const RoomPage = () => {
    const params = useParams();

    const [tool, setTool] = useState("pencil")
    const [color, setColor] = useState("color")
    const [elements, setElements] = useState([])
    const [history, setHistory] = useState([])

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const getDrawing = async () => {
        const response = await fetchDrawingById(params.id);
        setElements(response.data.elements)
    }
    useEffect(() => {
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
        console.log("🚀 ~ RoomPage ~ elements:", elements)
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
        console.log("🚀 ~ handleTool ~ data:", data)
        setColor(data)
    }

    async function handleSave() {
        const drawing = {
            "boardName": "Sample Board",
            "createdBy": "User2"
        }

        const array = []

        for (let element of elements) {
            const obj = {
                elementType: element.type,
                position: { x: element.width, y: element.height },
                [element.type]: {
                    points: element.type === 'line' ? [{ "x": element.offsetX, "y": element.offsetY }] : element.path,
                    strokeColor: element.color,
                }
            }
            array.push(obj)
        }

        const updatedDrawing = { ...drawing, elements: array };
        console.error("🥳 ~ handleSave ~ updatedDrawing:", updatedDrawing)
        await createDrawing(updatedDrawing);
    }
    async function handleUpdate() {
        const drawing = {
            "boardName": "Sample Board",
            "createdBy": "User2"
        }

        const array = []

        for (let element of elements) {
            const obj = {
                elementType: element.type,
                position: { x: element.width, y: element.height },
                [element.type]: {
                    points: element.type === 'line' ? [{ "x": element.offsetX, "y": element.offsetY }] : element.path,
                    strokeColor: element.color,
                }
            }
            array.push(obj)
        }

        const updatedDrawing = { ...drawing, elements: array };
        console.error("🥳 ~ handleSave ~ updatedDrawing:", updatedDrawing)
        await updateDrawing(params, updatedDrawing);
    }


    return (
        <div>
            <Navbar elements={elements} history={history} handleUndoData={handleUndo} handleRedoData={handleRedo} />
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