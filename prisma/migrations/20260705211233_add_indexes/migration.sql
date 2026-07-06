-- CreateIndex
CREATE INDEX "bills_date_idx" ON "bills"("date");

-- CreateIndex
CREATE INDEX "bills_created_at_idx" ON "bills"("created_at");

-- CreateIndex
CREATE INDEX "bills_user_id_idx" ON "bills"("user_id");

-- CreateIndex
CREATE INDEX "ingredients_recipeId_idx" ON "ingredients"("recipeId");

-- CreateIndex
CREATE INDEX "recipes_created_at_idx" ON "recipes"("created_at");
