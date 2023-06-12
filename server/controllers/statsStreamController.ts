import { Request, Response, NextFunction } from "express";
import { exec } from "node:child_process";
import { StatsStreamController } from "../../types";

const statsStreamController: StatsStreamController = {
  getAllContainerStats: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await exec(
        "docker stats --no-stream --format json",
        (error, stdout, stderr) => {
          if (error) {
            return res.status(401);
          }
          return res.status(200).json(stdout || stderr);
        }
      );
    } catch (error) {
      next({
        log: "error in the generalDockerMiddleware",
        err: error,
      });
    }
  },
};

export default statsStreamController;
