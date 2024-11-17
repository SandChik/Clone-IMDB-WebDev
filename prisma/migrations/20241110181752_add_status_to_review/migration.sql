/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Award` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Award_name_key" ON "Award"("name");
