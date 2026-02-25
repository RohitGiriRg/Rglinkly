import Url from "../models/url.model.js";
import { nanoid } from "nanoid";

export const createShortUrlService = async (originalUrl) => {
    const shortCode = nanoid(6);

    const newUrl = await Url.create({
        originalUrl,
        shortCode,
    });

    return newUrl;
};