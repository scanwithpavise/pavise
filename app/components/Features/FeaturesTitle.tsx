"use client";
import {
  IconCircleDotted,
  IconFlame,
  IconReceiptOff,
  IconUser,
  IconScript,
  IconCoins,
} from "@tabler/icons-react";
import {
  Button,
  Grid,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import classes from "./FeaturesTitle.module.css";

const features = [
  {
    icon: IconScript,
    title: "Free and open source",
    description: "Developer can contribute with pavise project",
  },
  {
    icon: IconUser,
    title: "Community Participation",
    description:
      "Pavise holders play a crucial role in the platform’s strategic decision-making.",
  },
  {
    icon: IconCircleDotted,
    title: "No annoying focus ring",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: IconCoins,
    title: "Token Burn Mechanism",
    description:
      "To ensure long-term value appreciation and control inflation, $Pavise implements a structured burn mechanism:",
  },
];

export function FeaturesTitle() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "black", to: "black" }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper} id="features">
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            Pavise leverages cutting-edge technology to provide precise and
            reliable medical insights
          </Title>
          <Text c="dimmed">
            With Pavise, you can instantly diagnose diseases—empowering faster,
            smarter, and more accurate healthcare decisions
          </Text>

          {/* <Button
            variant="gradient"
            gradient={{ deg: 133, from: "black", to: "black" }}
            size="lg"
            radius="md"
            mt="xl"
            id=""
          >
            Get started
          </Button> */}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <div data-aos="zoom-in">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
              {items}
            </SimpleGrid>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
