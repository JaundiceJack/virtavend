import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { FaImages } from 'react-icons/fa';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Spinner from '../multipurpose/spinner.js';

// import { uploadPhoto } from '../../actions/productActions.js';

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme, uploading, file) => (
  <Group position="center" spacing="xl" style={{ minHeight: 100, pointerEvents: 'none' }}>
    {
      uploading ?
        <Spinner /> :
      file ?
        <div className="flex flex-row">
        <Text size="xl" inline>
          Image ready.
        </Text>
        </div> :
      <div className="flex flex-row">
        <FaImages size='40' className="mr-4" />
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
      </div>
    }
  </Group>
);

const ImageEntry = ({ uploading=false, setUploading, onUpload, file }) => {


  const theme = useMantineTheme();
  return (
    <div className="grid grid-cols-3">
      <p className="font-semibold ml-auto mr-2">Image:</p>
      <Dropzone
        onDrop={(files) => onUpload(files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="mb-3 col-start-2 col-span-2"
      >
        {(status) => dropzoneChildren(status, theme, uploading, file)}
      </Dropzone>
    </div>

  );
}

export default ImageEntry;
