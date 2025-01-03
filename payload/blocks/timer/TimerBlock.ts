import { Block } from "payload";

export const TimerBlock: Block = {
  slug: "timer",
  labels: { singular: "Timer", plural: "Timers" },
  admin: {
    components: {
      Label: "@payload/blocks/timer/TimerLabel.tsx",
    },
  },
  fields: [
    {
      name: "time",
      type: "number",
      required: true,
      admin: { description: "Time in Minutes" },
    },
    {
      name: "link-text",
      label: "Link Text",
      type: "text",
    },
  ],
};
