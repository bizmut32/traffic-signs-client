export interface Coordinates {
  x: number;
  y: number;
}

type Corner = Coordinates;

export function numbersToBoundingBox(x1: number, x2: number, y1: number, y2: number) {
  return {
      topLeft: { x: x1, y: y1 },
      bottomRight: { x: x2, y: y2 }
  };
}

export interface Classification {
  serial: number;
  label: string;
}

export interface BoundingBox {
  topLeft: Corner;
  bottomRight: Corner;
}

export interface Detection {
  boundingBox: BoundingBox;
  classification: Classification;
  confidence: number;
}

export interface ImageDetection {
  objects: Detection[];
  image: { base64: string };
  executionTime: number;
}
