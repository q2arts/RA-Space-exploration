// Import the necessary modules.
import http from 'http';
import { SimpleHTTPRequestHandler } from 'http';
import { TCPServer } from 'net';
import { open } from 'open';

// Define the TrainingHandler class.
class TrainingHandler extends SimpleHTTPRequestHandler {
 // Override the do_GET method to handle custom requests.
 do_GET(req, res) {
   // Check if the requested file is 'demo.html'.
   if (req.url === '/demo.html') {
     // Serve the 'demo.html' file.
     this.sendFile(req, res, 'demo.html');
   } else {
     // Use the parent class behavior for other requests.
     super.do_GET(req, res);
   }
 }
}

// Define the port to use for the server.
const port = 8001;

// Create the server and start listening on the specified port.
const server = http.createServer(TrainingHandler);
server.listen(port);

// Print a message to the console indicating that the server is running.
console.log(`Serving VR training at http://localhost:${port}`);

// Open a new tab in the default browser to access the 'demo.html' page.
open(`http://localhost:${port}/demo.html`);
