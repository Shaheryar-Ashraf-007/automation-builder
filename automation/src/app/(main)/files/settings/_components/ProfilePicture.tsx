'use client' // is needed only if you’re using React Server Components
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

const Profile =() =>{
  return (
    <div>
      <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         classNameUploader="uc-light"
         pubkey="4c89cb328bc6539901b5"
         onCommonUploadSuccess={(e) =>
           console.log(
             "Uploaded files URL list",
             e.detail.successEntries.map((entry) => entry.cdnUrl)
           )
         }
      />
    </div>
  );
}

export default Profile;