import {
  IconBook,
  IconChartPie3,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import "@reown/appkit-wallet-button/react";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMegaMenu.module.css";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@reown/appkit-wallet-button/react";
import { createAppKit } from "@reown/appkit";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
// if (!projectId) {
//   throw new Error("Project Id is not defined.");
// }

// export const networks = [solana, solanaTestnet, solanaDevnet];

// export const solanaWeb3JsAdapter = new SolanaAdapter({
//   wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
// });
// const metadata = {
//   name: "appkit-example",
//   description: "AppKit Example - Solana",
//   url: "https://exampleapp.com",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// const modal = createAppKit({
//   adapters: [solanaWeb3JsAdapter],
//   projectId,
//   networks: [solana, solanaTestnet, solanaDevnet],
//   features: {
//     analytics: true,
//     email: true,
//     socials: ["google", "x", "github", "discord", "farcaster"],
//     emailShowWallets: true,
//   },
//   themeMode: "light",
// });

import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  clusterApiUrl,
  Transaction,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text fw={600}>PAVISE</Text>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#about" className={classes.link}>
              About
            </a>
            <a href="#features" className={classes.link}>
              Features
            </a>
            <a href="#roadmap" className={classes.link}>
              Roadmap
            </a>
            <a href="#faq" className={classes.link}>
              Early Access
            </a>
          </Group>

          <Group
            visibleFrom="sm"
            align="center"
            style={{ flexDirection: "column", gap: 0 }}
          >
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                  <WalletMultiButton />
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#about" className={classes.link}>
            About
          </a>
          <a href="#features" className={classes.link}>
            Features
          </a>
          <a href="#roadmap" className={classes.link}>
            Roadmap
          </a>
          <a href="#faq" className={classes.link}>
            Early Access
          </a>

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                  <WalletMultiButton />
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
