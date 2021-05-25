///<reference path="global.d.ts"/>

import express from "express";
import { createCore } from "./core/main";
import { createController } from "./controllers/main";
import { createPresenter } from "./libs/presenter";
import { createRepository } from "./libs/repository";
import { router } from "./router/main";

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use((req, res, next) => {
  const presenter = createPresenter(res);
  req.core = createController(
    createCore({
      applicationRepository: createRepository(),
      presenter,
    }),
    presenter
  );

  next();
});
app.use(router);

app.listen(port, () => console.log(`App listening on port ${port}`));
