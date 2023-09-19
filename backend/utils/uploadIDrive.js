const AWS = require("aws-sdk");
const PATH = require("path");
const FS = require("fs");

// Full path of object. For example '../files/local-object'
const file = "local-object";
const fileStream = new FS.createReadStream(file);

// Create an S3 client for IDrive Cloud
const endpoint = new AWS.Endpoint("s3.us-west-1.idrivecloud.io");
const s3 = new AWS.S3({
  endpoint: endpoint,
});

// upload object 'local-object' as 'my-object' in bucket 'my-bucket' params
var params = {
  Bucket: "my-bucket",
  Key: "my-object",
  Body: fileStream,
};

// put object call
s3.putObject(params, function (err, data) {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Success:", data);
  }
});
