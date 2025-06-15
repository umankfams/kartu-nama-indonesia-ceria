
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";

type ColorPopoverProps = {
  value: string;
  onChange: (color: string) => void;
  ariaLabel?: string;
};

const ColorPopover: React.FC<ColorPopoverProps> = ({ value, onChange, ariaLabel }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel || "Pilih warna"}
          className="ml-2 w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
        >
          <span
            className="inline-block w-4 h-4 rounded"
            style={{
              background: value,
              border: "1px solid #ccc",
              marginRight: 4
            }}
          />
          <Palette className="w-4 h-4 text-gray-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="flex flex-col items-center gap-2 w-36">
        <input
          type="color"
          value={value}
          onChange={e => {
            onChange(e.target.value);
            setOpen(false);
          }}
          className="w-24 h-10 border-none p-0 bg-transparent cursor-pointer"
        />
        <span className="text-xs text-gray-500">{value}</span>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPopover;
