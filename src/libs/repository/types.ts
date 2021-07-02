import { ApplicationRepository, UserRepository } from "@core";

interface Repository extends ApplicationRepository, UserRepository {}

export { Repository };
