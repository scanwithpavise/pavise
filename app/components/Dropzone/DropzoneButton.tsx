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

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [opened, setOpened] = useState(false); // State untuk modal
  const [files, setFiles] = useState<File[]>([]); // State untuk menyimpan file yang diunggah
  const [isLoading, setIsLoading] = useState(false); // State untuk animasi loading

  // Fungsi untuk menangani file yang diunggah
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  // Fungsi untuk menangani tombol "Scan Now"
  const handleScanClick = () => {
    if (files.length > 0) {
      setIsLoading(true); // Mulai animasi loading

      // Simulasikan proses scanning (misalnya, API call)
      setTimeout(() => {
        setIsLoading(false); // Hentikan animasi loading
        setOpened(true); // Buka modal setelah proses selesai
      }, 2000); // Delay 2 detik untuk simulasi
    } else {
      alert("Please upload an image first!"); // Tampilkan pesan jika tidak ada file
    }
  };

  return (
    <Container className={classes.wrapper} mx="auto">
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop} // Gunakan fungsi handleDrop
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
              <Dropzone.Reject>Images file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload Images to Scan</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop images here to upload. We can accept only{" "}
              <i>.png, .jpg and .jpeg</i> files that are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={handleScanClick} // Gunakan fungsi handleScanClick
          color="black"
          disabled={isLoading} // Nonaktifkan tombol saat loading
        >
          {isLoading ? (
            <Loader color="white" size="sm" /> // Tampilkan animasi loading
          ) : (
            "Scan Now"
          )}
        </Button>
      </div>

      {/* Modal untuk menampilkan hasil scan */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)} // Tutup modal
        title="Scan Results"
        size="lg"
      >
        <Text>Here are the scan results for your uploaded image:</Text>
        <Image src="./Images/glioma.png" />
        {/* Tambahkan konten hasil scan di sini */}
        <Text>File Name: {files[0]?.name}</Text>
        <Text>File Size: {(files[0]?.size / 1024).toFixed(2)} KB</Text>
        <Text>
          Currently, there is no definitive way to prevent glioma, as the exact
          causes of most brain tumors, including gliomas, are not fully
          understood. However, some general strategies may help reduce the risk
          or promote overall brain health: Avoid Known Risk Factors: Limit
          Exposure to Radiation: Minimize unnecessary exposure to ionizing
          radiation, such as from medical imaging (e.g., CT scans) unless
          absolutely necessary. Reduce Chemical Exposure: Avoid prolonged
          exposure to harmful chemicals, such as pesticides or industrial
          solvents, which have been linked to certain cancers. Maintain a
          Healthy Lifestyle: Balanced Diet: Eat a diet rich in fruits,
          vegetables, whole grains, and lean proteins. Antioxidant-rich foods
          may help protect cells from damage. Regular Exercise: Engage in
          regular physical activity to support overall health and immune
          function. Avoid Smoking and Excessive Alcohol: Smoking and heavy
          alcohol use are linked to various cancers, though their direct
          connection to glioma is less clear.
        </Text>
      </Modal>
    </Container>
  );
}
