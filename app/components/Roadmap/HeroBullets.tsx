import { IconCheck } from "@tabler/icons-react";
import { Timeline, Text } from "@mantine/core";
import {
  IconGitPullRequest,
  IconBlocks,
  IconWorld,
  IconRocket,
  IconRobotFace,
} from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  ThemeIcon,
  Title,
} from "@mantine/core";
// import image from './image.svg';
import classes from "./HeroBullets.module.css";

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner} id="roadmap">
        <div className={classes.content}>
          <div data-aos="fade-right">
            <Title className={classes.title}>
              Pavise <span className={classes.highlight}>Roadmap</span>
              <br />
            </Title>
            <Text c="dimmed" mt="md">
              Our team is dedicated to integrating all Pavise features, ensuring
              that everyone around the world can easily diagnose diseases.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Phase 1</b> – Foundation & Launch
              </List.Item>
              <List.Item>
                <b>Phase 2</b> – AI Diagnostic Platform Development
              </List.Item>
              <List.Item>
                <b>Phase 3</b> – Full Ecosystem Integration
              </List.Item>
              <List.Item>
                <b>Phase 4</b> – Global Impact & Sustainability
              </List.Item>
            </List>
          </div>
        </div>
        <div>
          <div data-aos="fade-left">
            <Timeline active={1} bulletSize={24} lineWidth={2}>
              <Timeline.Item
                bullet={<IconRocket size={12} />}
                title="Foundation Launch"
              >
                <Text c="dimmed" size="sm">
                  You&apos;ve created new branch{" "}
                  <Text variant="link" component="span" inherit>
                    fix-notifications
                  </Text>{" "}
                  from master
                </Text>
                <Text size="xs" mt={4}>
                  6 Month ago
                </Text>
              </Timeline.Item>

              <Timeline.Item
                bullet={<IconRobotFace size={12} />}
                title="AI Diagnostic"
              >
                <Text c="dimmed" size="sm">
                  Our team have been launch beta version of pavise
                </Text>
                <Text size="xs" mt={4}>
                  1 month ago
                </Text>
              </Timeline.Item>

              <Timeline.Item
                title="Full Ecosystem Integrated"
                bullet={<IconBlocks size={12} />}
                lineVariant="dashed"
              >
                <Text c="dimmed" size="sm">
                  Our team is working hard to integrate the entire system.
                </Text>
                <Text size="xs" mt={4}>
                  On Progress
                </Text>
              </Timeline.Item>

              <Timeline.Item
                title="Global Impact"
                bullet={<IconWorld size={12} />}
              >
                <Text c="dimmed" size="sm">
                  <Text variant="link" component="span" inherit>
                    Collaborate with international healthcare organizations.
                  </Text>{" "}
                  left a code review on your pull request
                </Text>
                <Text size="xs" mt={4}>
                  On Progress
                </Text>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
        {/* <Image src={image.src} className={classes.image} /> */}
      </div>
    </Container>
  );
}
