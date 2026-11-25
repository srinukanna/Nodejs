const http = require('http');
const fs = require('fs');
// now creating server using http module
const Server = http.createServer((req,res)=>{


// console.log(Object.keys(req)); // Shows top-level properties like url, method, headers, socket
// console.log(req.socket.remoteAddress); // Shows the direct connection IP
const log =`Time: ${new Date().toLocaleString()}| Method: ${req.method} | URL: ${req.url} | IP: ${req.socket.remoteAddress}\n`;

// it says how the content is sent as response instead of displaying along with tags of html

res.writeHead(200, { 'Content-Type': 'text/html' });

// appending the content to server.log using log
fs.appendFile('server.log',log,(err)=>{
   if(err)console.log("error",err);
})
// generating numbers for every 2 sec
const interval = setInterval(()=>{
    let number = Math.floor(Math.random()*100);
    res.write(`<h2>Random number:${number}</h2>`)
 },2000);

 // closing the interval after closing the tab
 res.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected, interval cleared.');
  });

});

// here we logging the timestamp when the server is started and handling error case too
Server.listen(8000,()=>{
   const timeStamp = new Date().toLocaleString();
   const logMsg = `Server started at ${timeStamp}\n`;
   console.log(logMsg)
   fs.appendFile('server.log',logMsg,(err)=>{
      if(err){
         console.log("failed at even initial stage only")
      }
   })
console.log("server running..");
  
});
