import {
  Card,
  Container,
  Flex,
  Group,
  Image,
  RingProgress,
  Text,
} from "@mantine/core";
import classes from "./CardWithStats.module.css";

const stats = [
  { title: "Distance", value: "27.4 km" },
  { title: "Avg. speed", value: "9.6 km/h" },
  { title: "Score", value: "88/100" },
];

export function CardWithStats() {
  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Flex gap="xs">
      <Card withBorder padding="lg" className={classes.card}>
        <Group justify="space-between" mt="xl">
          <Text fz="sm" fw={700} className={classes.title}>
            Tumor Detection
          </Text>
          <Group gap={5}>
            <Text fz="xs" c="dimmed">
              100% completed
            </Text>
            <RingProgress
              size={18}
              thickness={2}
              sections={[{ value: 100, color: "green" }]}
            />
          </Group>
        </Group>
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          59.000 Datasets this month • 80% Data Train • 20% Data Test
        </Text>
      </Card>
      <Card withBorder padding="lg" className={classes.card}>
        <Group justify="space-between" mt="xl">
          <Text fz="sm" fw={700} className={classes.title}>
            BigchainDB
          </Text>
          <Group gap={5}>
            <Text fz="xs" c="dimmed">
              50% on progress
            </Text>
            <RingProgress
              size={18}
              thickness={2}
              sections={[{ value: 50, color: "orange" }]}
            />
          </Group>
        </Group>
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          Install and configure a BigchainDB node or connect to an existing
          BigchainDB network.
        </Text>
      </Card>
      <Card withBorder padding="lg" className={classes.card}>
        <Group justify="space-between" mt="xl">
          <Text fz="sm" fw={700} className={classes.title}>
            Self Diagnose
          </Text>
          <Group gap={5}>
            <Text fz="xs" c="dimmed">
              100% completed
            </Text>
            <RingProgress
              size={18}
              thickness={2}
              sections={[{ value: 100, color: "green" }]}
            />
          </Group>
        </Group>
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          As soon as possible, we are working tirelessly to develop the most
          advanced AI for disease diagnosis
        </Text>
      </Card>
    </Flex>
  );
}
