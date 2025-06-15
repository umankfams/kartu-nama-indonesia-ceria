
import React, { useRef } from "react";

type DraggableTextItemProps = {
  id: string;
  x: number;
  y: number;
  zIndex?: number;
  children: React.ReactNode;
  editable: boolean;
  onMove: (id: string, x: number, y: number) => void;
};

const DraggableTextItem = ({
  id,
  x,
  y,
  zIndex = 10,
  children,
  editable,
  onMove,
}: DraggableTextItemProps) => {
  const dragInfo = useRef<{offsetX: number, offsetY: number}|null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editable) return;
    const elem = e.currentTarget as HTMLDivElement;
    const rect = elem.parentElement?.getBoundingClientRect();
    if (!rect) return;
    dragInfo.current = {
      offsetX: e.clientX - (rect.left + x),
      offsetY: e.clientY - (rect.top + y),
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current) return;

    const card = (document.getElementById("draggable-card-container") as HTMLDivElement);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    let newX = e.clientX - rect.left - dragInfo.current.offsetX;
    let newY = e.clientY - rect.top - dragInfo.current.offsetY;

    // Constraint to card area
    newX = Math.max(0, Math.min(newX, rect.width - 20));
    newY = Math.max(0, Math.min(newY, rect.height - 20));

    onMove(id, newX, newY);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    dragInfo.current = null;
  };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex,
        cursor: editable ? "grab" : "default",
        userSelect: editable ? "none" : "initial",
        touchAction: "none"
      }}
      onMouseDown={handleMouseDown}
      className={editable ? "outline-dashed outline-2 outline-blue-400" : ""}
    >
      {children}
    </div>
  );
};

export default DraggableTextItem;
