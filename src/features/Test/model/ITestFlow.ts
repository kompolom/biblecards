import { ITest, ITestResult } from "entities/Test";

export interface ITestFlow {
    next(answer?: ITestResult): Promise<ITest>
}