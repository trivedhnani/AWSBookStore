const sharp = require("sharp");
const AWS = require("aws-sdk");
exports.handler = async (event, context) => {
  try {
    const Bucket = event["Records"][0]["s3"]["bucket"]["name"];
    const Key = event["Records"][0]["s3"]["object"]["key"];
    const s3 = new AWS.S3();
    const s3ReadImageAsync = s3.getObject({ Bucket, Key }).promise();
    let Body = await s3ReadImageAsync;
    console.log(Body);
    await sharp(body)
      .resize(250, 250)
      .toFormat("jpeg")
      .jpeg({
        quality: 90,
      })
      .toBuffer()
      .then((data) => (Body = data))
      .catch((err) =>
        next(new AppError(500, `Can't create buffer of image data`))
      );
    Key = `${Key.split(".")[0]}-min.jpeg`;
    const s3UploadAsync = s3.upload({ Bucket, Key, Body }).promise();
    console.log(await s3UploadAsync);
  } catch (err) {
    console.log(err);
  }
};
