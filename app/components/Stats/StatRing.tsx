import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import {
  Center,
  Container,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
} from "@mantine/core";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const data = [
  {
    label: "Page views",
    stats: "320",
    progress: 10,
    color: "black",
    icon: "up",
  },
  {
    label: "Request users",
    stats: "35",
    progress: 10,
    color: "Black",
    icon: "up",
  },
  {
    label: "Scan",
    stats: "27",
    progress: 2,
    color: "black",
    icon: "down",
  },
] as const;

export function StatsRing() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" mt={30} mb={30} key={stat.label}>
        <Container mx="auto">
          <Group>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  <Icon size={20} stroke={1.5} />
                </Center>
              }
            />

            <div>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                {stat.label}
              </Text>
              <Text fw={700} size="xl">
                {stat.stats}
              </Text>
            </div>
          </Group>
        </Container>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 3, sm: 3 }}>{stats}</SimpleGrid>;
}
