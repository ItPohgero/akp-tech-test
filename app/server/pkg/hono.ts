import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { appRouter } from '../server-router';
import { ContextData } from '../context/main';

export function HonoApp() {
    const app = new Hono();
    app.get("/.well-known/*", (c) => c.text("Not found", 404));
    app.use(
        '/trpc/*',
        trpcServer({
            router: appRouter,
            createContext: ContextData
        })
    );
    return app;
}