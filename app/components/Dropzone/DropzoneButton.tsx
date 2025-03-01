"use client";
import { useRef, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const [showLoginModal, setShowLoginModal] = useState(false); // State to show login modal

  // Handle file drop
  const handleDrop = async (acceptedFiles: File[]) => {
    const allowedFileSize = 1024 * 1024 * 5; // Maximum allowed file size (5MB)

    const isValidFile = acceptedFiles.every(
      (file) => file.size <= allowedFileSize
    );

    if (isValidFile) {
      if (isLoggedIn) {
        setFiles(acceptedFiles);

        // Check if the file exists in the result folder
        const fileExists = await checkFileExists(acceptedFiles[0].name);
        if (fileExists) {
          setResultImage(`/result/${acceptedFiles[0].name}`);
        } else {
          setResultImage(URL.createObjectURL(acceptedFiles[0]));
        }
      } else {
        setShowLoginModal(true); // Show login modal if user is not logged in
      }
    } else {
      alert(
        `Images can't be detected. Using our example images from our official X account.`
      );
    }
  };

  const handleScanClick = () => {
    if (files.length > 0) {
      if (isLoggedIn) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setOpened(true);
        }, 2000);
      } else {
        setShowLoginModal(true); // Show login modal if user is not logged in
      }
    } else {
      alert("Please upload an image first!");
    }
  };

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    // Scroll to the element with id="FAQ"
    const faqElement = document.getElementById("faq");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth" });
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
          <div style={{ pointerEvents: "none" }} id="getstart">
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

      {/* Modal to prompt user to login */}
      <Modal
        opened={showLoginModal}
        onClose={handleCloseLoginModal}
        size="md"
        color="red"
      >
        <Text>
          You don't have access to this feature, please join early access!
        </Text>
        <Button bg="black" mt="md" fullWidth onClick={handleCloseLoginModal}>
          Close
        </Button>
      </Modal>
    </Container>
  );
}
