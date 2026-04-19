-- Postgres 16 init script
-- Bu dosya postgres container ilk kez baslayinca calisir

-- UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- pgcrypto (hash + random)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- pgvector (embedding search icin, opsiyonel)
CREATE EXTENSION IF NOT EXISTS "vector";

-- Timezone: Europe/Istanbul
SET TIME ZONE 'Europe/Istanbul';

-- RLS prep (tablolar Drizzle ile olusur, RLS policy'leri migration'da)
