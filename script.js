/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: Jair Alejandro Bello Perez
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

//se optiene el elemento canva del archivo html por su id "canvas"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Función de apoyo para dibujar un píxel individual
function drawPixel(x, y, color = "#000000") {
    ctx.fillStyle = color;  //define el color con el que se va a dibujar
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// funcion bresenham 
function bresenhamLine(x0, y0, x1, y1, color = "#000000") {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    // Parametro de decision
    let err = dx - dy;

    while (true) {
        drawPixel(x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // ajusta el error
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

// funcion para la circunferencia - Punto Medio
function midpointCircle(cx, cy, r, color = "#FF0000") {
    let x = 0;
    let y = r;

    // Parámetro de decisión inicial
    let p = 1 - r;

    function drawCirclePoints(cx, cy, x, y) {
        drawPixel(cx + x, cy + y, color);
        drawPixel(cx - x, cy + y, color);
        drawPixel(cx + x, cy - y, color);
        drawPixel(cx - x, cy - y, color);
        drawPixel(cx + y, cy + x, color);
        drawPixel(cx - y, cy + x, color);
        drawPixel(cx + y, cy - x, color);
        drawPixel(cx - y, cy - x, color);
    }

    drawCirclePoints(cx, cy, x, y);

    while (x < y) {
        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }

        drawCirclePoints(cx, cy, x, y);
    }
}