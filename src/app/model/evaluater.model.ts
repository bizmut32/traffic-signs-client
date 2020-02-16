import { ClassificationResult, EvaluationResult, signNames } from './classification-result.model';

interface MaxGuess {
  index: number;
  value: number;
}

export class Evaluater {

  constructor() { }

  public static evaluateClassification(classification: ClassificationResult): EvaluationResult {
    const max: MaxGuess = classification.guesses.reduce<MaxGuess>(this.getMaxGuess, { value: classification.guesses[0], index: 0});
    const accuracy = this.scaleGuesses(classification.guesses, 1);
    return {
      accuracy,
      executionTime: classification.executionTime,
      topGuess: {
        index: max.index,
        signName: signNames[max.index],
        accuracy: accuracy[max.index]
      }};
  }

  private static getMaxGuess(acc: MaxGuess, currentValue: number, currentIndex: number): MaxGuess {
    if (acc.value < currentValue)
      return { index: currentIndex, value: currentValue };
    return acc;
  }

  private static scaleGuesses(guesses: number[], scaleFactor: number = 1): number[] {
    return guesses.map(value => value * scaleFactor);
  }
 }
