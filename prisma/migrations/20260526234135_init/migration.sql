-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "imageUrl" TEXT NOT NULL,
    "features" TEXT NOT NULL DEFAULT '[]',
    "stripePriceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UploadedImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "sizeBytes" INTEGER,
    "mimeType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "logoUrl" TEXT,
    "logoWidth" INTEGER NOT NULL DEFAULT 120,
    "logoHeight" INTEGER NOT NULL DEFAULT 40,
    "faviconUrl" TEXT,
    "ogImageUrl" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#10B981'
);

-- CreateTable
CREATE TABLE "SEOSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "route" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageUrl" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "FAQItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "keywords" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "VehicleBrand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SEOSetting_route_key" ON "SEOSetting"("route");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleBrand_name_key" ON "VehicleBrand"("name");
