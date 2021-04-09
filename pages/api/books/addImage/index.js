import formidable from 'formidable';
import * as fs from "fs";
import * as path from "path";


export const config = {
    api: {
        bodyParser: false,
    },
}

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.keepExtensions = true;
    form.keepFilenames = true;
    form.on('file', function(field, file) {
        const fileName = file.name;
        fs.rename(file.path, path.join(form.uploadDir, fileName), function(err) {
            if (!err) {
                return res.send(fileName);
            }
        });
    });
    form.parse(req, (err, fields, files) => {
        // console.log(err, fields, files);
    });
};
