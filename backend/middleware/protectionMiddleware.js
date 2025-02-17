import { aj } from "../lib/arcjet.js"; // Certifique-se de importar corretamente o `aj`

export const protectionMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ success: false, message: "Too Many Requests" });
      } else if (decision.reason.isBot) {
        return res
          .status(403)
          .json({ success: false, message: "Bot access denied" });
      } else {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Spoofed bot detected" });
    }

    next();
  } catch (error) {
    console.error("Arcjet error", error);
    next();
  }
};
