CREATE TABLE IF NOT EXISTS "companies"(
  "id"                              SERIAL            PRIMARY KEY  NOT NULL,
  "name"                            VARCHAR(100)      NOT NULL,
  "createdAt"                       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"                       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "users"(
  "id"                              SERIAL            PRIMARY KEY  NOT NULL,
  "firstName"                       VARCHAR(100)      NOT NULL,
  "lastName"                        VARCHAR(100)      NOT NULL,
  "companyId"                       INT               NOT NULL,
  "email"                           VARCHAR(200)      NOT NULL,
  "passwordDigest"                  VARCHAR(100)      NOT NULL,
  "createdAt"                       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"                       TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,

  constraint "fkUsersCompany"      foreign key ("companyId")
  REFERENCES "companies" ("id")
);
