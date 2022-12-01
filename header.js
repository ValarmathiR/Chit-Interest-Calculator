import React, { useState,useRef } from "react";
import Auctionamount from "./auctionamount";
import Bonus from "./bonus";
import "./chitstyles.css";
import { jsPDF } from 'jspdf'
import html2canvas from "html2canvas";
import Image from './images/72BTLogo.png';
import AppLogo from './images/App Logo.png';
export default function Header()
{
    const [toggle,setToggle]=useState()
    const handleClick=(e)=>
    {
        const {name}=e.target
        setToggle(name)
        
    }
    const inputRef = useRef(null);
    const printDocument = () => {
        html2canvas(inputRef.current).then(function (canvas) {
            let htmlWidth = canvas.width;
            let htmlHeight = canvas.height;
            let top_left_margin = 15;
            let pdfWidth = htmlWidth + (top_left_margin * 2)
            let pdfHeight = (pdfWidth * 1.5) + (top_left_margin * 2)
            let canvas_image_width = htmlWidth;
            let canvas_image_height = htmlHeight;
            let totalPdfPage = Math.ceil(htmlHeight / pdfHeight) - 1
            canvas.getContext('2d')
            const imageData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'pt', 'a3');
            pdf.addImage(imageData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height)
            for (let i = 1; i <= totalPdfPage; i++) {
                pdf.addPage([pdfWidth, pdfHeight], 'p')
                pdf.addImage(imageData, 'JPG', top_left_margin, -(pdfHeight * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height)
            }
            pdf.save('download.pdf')
        })
    }

    return(
        <div>
        <div className="header-top">
            <div>
            <img src={Image} width="122" height="32" alt="72 Business Tools"/>
            <img src={AppLogo} width="122" height="32" alt="Chit Interest Calculator"/>
            </div>
        </div>
        <div className="header-button">
        <div className="header-inner">
            <button className="header-btn" name="auction" onClick={handleClick}>Auctioned amount & interest</button>
            <button className="header-btn" name="bonus" onClick={handleClick}>Bonus & interest</button>
        </div>
        <div>
            <button className="header-download" onClick={printDocument}>Download
            </button>
        </div>
        </div>
        <div>
            {
                (toggle==="auction")? <Auctionamount amountRef={inputRef}/> : <Bonus amountRef={inputRef}/>
            }
        </div>
        </div>
    )
}