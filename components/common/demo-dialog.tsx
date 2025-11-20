import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // external: shadcn/ui dialog components
import { Button } from "@/components/ui/button"; // external: shadcn/ui

/**
 * One-time demo info dialog
 * - Shows once per user using localStorage
 * - Clarifies that the app is an MVP demo
 */
export default function DemoInfoDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("lumen-demo-info");
    if (!seen) {
      setOpen(true);
      localStorage.setItem("lumen-demo-info", "true");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            About This Demo
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-white/80">
            This project is an MVP prototype showcasing AI intent detection,
            conversational UX, and semantic product recommendations.
            <br />
            <br />
            It is <strong>not a full e-commerce application</strong> — checkout,
            inventory management, and merchant tooling are not implemented.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button onClick={() => setOpen(false)} className="w-full">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
