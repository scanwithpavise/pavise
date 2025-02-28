import { Button, Container, Group, Text } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./HeroTitle.module.css";

export function HeroTitle() {
  return (
    <div className={classes.wrapper} id="about">
      <Container size={700} className={classes.inner}>
        <div data-aos="zoom-up">
          <h1 className={classes.title}>
            About{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "white" }}
              inherit
            >
              PAVISE
            </Text>{" "}
            Pavise is the first AI-powered health diagnostic
          </h1>
        </div>
        <div data-aos="zoom-down">
          <Text className={classes.description} color="dimmed">
            In an era where healthcare demands efficiency, accuracy, and
            accessibility, Pavise emerges as a revolutionary solution by
            integrating AI diagnostics with blockchain security. Traditional
            healthcare systems are often centralized, expensive, and limited by
            geographical boundaries. Pavise leverages the power of decentralized
            technology to provide transparent, efficient, and cost-effective
            diagnostic solutions for individuals and businesses alike. Through
            its governance model and community participation, Pavise aims to
            bridge the gap between AI innovation and global healthcare needs.
          </Text>
        </div>
      </Container>
    </div>
  );
}
