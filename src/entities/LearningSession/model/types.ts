import { ITestResult } from 'entities/Test';

export type SessionStrategy = 'random' | 'weakest';

export interface ISessionConfig {
  count: number;
  strategy: SessionStrategy;
}

export interface ISessionStep {
  excerptId: string;
  testType: 'scramble' | 'text-to-variants';
}

export interface ISessionResult {
  excerptId: string;
  result: ITestResult;
}

export interface ISessionState {
  steps: ISessionStep[];
  currentIndex: number;
  results: ISessionResult[];
  isCompleted: boolean;
}
