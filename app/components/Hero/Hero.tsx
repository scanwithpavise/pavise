import { Badge, Image } from "@mantine/core";
import { Button, Container, Flex, Text, Title } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./HeroText.module.css";
import { ButtonCopy } from "../ButtonCopy/ButtonCopy";
import { RetroGrid } from "@/components/magicui/retro-grid";
export function HeroText() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background">
      <div className={classes.inner}>
        <Title className={classes.title}>
          <div data-aos="zoom-up">
            <img src="/Images/pavise.jpeg" className={classes.pavise} />
            <Badge>Beta VERSION</Badge>
          </div>
          Pavise first AI-powered Health Diagnostic{" "}
          <Text component="span" className={classes.highlight} inherit>
            <br />
            Designed to accurately
          </Text>{" "}
          diagnose diseases
        </Title>
        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Helping you gain in-depth insights into your health condition and
            providing precise recommendations for the next steps.
          </Text>
        </Container>
        <Container className={classes.controls} mx="auto">
          <Flex>
            <ButtonCopy />
          </Flex>
        </Container>
        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            <a href="https://github.com/scanwithpavise" target="__BLANK">
              GitHub
            </a>
          </Button>
          <Button
            className={classes.control}
            color="black"
            size="lg"
            id="#scanwithpavise"
          >
            <a href="#getstart">Get Started</a>
          </Button>
        </div>
      </div>
      <RetroGrid />
    </div>
  );
}
