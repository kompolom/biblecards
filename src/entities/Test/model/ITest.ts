import { TestType } from './TestType';
import { ITestResult } from './ITestResult';

export interface ITest<AnswerType = string> {
    type: TestType;
    commit(answer: AnswerType): PromiseLike<ITestResult>
}