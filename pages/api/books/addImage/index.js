import aws from 'aws-sdk';
import async from "async";

function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
            }
            else{
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
}

function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                document.getElementById('preview').src = url;
                document.getElementById('avatar-url').value = url;
            }
            else{
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
}

export default async function handler(req, res) {
    const s3 = new aws.S3();
    const fileName = req.body['filename'];
    const fileType = req.body['Content-Type'];
    console.log(fileName, fileType)
    const s3Params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
}
