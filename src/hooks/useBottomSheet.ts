import { useRef, useState } from "react";

type SheetState = "collapsed" | "expanded";

export function useBottomSheet(onClose?: () => void) {
  const [sheetState, setSheetState] = useState<SheetState>("expanded");
  const [translateY, setTranslateY] = useState(0);

  const startY = useRef(0);
  const isDragging = useRef(false);

  const baseY =
    sheetState === "expanded"
      ? 0
      : window.innerHeight * 0.75;

  const handleStart = (clientY: number) => {
    startY.current = clientY;
    isDragging.current = true;
  };

  const handleMove = (clientY: number) => {
    if (!isDragging.current) return;

    const diff = clientY - startY.current;

    // 🔥 STRONGER DRAG
    setTranslateY(diff * 1.2);
  };

  const handleEnd = () => {
    isDragging.current = false;

    const threshold = 60;

    if (translateY > threshold) {
      if (sheetState === "expanded") {
        setSheetState("collapsed");
      } else {
        onClose?.();
      }
    } else if (translateY < -threshold) {
      setSheetState("expanded");
    }

    setTranslateY(0);
  };

  return {
    translateY,
    baseY,
    handleStart,
    handleMove,
    handleEnd,
    expand: () => setSheetState("expanded"),
    collapse: () => setSheetState("collapsed"),
  };
}