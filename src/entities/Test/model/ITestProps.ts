import { Excerpt } from 'entities/Verse';
import { ITestResult } from './ITestResult';

export interface ITestProps {
  excerpt: Excerpt;
  onComplete: (result: ITestResult) => void;
  onCancel?: () => void;
}
