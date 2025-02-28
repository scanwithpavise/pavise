import { Badge, Image } from "@mantine/core";
import { Button, Container, Flex, Text, Title } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./HeroText.module.css";
import { ButtonCopy } from "../ButtonCopy/ButtonCopy";

export function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

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
          <Button className={classes.control} color="black" size="lg" id="#scanwithpavise">
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  );
}
