import {
  IconAt,
  IconBrandGithub,
  IconBrandX,
  IconSun,
  IconBook
} from "@tabler/icons-react";
import { Stack, Text, ThemeIcon } from "@mantine/core";
import classes from "./ContactIcons.module.css";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
  href?: string; // Tambahkan prop href opsional
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  href,
  ...others
}: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <ThemeIcon size={40} radius="md" className={classes.icon}>
        {href ? ( // Jika href ada, bungkus ikon dengan <a>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={24} />
          </a>
        ) : (
          <Icon size={24} /> // Jika tidak, render ikon tanpa <a>
        )}
      </ThemeIcon>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  {
    title: "GitBook",
    description: "Pavise GitBook",
    icon: IconBook,
    href: "https://pavise.gitbook.io/pavise",
  },
  {
    title: "X",
    description: "@scanwithpavise",
    href: "https://x.com/ScanWithPavise",
    icon: IconBrandX,
  },
  {
    title: "Github",
    description: "Pavise",
    href: "https://github.com/scanwithpavise",
    icon: IconBrandGithub,
  },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
