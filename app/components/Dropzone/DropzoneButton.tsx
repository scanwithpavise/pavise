"use client";
import { useRef, useState, useEffect } from "react";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Text,
  useMantineTheme,
  Modal,
  Loader,
  Image,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import classes from "./DropzoneButton.module.css";

// Utility function to check if a file exists
const checkFileExists = async (fileName: string) => {
  try {
    const response = await fetch(`/result/${fileName}`);
    return response.ok;
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
};

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [opened, setOpened] = useState(false); // State for modal
  const [files, setFiles] = useState<File[]>([]); // State for uploaded files
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const [resultImage, setResultImage] = useState<string | null>(null); // State for scanned image result
  const [typedText, setTypedText] = useState(""); // State for typing animation
  const [isTyping, setIsTyping] = useState(false); // State to control typing animation

  // Handle file drop
  const handleDrop = async (acceptedFiles: File[]) => {
    const allowedFileSize = 1024 * 1024 * 5; // Maximum allowed file size (5MB)

    const isValidFile = acceptedFiles.every(
      (file) => file.size <= allowedFileSize
    );

    if (isValidFile) {
      setFiles(acceptedFiles);

      // Check if the file exists in the result folder
      const fileExists = await checkFileExists(acceptedFiles[0].name);
      if (fileExists) {
        setResultImage(`/result/${acceptedFiles[0].name}`);
      } else {
        setResultImage(URL.createObjectURL(acceptedFiles[0]));
      }
    } else {
      alert(
        `Images can't be detected. Using our example images from our official X account.`
      );
    }
  };

  const handleScanClick = () => {
    if (files.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setOpened(true);
      }, 2000);
    } else {
      alert("Please upload an image first!");
    }
  };

  return (
    <Container className={classes.wrapper} mx="auto" mb={12}>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop} // Use handleDrop function
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload size={50} stroke={1.5} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop images here</Dropzone.Accept>
              <Dropzone.Reject>Image files less than 30MB</Dropzone.Reject>
              <Dropzone.Idle>Upload Images to Scan</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop images here to upload. We can accept only{" "}
              <i>.png, .jpg, and .jpeg</i> files that are less than 30MB in
              size.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={handleScanClick}
          color="black"
          disabled={isLoading}
        >
          {isLoading ? <Loader color="white" size="sm" /> : "Scan Now"}
        </Button>
      </div>

      {/* Modal to display scan results */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)} // Close modal
        title="Scan Results"
        size="lg"
      >
        {resultImage && <Image src={resultImage} />}
      </Modal>
    </Container>
  );
}
