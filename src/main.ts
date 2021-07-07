///<reference path="global.d.ts"/>
import "./config";
import express, { Response } from "express";
import { MongoClient } from "mongodb";
import { NodeSSH } from "node-ssh";
import { createCore } from "./core/main";
import { createController } from "./controllers/main";
import { createPresenter } from "./libs/presenter";
import { createRepository } from "./libs/repository";
import { createPortsMapper } from "./libs/portsMapper";
import { createKeysVault } from "./libs/keysVault";
import { createApplicationDock } from "./libs/applicationDock";
import { createLogsCollector } from "./libs/logsCollector";
import { createSafeGuard } from "./libs/safeGuard";
import { router } from "./router/main";

const app = express();
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const host = process.env.HOST_ADDRESS;
const user = process.env.HOST_USER;
const key = process.env.HOST_KEY;

const mongoClient = new MongoClient(
  `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const ssh = new NodeSSH();
const listenToExit = (cleanUp: () => void) => {
  process.on("exit", cleanUp);
  process.on("SIGINT", cleanUp);
  process.on("SIGUSR1", cleanUp);
  process.on("SIGUSR2", cleanUp);
  process.on("uncaughtException", cleanUp);
};

ssh
  .connect({ host, username: user, privateKey: key })
  .then(() => mongoClient.connect())
  .then(() => {
    const db = mongoClient.db(dbName);
    const presenter = createPresenter({} as Response);
    const repository = createRepository(db, ssh);
    const keysVault = createKeysVault(ssh);
    const portsMapper = createPortsMapper(ssh);
    const applicationDock = createApplicationDock(ssh);
    const logsCollector = createLogsCollector(ssh);
    const safeGuard = createSafeGuard();
    const core = createController(
      createCore({
        applicationRepository: repository,
        userRepository: repository,
        presenter,
        portsMapper,
        keysVault,
        applicationDock,
        logsCollector,
        safeGuard,
      }),
      presenter
    );

    core.startApplications();
    app.use(express.json());
    app.use((req, res, next) => {
      const presenter = createPresenter(res);
      req.core = createController(
        createCore({
          applicationRepository: repository,
          userRepository: repository,
          presenter,
          portsMapper,
          keysVault,
          applicationDock,
          logsCollector,
          safeGuard,
        }),
        presenter
      );
      next();
    });
    app.use(router);

    const server = app.listen(port, () =>
      console.log(`App listening on port ${port}`)
    );

    listenToExit(() => server.close());
  });

listenToExit(() => {
  ssh.dispose();
  mongoClient.close(true);
});
