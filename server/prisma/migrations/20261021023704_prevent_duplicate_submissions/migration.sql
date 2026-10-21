/*
  Warnings:

  - A unique constraint covering the columns `[studentId,normalizedRepoUrl]` on the table `submissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedRepoUrl` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "normalizedRepoUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "submissions_studentId_normalizedRepoUrl_key" ON "submissions"("studentId", "normalizedRepoUrl");
