// middleware/checkLimit.js
const UsageLog = require('../models/UsageLog');
const User = require('../models/User');

const LIMITS = {
    anonymous: 2,
    registered: 10,
    premium: Infinity
};

function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

function getIP(req) {
    return (
        req.headers['x-forwarded-for']?.split(',')[0].trim() ||
        req.socket.remoteAddress ||
        'unknown'
    );
}

function checkLimit(action) {
    return async (req, res, next) => {
        try {
            const today = getTodayString();
            const userId = req.user?.id;  // ← vem do auth middleware (opcional)

            let identifier, type, limit;

            if (!userId) {
                identifier = getIP(req);
                type = 'ip';
                limit = LIMITS.anonymous;
            } else {
                const user = await User.findById(userId).select('isPremium');
                if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

                if (user.isPremium) return next();

                identifier = String(userId);
                type = 'user';
                limit = LIMITS.registered;
            }

            const log = await UsageLog.findOneAndUpdate(
                { identifier, type, action, date: today },
                { $setOnInsert: { identifier, type, action, date: today, count: 0, createdAt: new Date() } },
                { upsert: true, new: true }
            );

            if (log.count >= limit) {
                return res.status(429).json({
                    error: 'Limite diário atingido',
                    limit,
                    used: log.count,
                    resetAt: 'meia-noite (UTC)',
                    upgrade: !userId
                        ? 'Crie uma conta gratuita para gerar até 10 por dia'
                        : 'Assine o plano premium para gerações ilimitadas'
                });
            }

            await UsageLog.updateOne(
                { identifier, type, action, date: today },
                { $inc: { count: 1 } }
            );

            next();
        } catch (err) {
            console.error('checkLimit error:', err);
            next(err);
        }
    };
}

module.exports = { checkLimit };