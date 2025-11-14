import { AssistantAvatar } from "@/components/assistant/avatar";
import { ChatInput } from "@/components/assistant/chat-input";
import { WelcomeMessage } from "@/components/assistant/welcome-message";

export default function WelcomePage() {
  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[65%] border-r relative">
          <WelcomeMessage />
        </div>

        {/* Right Chat Panel */}
        <div className="w-[35%] flex flex-col">
          <div className="flex items-center justify-center py-6">
            <AssistantAvatar />
          </div>

          <div className="flex-1 px-4 text-sm text-muted-foreground">
            {/* No messages yet */}
          </div>

          <ChatInput />
        </div>
      </div>
    </>
  );
}
