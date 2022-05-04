import { ArrowLeft, Camera } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import ScreenshotButton from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}
export default function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypesInfo = feedbackTypes[feedbackType];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log({
      comment,
      screenshot,
    });

    onFeedbackSent();
  }
  return (
    <>
      <header>
        <button
          onClick={() => onFeedbackRestartRequested()}
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypesInfo.image.source}
            alt={feedbackTypesInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypesInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmit} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[122px] text-sm placeholder-zinc-400 text-zinc-100  bg-transparent rounded-md focus:border-brand-500 focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder=" Conte com detalhes o que aconteceu"
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            disabled={comment.length === 0}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-60 disabled:hover:bg-brand-500"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}
