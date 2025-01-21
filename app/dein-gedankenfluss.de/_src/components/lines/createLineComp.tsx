import { cx } from "@gf/cx";
import {
  generateAnimateAttributes,
  GenerateAnimateAttributesConfig,
} from "./generateAnimateAttributes";
import { OnViewEntry } from "../OnViewEntry";

interface CreateLineCompOptions {
  mask: string;
  stroke: string;
  name: string;
  viewBox: string;
  length: number;
}

export interface LineProps extends GenerateAnimateAttributesConfig {
  className?: string;
  spaced?: boolean;
  extraViewBoxWidth?: number;
  extraViewBoxHeight?: number;
}

export function createLineComp({
  length,
  mask,
  name,
  stroke,
  viewBox,
}: CreateLineCompOptions) {
  const id = name.toLowerCase().replace(/\s+/g, "-");
  const viewBoxWidth = Number(viewBox.split(" ")[2]);
  const viewBoxHeight = Number(viewBox.split(" ")[3]);

  const Comp = ({
    className,
    duration = 1.5,
    startSpeed = 0.2,
    easingStrength = 0.9,
    spaced = false,
    extraViewBoxHeight = 0,
    extraViewBoxWidth = 0,
  }: LineProps) => {
    const animateAttributes = generateAnimateAttributes(length, {
      duration,
      startSpeed,
      easingStrength,
    });

    return (
      <div
        className={cx(
          "w-full flex items-center select-none pointer-events-none relative z-10",
          !spaced && "h-0",
        )}
        style={
          spaced
            ? {
                aspectRatio: `${viewBoxWidth + extraViewBoxWidth} / ${viewBoxHeight + extraViewBoxHeight}`,
              }
            : {}
        }
      >
        {/* <OnViewEntry
          threshold={0.5}
          className={"w-full overflow-x-hidden flex justify-center"}
          style={{
            minWidth: `${viewBoxWidth / 2}px`,
            aspectRatio: `${viewBoxWidth + extraViewBoxWidth} / ${viewBoxHeight + extraViewBoxHeight}`,
          }}
        > */}
        <OnViewEntry
          threshold={0.5}
          className="w-full overflow-x-clip flex justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            className={className}
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 1.5,
              width: "100%",
              minWidth: `${viewBoxWidth / 2}px`,
            }}
            viewBox={viewBox}
          >
            <defs>
              <mask id={`${id}-stroke-mask`}>
                <rect width="100%" height="100%" fill="white" />
                <path
                  d={mask}
                  style={{
                    fill: "black",
                  }}
                />
              </mask>
            </defs>

            <path
              d={stroke}
              style={{
                fill: "none",
                strokeWidth: 11,
              }}
              className="stroke-caramel dark:stroke-paper"
              mask={`url(#${id}-stroke-mask)`}
              strokeLinecap="round"
              strokeDasharray={length}
              strokeDashoffset={length}
            >
              <animate
                attributeName="stroke-dashoffset"
                fill="freeze"
                {...animateAttributes}
              />
            </path>
          </svg>
        </OnViewEntry>
      </div>
    );
  };

  Comp.displayName = name;

  return Comp;
}
