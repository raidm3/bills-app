-- AlterTable
ALTER TABLE "groceries" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "done" SET DEFAULT false;
