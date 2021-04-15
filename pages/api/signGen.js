import cloudinary from 'cloudinary';

export default async (req, res) => {
    var timestamp = Math.round(new Date().getTime() / 1000);

    var signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
        },
        process.env.API_SECRET
    );
    res.status(200).json({ signature, timestamp });
    res.end();
};
