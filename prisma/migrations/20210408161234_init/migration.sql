-- DropIndex
DROP INDEX "Review_bookId_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "averageRating" REAL DEFAULT 0.0,
    "totalRates" INTEGER DEFAULT 0,
    "description" TEXT,
    "descriptionLong" TEXT
);
INSERT INTO "new_Book" ("id", "title", "cover", "averageRating", "totalRates", "description", "descriptionLong") SELECT "id", "title", "cover", "averageRating", "totalRates", "description", "descriptionLong" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
