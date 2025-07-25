'use client'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const handleUploadSuccess = (event: {
    status: "success";
    totalCount: number;
    successCount: number;
    failedCount: number;
    uploadingCount: number;
    progress: number;
    successEntries: Array<{ cdnUrl: string }>;
    failedEntries: any[];
    uploadingEntries: any[];
  }) => {
    const successEntries = event.successEntries;
    console.log('Uploaded files URL list', successEntries.map((entry) => entry.cdnUrl));
  };

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        classNameUploader="uc-light"
        pubkey="4c89cb328bc6539901b5"
        onCommonUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default Profile;