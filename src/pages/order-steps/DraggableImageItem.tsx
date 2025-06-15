
import React, { useRef } from "react";

type DraggableImageItemProps = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  editable: boolean;
  onMove: (id: string, x: number, y: number) => void;
};

const DraggableImageItem = ({
  id,
  x,
  y,
  width,
  height,
  src,
  editable,
  onMove,
}: DraggableImageItemProps) => {
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

    // Constraint image inside card
    newX = Math.max(0, Math.min(newX, rect.width - width));
    newY = Math.max(0, Math.min(newY, rect.height - height));

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
        width,
        height,
        cursor: editable ? "grab" : "default",
        zIndex: 20,
        userSelect: "none"
      }}
      onMouseDown={handleMouseDown}
      className={editable ? "outline-dashed outline-2 outline-purple-400 rounded" : ""}
    >
      <img
        src={src}
        alt="Logo"
        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }}
        draggable={false}
      />
    </div>
  );
};

export default DraggableImageItem;
