"use client";
import { useRef, useState, useEffect } from "react";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Text,
  useMantineTheme,
  Loader,
  Image,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import * as tf from "@tensorflow/tfjs";
import classes from "./DropzoneButton.module.css";
import { Paper } from "@mantine/core";

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [predictions, setPredictions] = useState<
    { label: string; confidence: number; box: number[] }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    id: string;
    text: string;
    sender: string;
  } | null>(null);

  const sendPredictionsToAI = async (
    context: string,
    predictions: { label: string; confidence: number }[]
  ) => {
    try {
      const predictionsContent = predictions
        .map(
          (prediction) =>
            `${prediction.label} (${(prediction.confidence * 100).toFixed(2)}%)`
        )
        .join(", ");

      const messageContent = `${context}: ${predictionsContent}`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: messageContent }],
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.text();

      const aiMessage = {
        id: Date.now().toString(),
        text: data,
        sender: "ai",
      };

      setAiResponse(aiMessage);
      return aiMessage;
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "Failed to get response from AI.",
        sender: "ai",
      };
      setAiResponse(errorMessage);
      return errorMessage;
    }
  };

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadGraphModel(
          "/models/my-model/model.json"
        );
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
    loadModel();
  }, []);

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      setImageUploaded(true); 
      setPredictions(null); 

      const reader = new FileReader();
      reader.onload = (event) => {
        if (imageRef.current && event.target) {
          const img = imageRef.current;
          img.src = event.target.result as string;
          img.style.display = "block"; 
        }
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const LABELS: Record<number, string> = {
    1: "glioma",
    2: "meningioma",
    3: "pituitary",
  };

  const runInference = async () => {
    if (!model || !imageRef.current || !canvasRef.current) return;

    setIsLoading(true);
    const img = imageRef.current;
    let tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toInt();

    try {
      const output = await model.executeAsync({ input_tensor: tensor });
      if (Array.isArray(output)) {
        const [
          numDetectionsTensor,
          ,
          ,
          scoresTensor,
          classesTensor,
          ,
          boxesTensor,
        ] = output;

        if (
          numDetectionsTensor instanceof tf.Tensor &&
          boxesTensor instanceof tf.Tensor &&
          scoresTensor instanceof tf.Tensor &&
          classesTensor instanceof tf.Tensor
        ) {
          const numDetections = (await numDetectionsTensor.data())[0];
          const boxes = await boxesTensor.data();
          const scores = await scoresTensor.data();
          const classes = await classesTensor.data();
          const formattedPredictions = [];
          for (let i = 0; i < numDetections; i++) {
            if (scores[i] > 0.5) {
              const classId = Math.floor(classes[i]);
              formattedPredictions.push({
                label: LABELS[classId] || "tumor",
                confidence: Math.round(scores[i] * 100) / 100,
                box: [
                  boxes[i * 4],
                  boxes[i * 4 + 1],
                  boxes[i * 4 + 2],
                  boxes[i * 4 + 3],
                ],
              });
            }
          }
          setPredictions(formattedPredictions);
          drawBoundingBoxes(formattedPredictions);
          setOpened(true);
          const aiResponse = await sendPredictionsToAI(
            "please give recommendations for treatment of tumors",
            formattedPredictions
          );
        } else {
          console.error("Unexpected tensor format in model output.");
        }
      } else {
        console.error("Model output is not an array:", output);
      }
    } catch (error) {
      console.error("Error during inference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const drawBoundingBoxes = (
    detections: { label: any; confidence: any; box: any }[]
  ) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = img.naturalWidth;
    const scaleY = img.naturalHeight;
    canvas.width = scaleX;
    canvas.height = scaleY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach(({ label, confidence, box }) => {
      const [yMin, xMin, yMax, xMax] = box;
      const x = xMin * scaleX;
      const y = yMin * scaleY;
      const width = (xMax - xMin) * scaleX;
      const height = (yMax - yMin) * scaleY;

      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = "rgb(242, 255, 0)";
      ctx.fillRect(x, y - 20, ctx.measureText(label).width + 50, 20);
      ctx.fillStyle = "black";
      ctx.fillText(`${label} (${confidence * 100}%)`, x + 5, y - 5);
    });
  };

  return (
    <Container className={classes.wrapper} mx="auto" mb={12}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxSize={30 * 1024 ** 2}
        style={{
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "20px",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(145deg, #f0f0f0, #ffffff)";
          e.currentTarget.style.borderColor = "#666";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(145deg, #ffffff, #f0f0f0)";
          e.currentTarget.style.borderColor = "#ccc";
        }}
      >
        {!imageUploaded ? ( // Tampilkan teks hanya jika gambar belum diunggah
          <Group justify="center">
            <IconCloudUpload
              size={50}
              stroke={1.5}
              color={theme.colors.gray[6]}
            />
            <Text
              ta="center"
              fw={700}
              fz="lg"
              mt="xl"
              color={theme.colors.gray[7]}
            >
              Upload MRI Images
            </Text>
          </Group>
        ) : (
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              ref={imageRef}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "10px",
                display: "block",
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "10px",
              }}
            />
          </div>
        )}
      </Dropzone>
      {aiResponse && (
        <div
          style={{ marginTop: "20px", textAlign: "center", padding: "10px" }}
        >
          <Paper
            shadow="sm"
            p="md"
            style={{
              borderRadius: "10px",
              maxWidth: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              border: "1px solid #ccc",
            }}
          >
            <Text>{aiResponse.text}</Text>
          </Paper>
        </div>
      )}
      <Group justify="center" mt="xl">
        <Button
          onClick={runInference}
          disabled={!model || isLoading || !imageUploaded}
          style={{
            background: "linear-gradient(145deg,rgb(0, 0, 0),rgb(0, 0, 0))",
            border: "none",
            borderRadius: "25px",
            padding: "5px 30px",
            fontSize: "16px",
            fontWeight: 600,
            height:60,
            width: 600,
            color: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          {isLoading ? <Loader color="white" size="md" /> : "Scan Images"}
        </Button>
      </Group>
    </Container>
  );
}
