"use client";

import * as React from "react";
import { Button } from "@/registry/components/button";
import { Toast } from "@/registry/components/toast";

const TOAST_TYPES = ["success", "info", "alert", "generic"] as const;
const TOAST_DIRECTIONS = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
  "top-center",
  "bottom-center",
] as const;
type ToastType = (typeof TOAST_TYPES)[number];
type ToastDirection = (typeof TOAST_DIRECTIONS)[number];

export function ToastPlayground() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [activeType, setActiveType] = React.useState<ToastType>("success");
  const [withCta, setWithCta] = React.useState(true);
  const [activeDirection, setActiveDirection] = React.useState<ToastDirection>("top-right");
  const [durationMs, setDurationMs] = React.useState(2000);

  const activeTitle = `${activeType} toast managed by state`;

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-3 rounded-md border border-dashed p-3">
        <h3 className="text-sm font-semibold">State-managed example</h3>
        <div className="flex flex-wrap gap-2">
          {TOAST_TYPES.map((type) => (
            <Button
              key={`state-${type}`}
              type={activeType === type ? "secondary" : "tertiary"}
              size="sm"
              ctaText={type}
              onClick={() => {
                setActiveType(type);
                setIsVisible(true);
              }}
            />
          ))}
          <Button
            type="tertiary"
            size="sm"
            ctaText={withCta ? "Hide CTA" : "Show CTA"}
            onClick={() => setWithCta((prev) => !prev)}
          />
          <Button
            type="tertiary"
            size="sm"
            ctaText={isVisible ? "Dismiss toast" : "Show toast"}
            onClick={() => setIsVisible((prev) => !prev)}
          />
          <Button
            type={durationMs === 1000 ? "secondary" : "tertiary"}
            size="sm"
            ctaText="1s"
            onClick={() => {
              setDurationMs(1000);
              setIsVisible(true);
            }}
          />
          <Button
            type={durationMs === 2000 ? "secondary" : "tertiary"}
            size="sm"
            ctaText="2s"
            onClick={() => {
              setDurationMs(2000);
              setIsVisible(true);
            }}
          />
          <Button
            type={durationMs === 5000 ? "secondary" : "tertiary"}
            size="sm"
            ctaText="5s"
            onClick={() => {
              setDurationMs(5000);
              setIsVisible(true);
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TOAST_DIRECTIONS.map((direction) => (
            <Button
              key={`direction-${direction}`}
              type={activeDirection === direction ? "secondary" : "tertiary"}
              size="sm"
              ctaText={direction}
              onClick={() => {
                setActiveDirection(direction);
                setIsVisible(true);
              }}
            />
          ))}
        </div>
        {isVisible ? (
          <Toast
            type={activeType}
            direction={activeDirection}
            title={activeTitle}
            ctaText={withCta ? "Take action" : undefined}
            open={isVisible}
            onOpenChange={setIsVisible}
            durationMs={durationMs}
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(`${activeType} toast CTA clicked`);
            }}
          />
        ) : null}
      </div>

      {TOAST_TYPES.map((type) => (
        <div key={type} className="space-y-2">
          <h3 className="text-sm font-semibold capitalize">{type}</h3>
          <div className="space-y-2">
            <Toast type={type} title={`${type} toast`} />
            <Toast
              type={type}
              title={`${type} toast with CTA`}
              ctaText="Take action"
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log(`${type} toast CTA clicked`);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
