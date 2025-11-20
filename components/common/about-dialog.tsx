"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutCreatorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-md 
          rounded-2xl 
          p-6 
          backdrop-blur-xl 
          bg-white/10 
          border 
          border-white/20 
          shadow-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-serif font-semibold text-white">
            About the Creator
          </DialogTitle>
          <DialogDescription className="text-white/80 leading-relaxed">
            Hi, I’m <strong>Yao Gervais Amoah</strong>, an AI and UI engineer.
            <br />
            <br />
            <span className="italic">Lumen Collection</span> is an MVP designed
            to showcase advanced conversational AI, semantic search, and modern
            serverless architecture.
            <br />
            <br />
            If you’d like to collaborate or discuss opportunities:
            <br />
            <Link
              href="mailto:gervaisamoah@gmail.com"
              className="font-medium text-white underline underline-offset-2"
            >
              gervais.amoah@gmail.com
            </Link>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
