"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "../../../../draw";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const cleanUp = initDraw(canvas)


        return ()=> {
            if(typeof cleanUp === "function"){
                cleanUp()
            }
        }
    }, []);

    return (
        <canvas ref={canvasRef} className="w-screen h-screen border border-gray-500 bg-black" />
    );
}