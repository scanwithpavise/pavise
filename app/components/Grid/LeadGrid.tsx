import { Container, Grid, SimpleGrid, Skeleton } from "@mantine/core";
import { Image } from "@mantine/core";
const PRIMARY_COL_HEIGHT = "300px";

export function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt={30}>
      <div data-aos="zoom-up">
        <Image
          radius="md"
          src="./Images/images_09_07_3896_09a.jpeg"
          height="80px"
        />
      </div>
      <Grid gutter="md">
        <Grid.Col>
          <div data-aos="zoom-up">
            <Image radius="md" src="./Images/imageData_.png" height={10} />
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div data-aos="zoom-up">
            <Image
              radius="md"
              src="./Images/Screenshot 2025-02-26 031305.png"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div data-aos="zoom-up">
            <Image
              radius="md"
              src="./Images/Sample-images-from-bone-tumor-dataset-a-Bone-MR-image-b-Ground-truth-image.png"
            />
          </div>
        </Grid.Col>
      </Grid>
    </SimpleGrid>
  );
}
