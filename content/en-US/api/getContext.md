willReadFrequently: Boolean that indicates if the `CanvasRenderingContext2D` will be read frequently.
On most devices, user agent needs to decide whether to store the canvas's bitmap on the GPU or on the
CPU. Rendering operations are more performant for accelerated canvases (on the GPU) except
when doing readback with `getImageData()`, which is better on software canvas (on the CPU).
So if the webpage is likely to perform many readback operations, it's more advantageous to set
it to true; otherwise, set it to false.
