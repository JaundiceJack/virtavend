import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { FaImages } from 'react-icons/fa';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 100, pointerEvents: 'none' }}>

    <div className="flex flex-row">
      <FaImages size='40' className="mr-4" />
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
    </div>
  </Group>
);

const ImageEntry = () => {
  const theme = useMantineTheme();
  return (
    <div className="grid grid-cols-3">
      <p className="font-semibold ml-auto mr-2">Images:</p>
      <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="mb-3 col-start-2 col-span-2"
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
    </div>

  );
}

export default ImageEntry;
