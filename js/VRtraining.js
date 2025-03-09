// Import the necessary modules.
import http from 'http';
import { SimpleHTTPRequestHandler } from 'http';
import { TCPServer } from 'net';
import { open } from 'open';

// Define the TrainingHandler class.
class TrainingHandler extends SimpleHTTPRequestHandler {
 // Override the do_GET method to handle custom requests.
 do_GET(req, res) {
   // Custom handling can go here, or just use the parent class behavior.
   return super.do_GET(req, res);
 }
}

// Define the port to use for the server.
const port = 8001;

// Create the server and start listening on the specified port.
const server = http.createServer(TrainingHandler);
server.listen(port);

// Print a message to the console indicating that the server is running.
console.log(`Serving VR training at http://localhost:${port}`);

// Open a new tab in the default browser to access the training page.
open(`http://localhost:${port}/demo.html`);
