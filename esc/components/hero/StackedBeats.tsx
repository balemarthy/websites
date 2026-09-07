"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { beats } from "./beats-data";
import DialogueCloud from "./DialogueCloud";

export default function StackedBeats() {
  return (
    <div className="flex flex-col gap-16 bg-esc-paper px-6 py-20 sm:px-10">
      {beats.map((beat, i) => (
        <motion.div
          key={beat.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center"
        >
          <span className="font-mono text-xs tracking-wide text-esc-teal">
            {String(i + 1).padStart(2, "0")} / {String(beats.length).padStart(2, "0")}
          </span>
          <div className="relative h-[220px] w-[220px]">
            <Image
              src={beat.image}
              alt={`${beat.character === "pagla" ? "Pagla" : "Pagli"} — ${beat.phase}`}
              fill
              className="object-contain"
              sizes="220px"
              priority={i === 0}
            />
          </div>
          <DialogueCloud tail="top">{beat.line}</DialogueCloud>
        </motion.div>
      ))}
    </div>
  );
}
