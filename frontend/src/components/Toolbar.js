// src/components/Toolbar.js
import React from 'react';
import { AiOutlineLine } from "react-icons/ai";
import { BiPencil, BiRectangle, BiCircle, BiText } from "react-icons/bi";
import { BsEgg } from "react-icons/bs";
import './style.css';

const Toolbar = ({ handleToolData, handleColorData }) => {
    let tool = "pencil"
    let color = "black";

    function handleTool(value) {
        tool = value;
        handleToolData(tool);
    }

    function handleColor(value) {
        color = value;
        handleColorData(color);
    }

    return (
        <div>
            <ul className='vertical-menu'>
                <li onClick={() => handleTool('pencil')}>
                    <a href="#">
                        <input
                            type="radio"
                            id="pencil"
                            name="tool"
                            checked={tool === "pencil"}
                            value="pencil"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => tool = e.target.value}
                        />
                        <label htmlFor="pencil">
                            <BiPencil style={{ fontSize: '20px' }} />
                            <span>Pencil</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => handleTool('line')}>
                    <a href="#">
                        <input
                            type="radio"
                            id="line"
                            name="tool"
                            checked={tool === "line"}
                            value="line"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => tool = e.target.value}
                        />
                        <label htmlFor="line">
                            <AiOutlineLine style={{ fontSize: '20px' }} />
                            <span>Line</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => handleTool('ellipse')}>
                    <a href="#">
                        <input
                            type="radio"
                            id="ellipse"
                            name="tool"
                            checked={tool === "ellipse"}
                            value="ellipse"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => tool = e.target.value}
                        />
                        <label htmlFor="ellipse">
                            <BsEgg style={{ fontSize: '20px' }} />
                            <span>Ellipse</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => handleTool("rectangle")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="rectangle"
                            name="tool"
                            checked={tool === "rectangle"}
                            value="rectangle"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => tool = e.target.value}
                        />
                        <label htmlFor="rectangle">
                            <BiRectangle style={{ fontSize: '20px' }} />
                            <span>Rectangle</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => handleTool("circle")}>
                    <a href="#">
                        <input
                            type="radio"
                            id="circle"
                            name="tool"
                            checked={tool === "circle"}
                            value="circle"
                            className="tool-radio" // Class to hide the input
                            onChange={(e) => tool = e.target.value}
                        />
                        <label htmlFor="circle">
                            <BiCircle style={{ fontSize: '20px' }} />
                            <span>Circle</span>
                        </label>
                    </a>
                </li>
                <li onClick={() => handleColor("color")}>
                    <a href="#">
                        <input
                            type="color"
                            name="color"
                            value={color}
                            onChange={(e) => handleColor(e.target.value)} />
                        <label htmlFor="color">
                            {/* <BiColor style={{ fontSize: '20px' }} /> */}
                            <span>Color</span>
                        </label>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BiText />
                        <span>Text</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Toolbar;
