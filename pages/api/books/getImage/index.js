export default async function handler(req, res) {
    const imgName = req.query.img;
    console.log(imgName);
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
        }
    });

    const data = await new Promise((resolve, reject) => {
        return s3.getObject(
            {
                Bucket: process.env.BUCKET_NAME,
                Key: imgName,
            },
            (err, data) => {
                try {
                    let imgData = data.Body.toString('base64');
                    resolve(imgData);
                } catch (e) {
                    resolve('')
                }
            }
        );
    });

    const img = Buffer.from(data, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': img.length
    });
    res.end(img);
}
