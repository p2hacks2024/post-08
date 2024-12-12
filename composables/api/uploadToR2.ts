import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export async function POST(imageFileData: File) {
  const imageFileDataArrayBuffer = await imageFileData.arrayBuffer();
  const fileData = new Uint8Array(imageFileDataArrayBuffer);
  const config = useRuntimeConfig();


  // R2アップロードロジック
  const s3 = new S3Client({
    region: "auto",
    endpoint: config.public.HOSHISEN_ENDPOINT!,
    credentials: {
      accessKeyId: config.public.HOSHISEN_ACCESS_KEY!,
      secretAccessKey: config.public.HOSHISEN_SECRET_ACCESS_KEY!,
    },
  });

  try {
    const response = await s3.send(
      new PutObjectCommand({
        Bucket: "hoshisen",
        Key: imageFileData.name,
        ContentType: imageFileData.type,
        Body: fileData,
        ACL: "public-read",
      })
    );

    //console.log(response);

    return Response.json({
      message: "アップロードに成功しました。",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "アップロードに失敗しました。",
      error: error
    });
  }
}
