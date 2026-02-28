import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '.',
    testMatch: 'screenshots.spec.ts',
    use: {
        browserName: 'chromium',
        launchOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
    },
});
