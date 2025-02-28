import { useChat, type UseChatOptions } from "ai/react";
import { Chat } from "@/components/ui/chat";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatDemo(props: ChatDemoProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat(props);

  return (
    <div className="flex h-[500px] w-full">
      <Chat
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          "What are the early symptoms of a glioma brain tumor?",
          "How is a glioma diagnosed, and what tests are needed?",
        ]}
        // {/* @ts-expect-error msg */}
        // components={{
        //   p: ({ node, ...props }) => (
        //     <p {...props} style={{ color: "black" }} />
        //   ),
        // }}
      />
    </div>
  );
}
