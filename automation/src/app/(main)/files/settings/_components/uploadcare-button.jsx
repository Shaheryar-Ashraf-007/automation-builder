'use client';
import React, { useEffect, useRef } from 'react';
import * as LR from '@uploadcare/blocks';
import { useRouter } from 'next/navigation';

const UploadCareButton = ({ onUpload }) => {
  const router = useRouter();
  const ctxProviderRef = useRef(null);

  useEffect(() => {
    const handleUpload = async (e) => {
      const fileUrl = e.detail.cdnUrl;
      const file = await onUpload(fileUrl);
      if (file) {
        router.refresh();
      }
    };

    const ctxProvider = ctxProviderRef.current;
    if (ctxProvider) {
      ctxProvider.addEventListener('file-upload-success', handleUpload);
    }

    return () => {
      if (ctxProvider) {
        ctxProvider.removeEventListener('file-upload-success', handleUpload);
      }
    };
  }, [onUpload, router]);

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="a9428ff5ff90ae7a64eb"
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
      />

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </div>
  );
};

export default UploadCareButton;