export interface Guess {
  index: number;
  signName: string;
  accuracy: number;
}

export interface ClassifiedImage {
  base64: string;
}

export interface ClassificationResult {
  image: ClassifiedImage;
  guesses: number[];
  executionTime: number;
}

export interface EvaluationResult {
  accuracy: number[];
  executionTime: number;
  topGuess: Guess;
}

export const signNames: string[] = [
  '30 km/h',
  '40 km/h'
];
