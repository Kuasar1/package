"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiroLogger = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
class SiroLogger {
    constructor(elasticOptions, apmOptions, serviceName) {
        this.elasticOptions = elasticOptions;
        this.apmOptions = apmOptions;
        this.serviceName = serviceName;
        this.client = new elasticsearch_1.Client(elasticOptions);
        this.apm = require("elastic-apm-node").start(apmOptions);
    }
    debug(message) {
        var _a;
        const transaction = this.apm.currentTransaction || this.apm.startTransaction();
        const traceId = (_a = this.apm.currentTransaction) === null || _a === void 0 ? void 0 : _a.ids["trace.id"];
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
            .catch((err) => {
            console.log(err);
        });
        if (!this.apm.currentTransaction) {
            transaction === null || transaction === void 0 ? void 0 : transaction.end();
        }
    }
    error(message) {
        var _a;
        const transaction = this.apm.currentTransaction || this.apm.startTransaction();
        const traceId = (_a = this.apm.currentTransaction) === null || _a === void 0 ? void 0 : _a.ids["trace.id"];
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
            .catch((err) => {
            console.log(err);
        });
        if (!this.apm.currentTransaction) {
            transaction === null || transaction === void 0 ? void 0 : transaction.end();
        }
    }
    warn(message) {
        var _a;
        const transaction = this.apm.currentTransaction || this.apm.startTransaction();
        const traceId = (_a = this.apm.currentTransaction) === null || _a === void 0 ? void 0 : _a.ids["trace.id"];
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
            .catch((err) => {
            console.log(err);
        });
        if (!this.apm.currentTransaction) {
            transaction === null || transaction === void 0 ? void 0 : transaction.end();
        }
    }
    log(message) {
        var _a;
        const transaction = this.apm.currentTransaction || this.apm.startTransaction();
        const traceId = (_a = this.apm.currentTransaction) === null || _a === void 0 ? void 0 : _a.ids["trace.id"];
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
            .catch((err) => {
            console.log(err);
        });
        if (!this.apm.currentTransaction) {
            transaction === null || transaction === void 0 ? void 0 : transaction.end();
        }
    }
}
exports.SiroLogger = SiroLogger;
