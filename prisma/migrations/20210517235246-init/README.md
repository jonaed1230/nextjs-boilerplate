# Migration `20210517235246-init`

This migration has been generated by jonaed1230 at 5/18/2021, 5:52:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"email" text   NOT NULL ,
"name" text   ,
"password" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Post" (
"id" SERIAL,
"published" boolean   NOT NULL DEFAULT false,
"title" text   NOT NULL ,
"authorId" integer   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Comment" (
"id" SERIAL,
"contain" text   NOT NULL ,
"postId" integer   NOT NULL ,
"authorId" integer   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210517235246-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,40 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model User {
+  id        Int       @id @default(autoincrement())
+  createdAt DateTime  @default(now())
+  email     String    @unique
+  name      String?
+  password  String
+  posts     Post[]
+  comments  Comment[]
+}
+
+model Post {
+  id        Int       @id @default(autoincrement())
+  published Boolean   @default(false)
+  title     String
+  author    User?     @relation(fields: [authorId], references: [id])
+  authorId  Int?
+  comments  Comment[]
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
+
+model Comment {
+  id        Int      @id @default(autoincrement())
+  contain   String
+  post      Post     @relation(fields: [postId], references: [id])
+  postId    Int
+  author    User?    @relation(fields: [authorId], references: [id])
+  authorId  Int?
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
```

