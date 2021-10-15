require('dotenv').config(); // Recommended way of loading dotenv
import { Bot } from "../bot";
import container from "../inversify/inversify.config";
import { TYPES } from "../inversify/types";
import { CronHelper } from "./cron-helper";

const cronHelper = container.get<CronHelper>(TYPES.CronHelper);
cronHelper.DeleteOldMessages().then(() =>
{
    process.exit();
});