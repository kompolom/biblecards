/**
 * Detailed result of a test session.
 */
export interface ITestResult {
  /** Overall status of the test (pass/fail) */
  status: boolean;
  /** Accuracy of the recall (0.0 to 1.0) */
  accuracy: number;
  /** How many hints were used during the test */
  hintsUsed: number;
  /** Duration of the test session in milliseconds */
  durationMs: number;
  /** The correct answer that should have been provided */
  correctAnswer?: string;
}
