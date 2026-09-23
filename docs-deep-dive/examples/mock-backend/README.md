# mock-backend

Server Express (TypeScript) che imita un piccolo sottoinsieme di SAP Commerce Cloud OCC v2.
Serve sia `../mini-spartacus` sia lo storefront reale `projects/storefrontapp`.
Spiegazione completa: `../../21-BACKEND-MOCK.md`.

```bash
npm install
npm start                                  # porta 9002
PORT=9102 TOKEN_TTL=30 MOCK_DELAY_MS=500 npm start
npm run typecheck                          # tsc --noEmit
```

Utente demo: `demo@spartacus.test` / `Password123.` - client OAuth: `mobile_android` / `secret`.
