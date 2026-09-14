"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AIChatWidget.module.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const shortcuts = [
  {
    label: "💼 Experience",
    prompt: "Tell me about Alwi's experience.",
  },
  {
    label: "🚀 Projects",
    prompt: "What projects has Alwi worked on?",
  },
  {
    label: "🛠️ Skills",
    prompt: "What are Alwi's main skills?",
  },
  {
    label: "🎓 Background",
    prompt: "Tell me about Alwi's background.",
  },
  {
    label: "🏆 Achievements",
    prompt: "What are Alwi's notable achievements?",
  },
];

function renderMessageContent(content: string) {
  const cleanedContent = content.replace(/\*\*/g, "");
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return cleanedContent.split("\n").map((line, lineIndex) => {
    const parts = line.split(urlRegex);

    return (
      <p key={lineIndex}>
        {parts.map((part, partIndex) => {
          if (part.match(urlRegex)) {
            const cleanUrl = part.replace(/[.,!?;:]+$/, "");

            return (
              <a
                key={`${lineIndex}-${partIndex}`}
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.messageLink}
              >
                {cleanUrl}
              </a>
            );
          }

          return <span key={`${lineIndex}-${partIndex}`}>{part}</span>;
        })}

        {!line && "\u00A0"}
      </p>
    );
  });
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmedMessage,
    };

    const previousMessages = [...messages];

    setMessages((current) => [...current, userMessage]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: previousMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          data?.reply || "Sorry, I couldn't generate a response right now.",
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, something went wrong while connecting to the AI. Please try again.",
      };

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     INPUT SUBMIT
  ========================= */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage(input);
  };

  /* =========================
     SHORTCUT
  ========================= */

  const handleShortcut = (prompt: string) => {
    sendMessage(prompt);
  };

  /* =========================
     CLOSE CHAT
  ========================= */

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.isOpen : ""}`}>
      {/* =========================
          CHAT PANEL
      ========================= */}

      <div className={styles.chatPanel} aria-hidden={!isOpen}>
        {/* HEADER */}

        <div className={styles.chatHeader}>
          <div className={styles.profile}>
            <div className={styles.profileAvatar}>
              <Image src="/ai/alwi-chat.png" alt="Alwi" fill sizes="44px" />
            </div>

            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Alwi AI</span>

              <span className={styles.profileStatus}>
                <span className={styles.statusDot} />
                Ask me anything
              </span>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        {/* CHAT CONTENT */}

        <div className={styles.chatContent}>
          {/* WELCOME MESSAGE */}

          <div className={`${styles.chatMessage} ${styles.aiMessage}`}>
            <div className={styles.smallAvatar}>
              <Image src="/ai/alwi-chat.png" alt="Alwi AI" fill sizes="28px" />
            </div>

            <div className={styles.messageGroup}>
              <div className={styles.bubble}>
                <p>Hey! 👋 I&apos;m Alwi AI.</p>

                <p>
                  Curious about Alwi? Ask me anything about his experience,
                  projects, skills, or background.
                </p>
              </div>
            </div>
          </div>

          {/* SHORTCUTS */}

          {messages.length === 0 && !isLoading && (
            <div className={styles.shortcutSection}>
              <span className={styles.shortcutTitle}>Curious about Alwi?</span>

              <div className={styles.shortcuts}>
                {shortcuts.map((shortcut) => (
                  <button
                    key={shortcut.label}
                    type="button"
                    className={styles.shortcut}
                    onClick={() => handleShortcut(shortcut.prompt)}
                  >
                    {shortcut.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CONVERSATION */}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`${styles.chatMessage} ${
                message.role === "user" ? styles.userMessage : styles.aiMessage
              }`}
            >
              {message.role === "assistant" && (
                <div className={styles.smallAvatar}>
                  <Image
                    src="/ai/alwi-chat.png"
                    alt="Alwi AI"
                    fill
                    sizes="28px"
                  />
                </div>
              )}

              <div className={styles.messageGroup}>
                <div className={styles.bubble}>
                  {renderMessageContent(message.content)}
                </div>
              </div>
            </div>
          ))}

          {/* TYPING INDICATOR */}

          {isLoading && (
            <div className={`${styles.chatMessage} ${styles.aiMessage}`}>
              <div className={styles.smallAvatar}>
                <Image
                  src="/ai/alwi-chat.png"
                  alt="Alwi AI"
                  fill
                  sizes="28px"
                />
              </div>

              <div className={`${styles.bubble} ${styles.typingBubble}`}>
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}

        <form className={styles.inputArea} onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything..."
            aria-label="Ask Alwi AI anything"
            disabled={isLoading}
          />

          <button
            type="submit"
            className={styles.sendButton}
            aria-label="Send message"
            disabled={!input.trim() || isLoading}
          >
            ↑
          </button>
        </form>
      </div>

      {/* =========================
          FLOATING BUTTON
      ========================= */}

      {!isOpen && (
        <button
          type="button"
          className={styles.chatButton}
          onClick={() => setIsOpen(true)}
          aria-label="Let's talk with Alwi's AI assistant"
        >
          <span className={styles.message}>Let’s talk</span>

          <div className={styles.avatar}>
            <Image
              src="/ai/alwi-wave.png"
              alt="Alwi"
              fill
              sizes="88px"
              priority
            />
          </div>
        </button>
      )}
    </div>
  );
}
