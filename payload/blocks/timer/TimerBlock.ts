import { Block } from "payload";

export const TimerBlock: Block = {
  slug: "recipe-timer",
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
      admin: { description: "Time in Minutes" },
    },
  ],
};
