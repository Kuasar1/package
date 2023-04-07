import { Client, ClientOptions } from "@elastic/elasticsearch";
import { LoggerService } from "@nestjs/common";
import { Agent, AgentConfigOptions } from "elastic-apm-node";

export class SiroLogger implements LoggerService {
  private readonly client: Client;
  private readonly apm: Agent;

  constructor(
    private readonly elasticOptions: ClientOptions,
    private readonly apmOptions: AgentConfigOptions,
    private readonly serviceName: string
  ) {
    this.client = new Client(elasticOptions);
    this.apm = require("elastic-apm-node").start(apmOptions);
  }

  debug(message: string): void {
    const transaction =
      this.apm.currentTransaction || this.apm.startTransaction();
    const traceId = this.apm.currentTransaction?.ids["trace.id"];
    const body = {
      message,
      level: "debug",
      "trace-id": traceId,
      "@timestamp": new Date().toISOString(),
    };

    this.client
      .index({
        index: this.serviceName,
        body,
      })
      .catch((err: Error) => {
        console.log(err);
      });

    if (!this.apm.currentTransaction) {
      transaction?.end();
    }
  }

  error(message: string): void {
    const transaction =
      this.apm.currentTransaction || this.apm.startTransaction();
    const traceId = this.apm.currentTransaction?.ids["trace.id"];
    const body = {
      message,
      level: "error",
      "trace-id": traceId,
      "@timestamp": new Date().toISOString(),
    };

    this.client
      .index({
        index: this.serviceName,
        body,
      })
      .catch((err: Error) => {
        console.log(err);
      });

    if (!this.apm.currentTransaction) {
      transaction?.end();
    }
  }

  warn(message: string): void {
    const transaction =
      this.apm.currentTransaction || this.apm.startTransaction();
    const traceId = this.apm.currentTransaction?.ids["trace.id"];
    const body = {
      message,
      level: "warn",
      "trace-id": traceId,
      "@timestamp": new Date().toISOString(),
    };

    this.client
      .index({
        index: this.serviceName,
        body,
      })
      .catch((err: Error) => {
        console.log(err);
      });

    if (!this.apm.currentTransaction) {
      transaction?.end();
    }
  }

  log(message: string): void {
    const transaction =
      this.apm.currentTransaction || this.apm.startTransaction();
    const traceId = this.apm.currentTransaction?.ids["trace.id"];
    const body = {
      message,
      level: "log",
      "trace-id": traceId,
      "@timestamp": new Date().toISOString(),
    };

    this.client
      .index({
        index: this.serviceName,
        body,
      })
      .catch((err: Error) => {
        console.log(err);
      });

    if (!this.apm.currentTransaction) {
      transaction?.end();
    }
  }
}
