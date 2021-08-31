## Return value
A CanvasRenderingContext2DSettings object that contains the actual context parameters. It has the following members:

### alpha
A Boolean indicating if the canvas contains an alpha channel. If false, the backdrop is always
opaque, which can speed up drawing of transparent content and images.

### desynchronized
A Boolean indicating the user agent reduced the latency by desynchronizing the canvas paint cycle
from the event loop.

### willReadFrequently
A Boolean indicating the user agent optimized readback with `getImageData()` by storing canvas's
bitmap on CPU instead of GPU.