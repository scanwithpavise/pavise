import React, { useState } from "react";
import {
  Container,
  Overlay,
  SimpleGrid,
  Button,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  Modal,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { ContactIconsList } from "./ContactIcons";
import classes from "./FaqWithHeader.module.css";

const categories = [
  {
    label: "Customer Support",
    image:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "User Guides",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Sales Questions",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
];

export function FaqWithHeader() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal

  const handleSubmit = () => {
    if (email) {
      // Simulate an API call or any other action here
      setSubmitted(true);
      setIsModalOpen(true); // Buka modal
      setEmail(""); // Clear the input after submission
    } else {
      alert("Silakan masukkan email Anda terlebih dahulu.");
    }
  };

  const icon = <IconAt size={16} />;
  const items = categories.map((category) => (
    <UnstyledButton
      style={{ backgroundImage: `url(${category.image})` }}
      className={classes.categoryCard}
      key={category.label}
    >
      <Overlay color="#000" opacity={0.6} zIndex={1} />
      <Text size="xl" ta="center" fw={700} className={classes.categoryLabel}>
        {category.label}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container className={classes.wrapper} size="lg"  id="faq">
      <div className={classes.header}>
        <div>
          <div>
            <Title className={classes.title}>
              Be the first to experience the innovation of Pavise!
            </Title>
            <Text c="white">
              Be among the first to unlock the power of Pavise—your gateway to
              AI-driven health insights and blockchain-powered wellness
              solutions! Join our exclusive waitlist now—drop your email below,
              and we’ll notify you the moment we go live!
            </Text>
          </div>
          <div className={classes.emailInput}>
            <TextInput
              mt="lg"
              rightSectionPointerEvents="none"
              rightSection={icon}
              placeholder="Your email"
              w="500px"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Button
              variant="contained"
              bg="black"
              mt={10}
              onClick={handleSubmit}
            >
              Join Now
            </Button>
          </div>
        </div>

        <div className={classes.contact}>
          <ContactIconsList />
        </div>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success!"
        centered
      >
        <Text>Successfully sent! Our team will grant you access soon.</Text>
        <Button
          bg="black"
          mt="md"
          fullWidth
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </Modal>
    </Container>
  );
}
