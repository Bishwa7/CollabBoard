

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}

const existingShapes : Shape[] = []

export function initDraw(canvas: HTMLCanvasElement){
    // canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    function getMousePos(e: MouseEvent, canvas: HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }

    const handleMouseDown = (e: MouseEvent) => {
        isDrawing = true;

        const { x, y } = getMousePos(e, canvas);

        startX = x;
        startY = y;
    };

    const handleMouseUp = (e: MouseEvent) => {
        isDrawing = false;

        const { x, y } = getMousePos(e, canvas)

        const width = x - startX;
        const height = y - startY;

        existingShapes.push({
            type: "rect",
            x: startX,
            y: startY,
            width,
            height
        })
    };

    const handleMouseLeave = () => {
        isDrawing = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDrawing) return;

        const { x, y } = getMousePos(e, canvas);

        const width = x - startX;
        const height = y - startY;

        clearCanvas(existingShapes, ctx, canvas)

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, width, height);
    };


    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
}

function clearCanvas(existingShapes: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if(shape.type === "rect") {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.strokeRect(shape.x , shape.y , shape.width , shape.height)
        }
    })
}