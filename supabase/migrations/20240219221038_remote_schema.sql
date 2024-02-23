
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "pg_database_owner";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."assignments" (
    "assignmentID" "text" NOT NULL,
    "classID" "text" NOT NULL,
    "label" "text" NOT NULL
);

ALTER TABLE "public"."assignments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."classes" (
    "classID" "text" NOT NULL,
    "label" "text" NOT NULL,
    "start" "text" NOT NULL,
    "end" "text" NOT NULL
);

ALTER TABLE "public"."classes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."grades" (
    "gradeID" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "assignmentID" "text" NOT NULL,
    "classID" "text",
    "studentID" "uuid",
    "score" integer DEFAULT 0
);

ALTER TABLE "public"."grades" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."students" (
    "studentID" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."students" OWNER TO "postgres";

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_pkey" PRIMARY KEY ("classID");

ALTER TABLE ONLY "public"."assignments"
    ADD CONSTRAINT "grades_pkey" PRIMARY KEY ("assignmentID");

ALTER TABLE ONLY "public"."grades"
    ADD CONSTRAINT "grades_pkey1" PRIMARY KEY ("gradeID");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_pkey" PRIMARY KEY ("studentID");

ALTER TABLE ONLY "public"."assignments"
    ADD CONSTRAINT "assignments_classID_fkey" FOREIGN KEY ("classID") REFERENCES "public"."classes"("classID");

ALTER TABLE ONLY "public"."grades"
    ADD CONSTRAINT "grades_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "public"."assignments"("assignmentID");

ALTER TABLE ONLY "public"."grades"
    ADD CONSTRAINT "grades_classID_fkey" FOREIGN KEY ("classID") REFERENCES "public"."classes"("classID");

ALTER TABLE ONLY "public"."grades"
    ADD CONSTRAINT "grades_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "public"."students"("studentID");

CREATE POLICY "Enable read access for all users" ON "public"."assignments" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."classes" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."grades" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."students" FOR SELECT USING (true);

ALTER TABLE "public"."assignments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."classes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."grades" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."students" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."assignments" TO "anon";
GRANT ALL ON TABLE "public"."assignments" TO "authenticated";
GRANT ALL ON TABLE "public"."assignments" TO "service_role";

GRANT ALL ON TABLE "public"."classes" TO "anon";
GRANT ALL ON TABLE "public"."classes" TO "authenticated";
GRANT ALL ON TABLE "public"."classes" TO "service_role";

GRANT ALL ON TABLE "public"."grades" TO "anon";
GRANT ALL ON TABLE "public"."grades" TO "authenticated";
GRANT ALL ON TABLE "public"."grades" TO "service_role";

GRANT ALL ON TABLE "public"."students" TO "anon";
GRANT ALL ON TABLE "public"."students" TO "authenticated";
GRANT ALL ON TABLE "public"."students" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
