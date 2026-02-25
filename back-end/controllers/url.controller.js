import Url from "../models/url.model.js";
import { redisClient } from "../config/redis.js";
import { createShortUrlService } from "../services/url.service.js";

export const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;

    const url = await createShortUrlService(originalUrl);

    res.json({
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
    });
};

export const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    // 1️⃣ Check Redis
    const cachedUrl = await redisClient.get(shortCode);

    if (cachedUrl) {
        return res.redirect(cachedUrl);
    }

    // 2️⃣ If not in Redis → check DB
    const url = await Url.findOne({ shortCode });

    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }

    // 3️⃣ Store in Redis (cache for 1 hour)
    await redisClient.set(shortCode, url.originalUrl, {
        EX: 3600,
    });

    // 4️⃣ Increase click count (async)
    url.clicks++;
    url.save();

    res.redirect(url.originalUrl);
};