"use client";
import Image from "next/image";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { HeaderMegaMenu } from "./components/Navbar/HeaderMegaMenu";
import { Container, Flex, Grid, MantineProvider } from "@mantine/core";
import { HeroText } from "./components/Hero/Hero";
import { FeaturesTitle } from "./components/Features/FeaturesTitle";
import "@mantine/core/styles.css";
import { FooterLinks } from "./components/Footer/FooterLinks";
import { DropzoneButton } from "./components/Dropzone/DropzoneButton";
import { LeadGrid } from "./components/Grid/LeadGrid";
import { StatsRing } from "./components/Stats/StatRing";
import { FaqWithHeader } from "./components/Faq/FaqWithHeader";
import { CardWithStats } from "./components/CardWithStat/CardWithStats";
import { HeroTitle } from "./components/About/HeroTitle";
import { HeroBullets } from "./components/Roadmap/HeroBullets";
import { ChatDemo } from "@/components/chat-demo";
import ChatUI from "./components/ChatAi/ChatUi";
export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <MantineProvider>
        <HeaderMegaMenu />
        <HeroText />
        <LeadGrid />
        <HeroTitle />
        <FeaturesTitle />
        <HeroBullets />
        <div data-aos="zoom-up">
          <Container mx="auto">
            <CardWithStats />
          </Container>
        </div>
        <div data-aos="zoom-up">
          <Container mx="auto">
            <StatsRing />
          </Container>
        </div>
        <div data-aos="zoom-up">
          <Container mx="auto">
            <h2 className="font-semibold">Scan Image</h2>
          </Container>
          <DropzoneButton />
        </div>

        <Container mx="auto">
          <h2 className="font-semibold">Ask Pavise</h2>
          {/* <ChatDemo /> */}
          <ChatUI />
        </Container>
        <FaqWithHeader />
        <FooterLinks />
      </MantineProvider>
    </>
  );
}
