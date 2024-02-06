const http = require('http');
const fs = require('fs');
const multer = require('multer'); // Import multer for file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original filename
  }
});

const upload = multer({ storage: storage }); // Create upload middleware

http.createServer(function (req, res) {
  const url = req.url;

  if (url === '/') {
    res.write('This is Home Page');
  } else if (url === '/about') {
    res.write('This is About Page');
  } else if (url === '/contact') {
    res.write('This is Contact Page');
  } else if (url === '/file-write') {
    fs.writeFile('demo.txt', 'hello world', function (err) {
      if (err) {
        res.end('File writing failed');
      } else {
        res.end('File written successfully');
      }
    });
  } else if (url === '/upload') {
    // Handle file upload with multer
    upload.single('file')(req, res, function (err) {
      if (err) {
        // Handle any upload errors
        res.end('File upload failed');
      } else {
        res.end('File uploaded successfully: ' + req.file.path);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }

  //storage, path , move

  res.end(); // End response for all routes

}).listen(5500, function () {
  console.log("Server running on port 5500");
});



// const http = require('http');
// const fs = require('fs');
// const url= require('url');

// http.createServer(function (req, res) {
//   // const url = req.url;
//   const url1=url.parse(req.url).pathname;

//   if (url1 === '/') {
//     res.write('This is Home Page');
//   } else if (url1 === '/about') {
//     res.write('This is About Page');
//   } else if (url1 === '/contact') {
//     res.write('This is Contact Page');
//   } else if (url1 === '/file-write') {
//     fs.writeFile('demo.txt', 'hello world', function (err) {
//       if (err) {
//         res.end('File writing failed');
//       } else {
//         res.end('File written successfully');
//       }
//     });
//   } else {
//     res.statusCode = 404;
//     res.end('Not Found');
//   }

//   res.end(); // End response for all routes

// }).listen(5500, function () {
//   console.log("Server running on port 5500");
// });


