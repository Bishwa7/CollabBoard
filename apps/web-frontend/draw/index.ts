

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

    const handleMouseUp = () => {
        isDrawing = false;
    };

    const handleMouseLeave = () => {
        isDrawing = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDrawing) return;

        const { x, y } = getMousePos(e, canvas);

        const width = x - startX;
        const height = y - startY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

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