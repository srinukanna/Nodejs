const http = require('http');
const fs = require('fs');

const Server = http.createServer((req,res)=>{


// console.log(Object.keys(req)); // Shows top-level properties like url, method, headers, socket
// console.log(req.socket.remoteAddress); // Shows the direct connection IP
const log =`Time: ${new Date().toLocaleString()}| Method: ${req.method} | URL: ${req.url} | IP: ${req.socket.remoteAddress}\n`;



res.writeHead(200, { 'Content-Type': 'text/html' });

fs.appendFile('server.log',log,(err)=>{
   if(err)console.log("error",err);
})

const interval = setInterval(()=>{
    let number = Math.floor(Math.random()*100);
    res.write(`<h2>Random number:${number}</h2>`)
 },2000);

 res.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected, interval cleared.');
  });

});


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
