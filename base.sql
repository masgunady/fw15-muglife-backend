-- Active: 1680688894764@@127.0.0.1@5432@muglife@public
CREATE TABLE "users" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "roleId" INT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
DROP TABLE "profile", "users";
CREATE TABLE "profile" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INTEGER,
    "orderedId" INTEGER,
    "picture" VARCHAR(255),
    "fullName" VARCHAR(255),
    "address" VARCHAR(255),
    "gender" BOOLEAN,
    "username" VARCHAR(255),
    "birthDate" DATE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "categories" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "product" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "name" VARCHAR(255),
    "price" VARCHAR(255),
    "descriptions" VARCHAR(255),
    "stock" VARCHAR(255),
    "productSizeId" INTEGER,
    "product_delivery_id" INTEGER,
    "product_category_id" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "productDeliveryMethods" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "productSizes" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "roles" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "code" VARCHAR(255),
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "forgotRequest" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
INSERT INTO "roles" ("name", "code", "description") VALUES ('Super Admin', 'superadmin', 'This user can access all of the system'), ('General', 'general', 'This user can create article and submitting');
