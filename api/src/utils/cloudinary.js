import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async(localFilePaths)=>{
  try {
    if(!localFilePaths){
      console.log("no local file path provided");
      return null
    }
    const uploadPromises= localFilePaths.map(async(localFilePath)=>{
      const response= await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
      })
      console.log("uploaded file:",localFilePath);
      fs.unlinkSync(localFilePath)
      return response
    })
    const uploadedResults = await Promise.all(uploadPromises)
      console.log("uploaded all files:", uploadedResults);

    return uploadedResults
  } catch (error) {
    console.log("Error in uploading files:",error);
    localFilePaths.forEach(localFilePath => {
      if(fs.existsSync(localFilePath)){
        fs.unlinkSync(localFilePath)
      }
      
    });
    return null
  }
}
export { uploadOnCloudinary}